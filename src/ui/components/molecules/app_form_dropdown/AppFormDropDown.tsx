import React from "react";
import { StyleSheet } from "react-native";
import { AppLabel, AppLabelProps } from "../../atoms/app_label/AppLabel";
import { COLORS, FONT_SIZE, FONTS, SPACE } from "../../../../config";
import usePreferredTheme from "../../../../hooks/theme/usePreferredTheme";
import {
  AppDropdown,
  AppDropdownProps
} from "../../organisms/app_dropdown/AppDropdown";

type Props = {
  labelProps?: AppLabelProps;
  appDropDownProps: AppDropdownProps;
};

export const AppFormDropDown: React.FC<Props> = ({
  labelProps,
  appDropDownProps
}) => {
  const theme = usePreferredTheme();
  return (
    <>
      {labelProps && (
        <AppLabel
          style={[styles.label, { color: theme.themedColors.label }]}
          {...labelProps}
        />
      )}
      <AppDropdown {...appDropDownProps} />
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
    fontSize: FONT_SIZE.md,
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
