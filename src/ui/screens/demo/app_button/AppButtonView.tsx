import { usePreferredTheme } from "hooks";
import React, { FC, useState } from "react";
import { StyleSheet } from "react-native";
import { Color, NumberProp } from "react-native-svg";
import {
  AppButton,
  BUTTON_TYPES
} from "ui/components/molecules/app_button/AppButton";
import { ThemeSwitcher } from "ui/components/templates/ThemeSwitcher";
import { AppLog, SvgProp } from "utils/Util";
import LeftIcon from "assets/images/left.svg";
import RightIcon from "assets/images/right.svg";

type Props = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AppButtonView: FC<Props> = (props) => {
  const theme = usePreferredTheme();
  const [isSelected, setIsSelected] = useState(false);
  const onPress = () => {
    AppLog.log("isSelected: " + isSelected);
    if (isSelected) {
      setIsSelected(false);
    } else {
      setIsSelected(true);
    }
  };
  const leftIcon: SvgProp = (
    color?: Color,
    width?: NumberProp,
    height?: NumberProp
  ) => {
    return (
      <LeftIcon
        testID="left-icon"
        width={width}
        height={height}
        fill={isSelected ? theme.themedColors.secondaryIconColor : color}
        style={style.leftIcon}
      />
    );
  };
  const rightIcon: SvgProp = (
    color?: Color,
    width?: NumberProp,
    height?: NumberProp
  ) => {
    return (
      <RightIcon
        testID="right-icon"
        style={style.rightIcon}
        width={width}
        height={height}
        fill={color}
      />
    );
  };
  return (
    <ThemeSwitcher>
      <AppButton text="Submit" buttonStyle={style.buttonStyle} />
      <AppButton
        text="Submit"
        shouldShowProgressBar={true}
        buttonStyle={style.buttonStyle}
      />
      <AppButton
        text="Submit"
        rightIcon={rightIcon}
        buttonStyle={style.buttonStyle}
      />
      <AppButton
        text="Submit"
        leftIcon={leftIcon}
        buttonStyle={style.buttonStyle}
      />
      <AppButton
        text="Submit"
        rightIcon={rightIcon}
        leftIcon={leftIcon}
        buttonStyle={style.buttonStyle}
      />
      <AppButton
        text="Submit"
        buttonStyle={style.buttonStyle}
        buttonType={BUTTON_TYPES.BORDER}
      />
      <AppButton
        text="Submit"
        buttonStyle={style.buttonStyle}
        buttonType={BUTTON_TYPES.DASH}
      />

      <AppButton
        text="Submit"
        buttonStyle={[style.buttonStyle, { backgroundColor: undefined }]}
        buttonType={BUTTON_TYPES.LINK}
      />

      <AppButton
        text="Disabled Button"
        buttonStyle={[style.buttonStyle]}
        buttonType={BUTTON_TYPES.NORMAL}
        isDisable={true}
      />

      <AppButton
        text={isSelected ? "Liked" : "Like"}
        buttonStyle={style.buttonStyle}
        isSelected={isSelected}
        textStyle={{
          color: theme.themedColors.secondaryLabelColor
        }}
        onPress={onPress}
        iconStyle={{ tintColor: theme.themedColors.secondaryLabelColor }}
        leftIcon={leftIcon}
      />
      <AppButton
        text="Submit"
        buttonStyle={[style.buttonStyle]}
        buttonType={BUTTON_TYPES.BORDER}
        shouldShowError={true}
      />
      <AppButton
        text="Submit"
        buttonStyle={[style.buttonStyle, { backgroundColor: undefined }]}
        buttonType={BUTTON_TYPES.LINK}
        shouldAlignTitleWithLeftIcon={true}
        leftIcon={leftIcon}
      />
    </ThemeSwitcher>
  );
};

const style = StyleSheet.create({
  buttonStyle: {
    marginBottom: 12
  },
  rightIcon: {
    marginRight: 10,
    width: 20,
    height: 20
  },
  leftIcon: {
    marginLeft: 10,
    width: 20,
    height: 20
  }
});
