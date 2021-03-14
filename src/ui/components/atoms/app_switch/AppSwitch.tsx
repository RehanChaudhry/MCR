import React, { useEffect, useState } from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  SwitchProps,
  ViewStyle
} from "react-native";
import { AppLog } from "utils/Util";
import ToggleSwitch from "toggle-switch-react-native";
import { usePreferredTheme } from "hooks";

export interface AppButtonProps extends SwitchProps {
  defaultValue: boolean;
  onValueChange: (isSwitchEnabled: boolean) => void;
  style?: StyleProp<ViewStyle>;
  showCustomThumb?: boolean;
}

let thumbPath = require("assets/images/switch-active.png");

const setIcon = (isEnabled: boolean) => {
  if (!isEnabled) {
    thumbPath = require("assets/images/switch-inactive.png");
  } else {
    thumbPath = require("assets/images/switch-active.png");
  }
};

export const AppSwitch = React.memo<AppButtonProps>(
  ({
    defaultValue,
    onValueChange,
    showCustomThumb = false,
    style,
    ...rest
  }) => {
    const [isEnabled, setIsEnabled] = useState<boolean>(defaultValue);

    const { themedColors } = usePreferredTheme();

    setIcon(isEnabled);

    // notify parent component about default state upon creation
    useEffect(() => {
      onValueChange(defaultValue);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleSwitch = () => {
      AppLog.log("AppSwitch() => toggle working");
      setIcon(!isEnabled);
      setIsEnabled((previousState) => !previousState);
      onValueChange(!isEnabled);
    };

    return (
      <ToggleSwitch
        testID="app-switch"
        isOn={isEnabled}
        onColor={themedColors.switchActive}
        offColor={themedColors.switchInActive}
        onToggle={toggleSwitch}
        thumbOffStyle={styles.thumb}
        icon={
          showCustomThumb ? (
            <Image source={thumbPath} style={styles.tinyLogo} />
          ) : null
        }
        style={[style, styles.switch]}
        {...rest}
      />
    );
  }
);

const styles = StyleSheet.create({
  switch: {},
  thumb: {},
  tinyLogo: {
    width: 20,
    height: 20
  }
});
