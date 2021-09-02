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
import {
  Alert,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
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
import { RoommateAgreementParty } from "models/api_responses/AgreementAnswerResponseModel";
import useAuth from "hooks/useAuth";

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
  title: RoommateAgreementParty[];
  viewShotRef: React.MutableRefObject<View | null | undefined>;
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
  shouldShowAgreementDialog,
  title,
  viewShotRef
}) => {
  AppLog.logForcefully(() => "in RoommateAgreementView()...");

  const { user } = useAuth();
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
      (item) => item.inputType === "agreement"
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

  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Image Download Permission",
          message:
            "Your permission is required to save images to your device",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      AppLog.logForcefully(() => "dpremission: " + granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        "Save remote Image",
        "Grant Me Permission to save Image",
        [{ text: "OK", onPress: () => AppLog.log(() => "OK Pressed") }],
        { cancelable: false }
      );
    } catch (err) {
      Alert.alert(
        "Save remote Image",
        "Failed to save Image: " + err.message,
        [{ text: "OK", onPress: () => AppLog.log(() => "OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  useEffect(() => {
    init();
    getPermissionAndroid();
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
      message={`Do you agree with the terms and conditions of this roommate agreement?`}
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
          onPress: () => {
            shouldShowAgreementDialog(false);
          }
        }
      ]}
    />
  );
  const getRoommatePartiesName = (
    roommateAgreementParties: RoommateAgreementParty[],
    currentUserId: number
  ) => {
    if (roommateAgreementParties && roommateAgreementParties.length > 0) {
      return `You, ${roommateAgreementParties
        .reduce(
          (newArray: string[], _item: RoommateAgreementParty) => (
            currentUserId !== _item.userId &&
              newArray.push(_item.firstName + " " + _item.lastName),
            newArray
          ),
          []
        )
        .slice(0, -1)
        .join(", ")} and ${
        roommateAgreementParties[roommateAgreementParties.length - 1]
          .firstName +
        " " +
        roommateAgreementParties[roommateAgreementParties.length - 1]
          .lastName
      } are the parties of this roommate agreement.`;
    }
  };

  // let statsRef = React.useRef<View | null>();

  AppLog.logForcefully(() => "setTimeout ", viewShotRef);

  return (
    <Screen shouldAddBottomInset={false}>
      <ScrollView>
        <View>
          <AppForm
            initialValues={myInitialValues}
            onSubmit={onSubmit}
            validateOnMount={false}
            validationSchema={yupSchema.current}>
            <View style={styles.labelViewStyle}>
              <AppLabel
                text={getRoommatePartiesName(title, user?.profile?.id!)}
                numberOfLines={0}
              />
            </View>
            <View
              collapsable={false}
              style={{ flex: 1 }}
              ref={(view) => (viewShotRef.current = view)}>
              <DynamicFormView
                sectionsData={formFields}
                showProgressBar={showProgressBar}
                roommateAgreement={true}
              />
            </View>
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
        </View>
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
