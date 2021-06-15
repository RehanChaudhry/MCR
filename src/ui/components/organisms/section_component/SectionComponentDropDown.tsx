import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { SPACE, STRINGS } from "config";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { FormInputFieldData } from "models/api_responses/RoommateAgreementResponseModel";
import { AppFormDropDown } from "ui/components/molecules/app_form/AppFormDropDown";

type Props = {
  listData: FormInputFieldData;
};

const SectionComponentDropDown: FC<Props> = ({ listData }) => {
  const theme = usePreferredTheme();

  return (
    <AppFormDropDown
      style={styles.padding}
      name={listData.id.toString()}
      validationLabelTestID={"genderValidationTestID"}
      labelProps={{
        text: listData.label,
        weight: "semi-bold"
      }}
      isLocked={listData.isLocked}
      appDropDownProps={{
        title: STRINGS.profile.dropDownInitialValue.gender,
        items: listData.options!,
        selectedItemCallback: () => {
          //setTitle(item.title);
        },
        style: [
          styles.dropDown,
          {
            borderColor: !listData.isLocked
              ? theme.themedColors.border
              : theme.themedColors.borderSecondary,
            backgroundColor: !listData.isLocked
              ? theme.themedColors.background
              : theme.themedColors.backgroundSecondary
          }
        ]
      }}
    />
  );
};

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
  padding: {
    marginBottom: SPACE.lg
  }
});

export default SectionComponentDropDown;
