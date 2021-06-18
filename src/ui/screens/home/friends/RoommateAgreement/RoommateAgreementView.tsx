import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import Screen from "ui/components/atoms/Screen";
import AppForm from "ui/components/molecules/app_form/AppForm";
import { FormikValues } from "formik";
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
import { DynamicFormView } from "ui/components/templates/dynamic_card_view/DynamicFormView";

type Props = {
  myInitialValues: FormikValues;
  dataManipulation: (value: any, inputType?: string) => any;
  roommateData: AgreementField[];
  showProgressBar: boolean;
  handleSaveAndContinue: (values: AgreementAnswersRequestModel) => void;
  showAgreementDialog: boolean;
  agreementDialogCallback: (status: string) => void;
  progressBarBtn: boolean;
  shouldShowAgreementDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const RoommateAgreementView: FC<Props> = ({
  myInitialValues,
  dataManipulation,
  roommateData,
  showProgressBar,
  handleSaveAndContinue,
  showAgreementDialog,
  agreementDialogCallback,
  progressBarBtn,
  shouldShowAgreementDialog
}) => {
  AppLog.logForcefully(() => "in RoommateAgreementView()...");

  const { themedColors } = usePreferredTheme();
  let yupSchema = useRef(Yup.object().shape({}));
  const [formFields, setFormFields] = useState<SectionsType[] | undefined>(
    undefined
  );

  const init = useCallback(() => {
    let counter = 0;
    let section: SectionsType[] = [];

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

    /*myInitialValues.current["1"] = roommateData.*/
  }, [roommateData]);

  useEffect(() => {
    init();
  }, [init]);

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
          title: "Disagree",
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
          onPress: () => {
            shouldShowAgreementDialog(false);
          }
        }
      ]}
    />
  );

  return (
    <Screen shouldAddBottomInset={false}>
      <ScrollView>
        <AppForm
          initialValues={myInitialValues}
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

          <DynamicFormView
            sectionsData={formFields}
            showProgressBar={showProgressBar}
            updateProfile={true}
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
