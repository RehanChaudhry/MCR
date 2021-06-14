import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import Screen from "ui/components/atoms/Screen";
import AppForm from "ui/components/molecules/app_form/AppForm";
import { FormikValues, isObject } from "formik";
import { ScrollView, StyleSheet, View } from "react-native";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import AppFormFormSubmit from "ui/components/molecules/app_form/AppFormSubmit";
import { BUTTON_TYPES } from "ui/components/molecules/app_button/AppButton";
import { AppLog } from "utils/Util";
import { createYupSchema } from "utils/YupSchemaCreator";
import * as Yup from "yup";
import { AgreementAnswersRequestModel } from "models/api_requests/AgreementAnswersRequestModel";
import AppPopUp from "ui/components/organisms/popup/AppPopUp";
import { AgreementField } from "models/api_requests/GetAgreementApi";
import { SectionsType } from "models/api_responses/DynamicFormSections";
import { DynamicCardView } from "ui/components/templates/dynamic_card_view/DynamicCardView";

type Props = {
  roommateData: AgreementField[] | undefined;
  showProgressBar: boolean;
  handleSaveAndContinue: (values: AgreementAnswersRequestModel) => void;
  showAgreementDialog: boolean;
  agreementDialogCallback: (status: string) => void;
  progressBarBtn: boolean;
};

const RoommateAgreementView: FC<Props> = ({
  roommateData,
  showProgressBar,
  handleSaveAndContinue,
  showAgreementDialog,
  agreementDialogCallback,
  progressBarBtn
}) => {
  const { themedColors } = usePreferredTheme();
  let myInitialValues = useRef<FormikValues>({});
  let yupSchema = useRef({});
  const [formFields, setFormFields] = useState<SectionsType[] | undefined>(
    undefined
  );

  const init = useCallback(() => {
    let counter = 0;
    let section: SectionsType[] = [];

    if (roommateData !== undefined && roommateData.length > 0) {
      //Create section ourselves
      let firstElement = (roommateData as AgreementField[]).find(
        (item) => item.id === 1
      );

      if (firstElement !== undefined) {
        section[counter] = {
          // @ts-ignore
          formInputs: [firstElement as AgreementField]
        };
        counter++;
      }

      section[counter] = {
        // @ts-ignore
        formInputs: roommateData.slice(1) as AgreementField[]
      };

      setFormFields(section);

      yupSchema.current = createYupSchema(roommateData);

      myInitialValues.current = roommateData.reduce(
        (map, obj: AgreementField) => {
          // @ts-ignore
          map[obj.id] = dataManipulation(
            obj.agreementUserAnswers.map(
              (data) => data.agreementFieldValue
            ),
            obj.inputType
          );
          return map;
        },
        {}
      );

      /*myInitialValues.current["1"] = roommateData.*/
    } else {
      yupSchema.current = Yup.string().notRequired();
    }
  }, [roommateData]);

  useEffect(() => {
    init();
  }, [init]);

  function dataManipulation(value: any, inputType?: string) {
    if (Array.isArray(value) && value.length === 1) {
      return (inputType ?? "") === "checkbox" ? [value[0]] : value[0];
    } else if (Array.isArray(value) && value.length > 1) {
      return value.reduce(
        (newArray: string[], _item: any) => (
          newArray.push(isObject(_item) ? _item.value : _item), newArray
        ),
        []
      );
    } else if (isObject(value)) {
      return value.value;
    } else {
      return value;
    }
  }

  const onSubmit = (_value: FormikValues) => {
    AppLog.log(() => "Button Pressed" + JSON.stringify(_value));
    handleSaveAndContinue({
      agreementUserAnswers: Object.entries(_value).map(([key, value]) => ({
        agreementFieldId: Number(key),
        agreementFieldValue: dataManipulation(value)
      }))
      /* agreementAccepted:
        _value[roommateData?.find((item) => item.id === 1)?.id ?? "0"]*/
    });
  };

  const agreementDialog = () => (
    <AppPopUp
      isVisible={showAgreementDialog}
      title={STRINGS.roommateAgreement.roommate_agreement_text}
      titleStyle={{ style: styles.dialogTitleStyle, weight: "semi-bold" }}
      messageStyle={{ style: styles.dialogMessageStyle }}
      message={`Do you want to add  in your dismissed list or blocked list?`}
      actions={[
        {
          title: "Agree",
          onPress: () => {
            agreementDialogCallback("agreed");
          },
          style: {
            weight: "semi-bold",
            style: [{ color: themedColors.warn }, styles.dialogButtonStyle]
          }
        },
        {
          title: "DisAgree",
          onPress: () => {
            agreementDialogCallback("disagreed");
          },
          style: {
            weight: "semi-bold",
            style: [
              { color: themedColors.danger },
              styles.dialogButtonStyle
            ]
          }
        },
        {
          title: "Cancel",
          style: {
            style: styles.dialogButtonStyle
          },
          onPress: () => {}
        }
      ]}
    />
  );

  return (
    <Screen shouldAddBottomInset={false}>
      <ScrollView>
        <AppForm
          initialValues={myInitialValues.current}
          onSubmit={onSubmit}
          validateOnMount={false}
          validationSchema={yupSchema.current}>
          <View style={styles.labelViewStyle}>
            <AppLabel
              text={
                "You, Kinslee Fink and Rosa Lawson are the parties of this roommate agreement."
              }
              numberOfLines={0}
            />
          </View>

          <DynamicCardView
            sectionsData={formFields}
            showProgressBar={showProgressBar}
          />
          {agreementDialog()}
          <View style={styles.button}>
            <AppFormFormSubmit
              text={STRINGS.profile.buttonText.saveAndContinue}
              buttonType={BUTTON_TYPES.NORMAL}
              fontWeight={"semi-bold"}
              textStyle={{ color: themedColors.background }}
              shouldShowProgressBar={progressBarBtn}
              buttonStyle={[
                styles.buttonStyle,
                { backgroundColor: themedColors.primary }
              ]}
            />
          </View>
        </AppForm>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  labelViewStyle: {
    paddingHorizontal: SPACE.lg,
    paddingTop: SPACE.lg
  },
  buttonViewStyle: {
    marginTop: SPACE.lg,
    marginHorizontal: SPACE.lg,
    marginBottom: SPACE.xl
  },
  buttonStyle: {
    height: 44
  },
  dropDown: {
    borderWidth: 1
  },
  innerCardView: {
    marginHorizontal: SPACE.lg,
    paddingTop: SPACE.lg,
    paddingBottom: SPACE.lg
  },
  cardView: {
    marginHorizontal: SPACE.lg,
    marginTop: SPACE.lg,
    marginBottom: SPACE.lg
  },
  button: {
    marginHorizontal: SPACE.lg,
    marginBottom: SPACE.lg,
    marginTop: SPACE.lg
  },
  dialogButtonStyle: {
    textAlign: "center",
    fontSize: FONT_SIZE.base
  },
  dialogTitleStyle: { fontSize: FONT_SIZE.base, textAlign: "center" },
  dialogMessageStyle: { fontSize: FONT_SIZE.sm, textAlign: "center" }
});

export default RoommateAgreementView;
