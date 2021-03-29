import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import {
  AppLabel,
  AppLabelProps
} from "ui/components/atoms/app_label/AppLabel";
import { COLORS, FONT_SIZE, FONTS, SPACE } from "config";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import {
  AppDropdown,
  AppDropdownProps
} from "ui/components/organisms/app_dropdown/AppDropdown";
import { FormikValues, useFormikContext } from "formik";
import { AppFormValidationLabel } from "ui/components/molecules/app_form/AppFormValidationLabel";
import { SvgProp } from "utils/Util";

type Props = {
  labelProps?: AppLabelProps;
  name: string;
  appDropDownProps: AppDropdownProps;
  validationLabelTestID?: string;
  style?: StyleProp<ViewStyle>;
  dropDownIcon?: SvgProp;
  shouldShowCustomIcon?: boolean;
};

export const AppFormDropDown: React.FC<Props> = ({
  labelProps,
  name,
  appDropDownProps,
  validationLabelTestID
  // style,
  // dropDownIcon,
  // shouldShowCustomIcon = false
}) => {
  const theme = usePreferredTheme();
  const { errors, touched, values } = useFormikContext<FormikValues>();
  return (
    <>
      {labelProps && (
        <AppLabel
          style={[styles.label, { color: theme.themedColors.label }]}
          {...labelProps}
        />
      )}
      <AppDropdown
        {...appDropDownProps}
        selectedItemCallback={(item) => {
          values[name] = item;
        }}
      />
      {errors[name] && touched[name] && (
        <AppFormValidationLabel
          validationLabelTestID={validationLabelTestID}
          errorString={errors[name] as string}
          shouldVisible={true}
        />
      )}
      {/*style={style}*/}
      {/*shouldShowCustomIcon={shouldShowCustomIcon}*/}
      {/*dropDownIcon={dropDownIcon}*/}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    paddingBottom: SPACE.xsm
  },
  input: {
    flexDirection: "row",
    justifyContent: "center",
    color: COLORS.textColor1,
    borderStyle: "solid",
    height: 42,
    borderRadius: 5,
    borderColor: COLORS.grey3,
    paddingRight: SPACE.md,
    paddingLeft: SPACE.md,
    fontSize: FONT_SIZE.xsm,
    fontFamily: FONTS.regular,
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1

    // //Its for IOS
    // shadowColor: COLORS.black,
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    //
    // // its for android
    // elevation: 2,
    // backgroundColor: "white"
  }
});
