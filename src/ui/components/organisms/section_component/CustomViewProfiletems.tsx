import { FormInputFieldData } from "models/api_responses/RoommateAgreementResponseModel";
import React from "react";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { SPACE } from "config";
import { StyleSheet, View } from "react-native";

type CustomViewProfileProps = {
  listData: FormInputFieldData;
};

export const CustomViewProfileItems = React.memo<CustomViewProfileProps>(
  ({ listData }) => {
    //for multi select item
    //const chevronRight = () => <ChevronRight height={20} width={20} />;

    // const theme = usePreferredTheme();

    switch (listData.inputType) {
      case "agreement":
        return <AppLabel text={"Agreement"} />;
      case "textarea":
        return (
          <>
            <View style={styles.spacer} />
          </>
        );
      case "dropdown":
        return <AppLabel text={"dropdown"} />;

      case "checkbox":
        return <AppLabel text={"checkbox"} />;
      case "radio":
        return (
          <>
            <View style={styles.spacer} />
            <AppLabel text={"checkbox"} />
          </>
        );
      case "date":
        return <AppLabel text={"date"} />;
      case "multiselect":
        return (
          <>
            <View style={styles.spacer} />
            <AppLabel text={"date"} />
          </>
        );

      case "text":
        return (
          <>
            <View style={styles.spacer} />
            <AppLabel text={"checkbox"} />
          </>
        );

      case "file":
        return (
          <>
            <View style={styles.spacer} />

            <AppLabel text={"file"} />
          </>
        );

      default:
        return null;
    }
  }
);
const styles = StyleSheet.create({
  space: {
    marginTop: SPACE.sm
  },
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
