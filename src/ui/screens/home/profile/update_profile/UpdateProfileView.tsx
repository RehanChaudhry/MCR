import React, { useCallback, useEffect, useRef } from "react";
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
import { DynamicCardView } from "ui/components/templates/dynamic_card_view/DynamicCardView";
import { ProfileData } from "models/api_responses/UpdateProfileUiResponseModel";
import { UpdateProfileUiRequestModel } from "models/api_requests/UpdateProfileUiRequestModel";
import { createYupSchema } from "utils/YupSchemaCreator";
import _ from "lodash";
import { FormInputFieldData } from "models/api_responses/RoommateAgreementResponseModel";

type Props = {
  openUpdateQuestionnaireScreen: () => void;
  infoTextShown: boolean;
  handleUpdateProfile: (values: UpdateProfileUiRequestModel) => void;
  updateProfileUiData: ProfileData | undefined;
  shouldShowProgressBar: boolean;
};

export const UpdateProfileView: React.FC<Props> = ({
  //openUpdateQuestionnaireScreen,
  infoTextShown,
  handleUpdateProfile,
  updateProfileUiData,
  shouldShowProgressBar
}) => {
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

  let yepSchema = useRef({});
  let initialValues = useRef({});
  let fieldToGetValidation = useRef<FormInputFieldData[]>([]);

  // dynamic form validation making sure this complex logic executes only once when screen renders
  const init = useCallback(() => {
    updateProfileUiData?.sections.forEach((value) => {
      fieldToGetValidation.current = [
        ...fieldToGetValidation.current,
        ...(value.formInputs ?? [])
      ];
    });

    fieldToGetValidation.current = fieldToGetValidation.current.filter(
      (value) => value.isRequired === 1
    );

    yepSchema.current =
      updateProfileUiData !== undefined
        ? createYupSchema(fieldToGetValidation.current)
        : Yup.string().notRequired();

    // FieldBox's initial state is being handled here.
    // it is being handled in CustomForFieldItem
    updateProfileUiData?.sections?.forEach((section) => {
      section.formInputs?.forEach((formInput) => {
        // @ts-ignore
        initialValues.current[formInput.id] =
          formInput.userMeta?.[0]?.value;
      });
    });
  }, [updateProfileUiData]);

  useEffect(() => {
    init();
  }, [init]);

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

        <DynamicCardView sectionsData={updateProfileUiData?.sections} />
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
};

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
