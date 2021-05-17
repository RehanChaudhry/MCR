import React, { FC } from "react";
import Screen from "ui/components/atoms/Screen";
import RoommateAgreementTerms from "ui/components/templates/roommate_agreement/RoommateAgreementTerms";
import AppForm from "ui/components/molecules/app_form/AppForm";
import { FormikValues } from "formik";
import { ScrollView, StyleSheet, View } from "react-native";
import { SPACE, STRINGS } from "config";
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

type Props = {
  roommateData: FormInputFieldData[] | undefined;
};

// const validationSchema = Yup.object().shape({
//   frustrated: Yup.object().required("Select one option"),
//   upset: Yup.string()
//     .required("This field is required")
//     .min(1, "should be atleast 1 characters")
//     .max(50, "should be less than 50 characters")
// });
//
// let initialValues: FormikValues = {
//   frustrated: "",
//   upset: ""
// };

const RoommateAgreementView: FC<Props> = ({ roommateData }) => {
  const theme = usePreferredTheme();
  const yepSchema =
    roommateData !== undefined
      ? createYupSchema(roommateData!!)
      : Yup.string().notRequired();
  let initialValues = {};
  roommateData?.forEach((item) => {
    // @ts-ignore
    initialValues[item.id] = "";
  });
  const onSubmit = (_value: FormikValues) => {
    initialValues = _value;
    AppLog.log("Button Pressed");
  };
  return (
    <Screen shouldAddBottomInset={false}>
      <ScrollView>
        <View style={styles.labelViewStyle}>
          <AppLabel
            text={
              "You, Kinslee Fink and Rosa Lawson are the parties of this roommate agreement."
            }
            numberOfLines={0}
          />
        </View>
        <RoommateAgreementTerms />

        <CardView style={styles.cardView}>
          <View style={styles.innerCardView}>
            <AppForm
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={yepSchema}>
              <SectionComponent listData={roommateData} />
              <AppFormFormSubmit
                text={STRINGS.profile.buttonText.saveAndContinue}
                buttonType={BUTTON_TYPES.NORMAL}
                fontWeight={"semi-bold"}
                textStyle={{ color: theme.themedColors.background }}
                buttonStyle={[
                  styles.buttonStyle,
                  { backgroundColor: theme.themedColors.primary }
                ]}
              />
            </AppForm>
          </View>
        </CardView>
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
  }
});

export default RoommateAgreementView;
