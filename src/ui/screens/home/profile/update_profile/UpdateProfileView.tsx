import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import { BUTTON_TYPES } from "ui/components/molecules/app_button/AppButton";
import { FormikValues, isObject } from "formik";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { SPACE, STRINGS } from "config";
import RightArrow from "assets/images/arrow_circle_right.svg";
import AppForm from "ui/components/molecules/app_form/AppForm";
import AppFormFormSubmit from "ui/components/molecules/app_form/AppFormSubmit";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE_LINE_HEIGHT } from "config/Dimens";
import { DynamicFormView } from "ui/components/templates/dynamic_card_view/DynamicFormView";
import { createYupSchema } from "utils/YupSchemaCreator";
import _ from "lodash";
import { FormInputFieldData } from "models/api_responses/RoommateAgreementResponseModel";
import { UpdateProfileRequestModel } from "models/api_requests/UpdateProfileRequestModel";
import { Profile } from "models/api_responses/FetchMyProfileResponseModel";
import { AppLog } from "utils/Util";
import { useMemo } from "react";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

type Props = {
  infoTextShown: boolean;
  handleUpdateProfile: (values: UpdateProfileRequestModel) => void;
  updateProfileUiData: Profile | undefined;
  shouldShowProgressBar: boolean;
  shouldNotOptimize?: boolean;
};

export const UpdateProfileView = optimizedMemo<Props>(
  ({
    infoTextShown,
    handleUpdateProfile,
    updateProfileUiData,
    shouldShowProgressBar
  }) => {
    AppLog.log(() => "In UpdateProfileView()...");

    const theme = usePreferredTheme();
    const rightArrowIcon = () => <RightArrow width={20} height={20} />;
    //dynamic form validation on submit
    let onSubmit = (_value: FormikValues) => {
      updateProfileUiData?.sections?.forEach((section) => {
        section.formInputs?.forEach((formInput) => {
          const val = _value[formInput.id.toString()];
          if (val) {
            if (_.isArray(val)) {
              //if its array
              const meta = val.map((obj: any) => {
                return { value: obj.value };
              });
              formInput.userMeta = meta;
            } else if (val.hasOwnProperty("fileURL")) {
              const meta = [
                {
                  value: val
                }
              ];
              formInput.userMeta = meta;
            } else if (isObject(val)) {
              const meta = [
                {
                  value: val.value
                }
              ];
              formInput.userMeta = meta;
            } else {
              //if its string input
              const meta = [
                {
                  value: val
                }
              ];
              formInput.userMeta = meta;
            }
          }
        });
      });

      handleUpdateProfile({
        sections: updateProfileUiData?.sections!
      });
    };

    let yepSchema = useRef(Yup.object().shape({}));
    let initialValues = useRef({});
    let fieldToGetValidation = useRef<FormInputFieldData[]>([]);

    // Here lies some pretty nasty expensive operations,
    // therefore using extreme caution
    useMemo(() => {
      setupFormInitialValuesAndSchema();
      function setupFormInitialValuesAndSchema() {
        updateProfileUiData?.sections?.forEach((value) => {
          fieldToGetValidation.current = [
            ...fieldToGetValidation.current,
            ...(value.formInputs ?? [])
          ];
        });

        yepSchema.current =
          updateProfileUiData !== undefined
            ? createYupSchema(fieldToGetValidation.current)
            : Yup.object().shape({});

        AppLog.log(
          () => "Created updated schema..." + JSON.stringify(yepSchema)
        );

        // FieldBox's initial state is not being handled here.
        // it is being handled in CustomFormFieldItem
        updateProfileUiData?.sections?.forEach((section) => {
          section.formInputs?.forEach((formInput) => {
            // @ts-ignore
            if (
              formInput.inputType === "multiselect" ||
              formInput.inputType === "checkbox"
            ) {
              // @ts-ignore
              initialValues.current[
                formInput.id
              ] = formInput.userMeta?.map((value) => value.value);
            } else {
              // @ts-ignore
              initialValues.current[formInput.id] =
                formInput.userMeta?.[0]?.value;
            }
          });
        });
      }
    }, [updateProfileUiData]);

    return (
      <KeyboardAwareScrollView keyboardOpeningTime={50} extraHeight={200}>
        <AppForm
          initialValues={initialValues.current}
          validateOnMount={false}
          validationSchema={yepSchema.current}
          onSubmit={onSubmit}>
          {infoTextShown && (
            <AppLabel
              text={
                "This information will be help us to find better roommate match for you."
              }
              numberOfLines={0}
              style={styles.topText}
            />
          )}

          <DynamicFormView sectionsData={updateProfileUiData?.sections} />

          <View style={styles.buttonViewStyle}>
            <AppFormFormSubmit
              text={STRINGS.profile.buttonText.saveAndContinue}
              buttonType={BUTTON_TYPES.NORMAL}
              fontWeight={"semi-bold"}
              textStyle={{ color: theme.themedColors.background }}
              buttonStyle={[
                styles.buttonStyle,
                { backgroundColor: theme.themedColors.primary }
              ]}
              rightIcon={rightArrowIcon}
              iconStyle={styles.iconStyle}
              shouldShowProgressBar={shouldShowProgressBar}
            />
          </View>
        </AppForm>
      </KeyboardAwareScrollView>
    );
  }
);

const styles = StyleSheet.create({
  buttonViewStyle: {
    marginTop: SPACE.lg,
    marginHorizontal: SPACE.lg,
    marginBottom: SPACE.xl
  },
  buttonStyle: {
    height: 44
  },
  iconStyle: {
    marginRight: SPACE.lg
  },
  headingView: {
    paddingHorizontal: SPACE.lg,
    paddingTop: SPACE.lg
  },
  textStyle: {
    textAlign: "center"
  },
  topText: {
    paddingHorizontal: SPACE._2xl,
    paddingTop: SPACE.md,
    textAlign: "center",
    lineHeight: FONT_SIZE_LINE_HEIGHT.sm
  }
});
