import { FormInputFieldData } from "models/api_responses/RoommateAgreementResponseModel";
import React from "react";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { DynamicAppFormField } from "ui/components/templates/roommate_agreement/DynamicAppFormField";
import { AppLog } from "utils/Util";
import { CheckBoxGroup } from "ui/components/atoms/checkbox_group/CheckBoxGroup";
import { AppFormDropDown } from "ui/components/molecules/app_form/AppFormDropDown";
import { SPACE, STRINGS } from "config";
import { StyleSheet, View } from "react-native";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { AppFormRadioButton } from "ui/components/molecules/app_form/AppFormRadioButton";
import { DIRECTION_TYPE } from "ui/components/atoms/radio_group/RadioGroup";
import AppFormField from "ui/components/molecules/app_form/AppFormField";
//for multiselect item
import ChevronRight from "assets/images/chevron_right.svg";
import { FieldBox } from "ui/components/atoms/FieldBox";
import { UploadProfilePhoto } from "ui/components/templates/basic_profile/UploadProfilePhoto";

type CustomFormFieldProps = {
  listData: FormInputFieldData;
};
export const CustomFormFieldItem = React.memo<CustomFormFieldProps>(
  ({ listData }) => {
    //for multi select item
    const chevronRight = () => <ChevronRight height={20} width={20} />;

    AppLog.logForcefully("Options Data " + listData.options);
    const theme = usePreferredTheme();
    switch (listData.inputType) {
      case "agreement":
        return <AppLabel text={"Agreement"} />;
      case "text":
        return <AppLabel text={"text"} />;
      case "textarea":
        return (
          <>
            <View style={styles.spacer} />

            <DynamicAppFormField
              label={listData?.label}
              placeHolder={listData?.placeholder}
              name={listData?.id.toString()}
            />
          </>
        );
      case "dropdown":
        return (
          <>
            <View style={styles.spacer} />

            <AppFormDropDown
              name="gender"
              validationLabelTestID={"genderValidationTestID"}
              labelProps={{
                text: listData.label,
                weight: "semi-bold"
              }}
              appDropDownProps={{
                title: STRINGS.profile.dropDownInitialValue.gender,
                items: listData.options,
                selectedItemCallback: () => {
                  //setTitle(item.title);
                },
                style: [
                  styles.dropDown,
                  { borderColor: theme.themedColors.border }
                ]
              }}
            />
          </>
        );

      case "checkbox":
        return (
          <CheckBoxGroup
            listData={listData}
            labelProps={{
              text: listData.label,
              weight: "semi-bold",
              numberOfLines: 0
            }}
            onChange={(value) => AppLog.log(value)}
          />
        );
      case "radio":
        return (
          <>
            <View style={styles.spacer} />
            <AppFormRadioButton
              labelProps={{
                text: listData.label,
                weight: "semi-bold"
              }}
              radioData={listData.options!}
              direction={DIRECTION_TYPE.HORIZONTAL}
            />
          </>
        );
      case "date":
        return <AppLabel text={"date"} />;
      case "multiselect":
        return (
          <>
            <View style={styles.spacer} />

            <FieldBox
              name={listData.name}
              title={listData.label}
              textStyle={{ color: theme.themedColors.placeholder }}
              rightIcon={chevronRight}
            />
          </>
        );

      case "textfield":
        return (
          <>
            <View style={styles.spacer} />
            <AppFormField
              fieldTestID="firstName"
              validationLabelTestID={"firstNameValidationLabel"}
              name={listData.name}
              labelProps={{
                text: listData?.label,
                weight: "semi-bold"
              }}
              fieldInputProps={{
                textContentType: "name",
                keyboardType: "default",
                returnKeyType: "next",
                placeholder: listData?.placeholder,
                autoCapitalize: "none",
                placeholderTextColor: theme.themedColors.placeholder,
                style: { color: theme.themedColors.label },
                viewStyle: [
                  styles.textFieldStyle,
                  {
                    backgroundColor: theme.themedColors.background,
                    borderColor: theme.themedColors.border
                  }
                ]
              }}
            />
          </>
        );

      case "uploadphoto":
        return (
          <>
            <View style={styles.spacer} />

            <UploadProfilePhoto />
          </>
        );

      default:
        return null;
    }
  }
);

const styles = StyleSheet.create({
  dropDown: {
    borderWidth: 1
  },
  textFieldStyle: {
    borderWidth: 1
  },
  spacer: {
    paddingTop: SPACE.lg
  }
});

export default CustomFormFieldItem;
