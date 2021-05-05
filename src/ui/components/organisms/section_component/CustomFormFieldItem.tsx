import { FormInputFieldData } from "models/api_responses/RoommateAgreementResponseModel";
import React from "react";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { DynamicAppFormField } from "ui/components/templates/roommate_agreement/DynamicAppFormField";
import { AppLog } from "utils/Util";
import { CheckBoxGroup } from "ui/components/atoms/checkbox_group/CheckBoxGroup";
import { AppFormDropDown } from "ui/components/molecules/app_form/AppFormDropDown";
import { STRINGS } from "config";
import { StyleSheet } from "react-native";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { AppFormRadioButton } from "ui/components/molecules/app_form/AppFormRadioButton";
import { DIRECTION_TYPE } from "ui/components/atoms/radio_group/RadioGroup";

type CustomFormFieldProps = {
  listData: FormInputFieldData;
};
export const CustomFormFieldItem = React.memo<CustomFormFieldProps>(
  ({ listData }) => {
    AppLog.logForcefully("Options Data " + listData.options);
    const theme = usePreferredTheme();
    switch (listData.inputType) {
      case "agreement":
        return <AppLabel text={"Agreement"} />;
      case "text":
        return <AppLabel text={"text"} />;
      case "textarea":
        return (
          <DynamicAppFormField
            label={listData?.label}
            placeHolder={listData?.placeholder}
            name={listData?.id.toString()}
          />
        );
      case "dropdown":
        return (
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
          <AppFormRadioButton
            labelProps={{
              text: listData.label,
              weight: "semi-bold"
            }}
            radioData={listData.options!}
            //listData={listData}
            direction={DIRECTION_TYPE.HORIZONTAL}
          />
        );
      case "date":
        return <AppLabel text={"date"} />;
      case "multiselect":
        return <AppLabel text={"multiselect"} />;

      case "textfield":
        return <AppLabel text={"multiselect"} />;

      default:
        return null;
    }
  }
);

const styles = StyleSheet.create({
  dropDown: {
    borderWidth: 1
  }
});

export default CustomFormFieldItem;
