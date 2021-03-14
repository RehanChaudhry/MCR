import { usePreferredTheme } from "hooks";
import React, { FC, useState } from "react";
import { StyleSheet } from "react-native";
import {
  AppButton,
  BUTTON_TYPES
} from "ui/components/molecules/app_button/AppButton";
import { ThemeSwitcher } from "ui/components/templates/ThemeSwitcher";
import { AppLog } from "utils/Util";

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
        rightIcon={require("assets/images/check.png")}
        buttonStyle={style.buttonStyle}
      />
      <AppButton
        text="Submit"
        leftIcon={require("assets/images/check.png")}
        buttonStyle={style.buttonStyle}
      />
      <AppButton
        text="Submit"
        rightIcon={require("assets/images/check.png")}
        leftIcon={require("assets/images/check.png")}
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
        leftIcon={require("assets/images/check.png")}
      />
      <AppButton
        text="Submit"
        buttonStyle={[style.buttonStyle]}
        buttonType={BUTTON_TYPES.BORDER}
        shouldShowError={true}
      />
    </ThemeSwitcher>
  );
};

const style = StyleSheet.create({
  buttonStyle: {
    marginBottom: 12
  }
});
