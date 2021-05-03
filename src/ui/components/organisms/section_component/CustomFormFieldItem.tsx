import { FormInputFieldData } from "models/api_responses/RoommateAgreementResponseModel";
import React from "react";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { DynamicAppFormField } from "ui/components/templates/roommate_agreement/DynamicAppFormField";
import { AppLog } from "utils/Util";
import { CheckBoxGroup } from "ui/components/atoms/checkbox_group/CheckBoxGroup";

type CustomFormFieldProps = {
  listData: FormInputFieldData;
};

export const CustomFormFieldItem = React.memo<CustomFormFieldProps>(
  ({ listData }) => {
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
        return <AppLabel text={"dropdown"} />;

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
        return <AppLabel text={"radio"} />;
      case "date":
        return <AppLabel text={"date"} />;
      case "multiselect":
        return <AppLabel text={"multiselect"} />;

      default:
        return null;
    }
  }
);

export default CustomFormFieldItem;
