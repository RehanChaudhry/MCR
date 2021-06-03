import React, { FC } from "react";
import Screen from "ui/components/atoms/Screen";
import RoommateAgreementTerms from "ui/components/templates/roommate_agreement/RoommateAgreementTerms";
import AppForm from "ui/components/molecules/app_form/AppForm";
import { FormikValues, isObject } from "formik";
import { ScrollView, StyleSheet, View } from "react-native";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FormInputFieldData } from "models/api_responses/RoommateAgreementResponseModel";
import { CardView } from "ui/components/atoms/CardView";
import { SectionComponent } from "ui/components/organisms/section_component/SectionComponent";
import AppFormFormSubmit from "ui/components/molecules/app_form/AppFormSubmit";
import { BUTTON_TYPES } from "ui/components/molecules/app_button/AppButton";
import { AppLog } from "utils/Util";
import { createYupSchema } from "utils/YupSchemaCreator";
import * as Yup from "yup";
import { AgreementAnswersRequestModel } from "models/api_requests/AgreementAnswersRequestModel";
import AppPopUp from "ui/components/organisms/popup/AppPopUp";

type Props = {
  roommateData: FormInputFieldData[] | undefined;
  showProgressBar: boolean;
  handleSaveAndContinue: (values: AgreementAnswersRequestModel) => void;
  showAgreementDialog: boolean;
  agreementDialogCallback: (status: string) => void;
};

const RoommateAgreementView: FC<Props> = ({
  roommateData,
  showProgressBar,
  handleSaveAndContinue,
  showAgreementDialog,
  agreementDialogCallback
}) => {
  const { themedColors } = usePreferredTheme();

  let switchedValue: boolean = false;

  const yepSchema =
    roommateData !== undefined
      ? createYupSchema(roommateData!!)
      : Yup.string().notRequired();
  let initialValues = {};
  roommateData?.forEach((item) => {
    // @ts-ignore
    initialValues[item.id] = "";
  });

  function getData(value: any) {
    if (Array.isArray(value)) {
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
    initialValues = _value;
    AppLog.log("Button Pressed" + JSON.stringify(initialValues));
    handleSaveAndContinue({
      agreementUserAnswers: Object.entries(_value).map(([key, value]) => ({
        agreementFieldId: Number(key),
        agreementFieldValue: getData(value)
      })),
      agreementAccepted: switchedValue
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
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={yepSchema}>
          <View style={styles.labelViewStyle}>
            <AppLabel
              text={
                "You, Kinslee Fink and Rosa Lawson are the parties of this roommate agreement."
              }
              numberOfLines={0}
            />
          </View>
          <RoommateAgreementTerms
            onSwitchValueChange={(isSwitched) => {
              switchedValue = isSwitched;
            }}
          />

          <CardView style={styles.cardView}>
            <View style={styles.innerCardView}>
              <SectionComponent
                listData={roommateData}
                showProgressBar={showProgressBar}
              />
            </View>
          </CardView>
          {agreementDialog()}
          <View style={styles.button}>
            <AppFormFormSubmit
              text={STRINGS.profile.buttonText.saveAndContinue}
              buttonType={BUTTON_TYPES.NORMAL}
              fontWeight={"semi-bold"}
              textStyle={{ color: themedColors.background }}
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
  button: { marginHorizontal: SPACE.lg, marginBottom: SPACE.lg },
  dialogButtonStyle: {
    textAlign: "center",
    fontSize: FONT_SIZE.base
  },
  dialogTitleStyle: { fontSize: FONT_SIZE.base, textAlign: "center" },
  dialogMessageStyle: { fontSize: FONT_SIZE.sm, textAlign: "center" }
});

export default RoommateAgreementView;
