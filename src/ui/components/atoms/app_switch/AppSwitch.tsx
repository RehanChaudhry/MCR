import React, { useEffect, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  SwitchProps,
  ViewStyle
} from "react-native";
import { AppLog } from "utils/Util";
import ToggleSwitch from "toggle-switch-react-native";
import { usePreferredTheme } from "hooks";
import SwitchActive from "assets/images/switch_active.svg";
import SwitchInActive from "assets/images/switch_inactive.svg";

export interface AppButtonProps extends SwitchProps {
  defaultValue: boolean;
  onValueChange: (isSwitchEnabled: boolean) => void;
  style?: StyleProp<ViewStyle>;
  showCustomThumb?: boolean;
}
/*const setIcon = (isEnabled: boolean) => {
  if (!isEnabled) {
    thumbPath = require("assets/images/switch-inactive.png");
  } else {
    thumbPath = require("assets/images/switch-active.png");
  }
};*/

/*const setIcon = (isEnabled: boolean) => {
  if (!isEnabled) return <SwitchInActive width={20} height={20} />;
  else return <SwitchActive width={20} height={20} />;
};*/

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

    // notify parent component about default state upon creation
    useEffect(() => {
      onValueChange(defaultValue);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleSwitch = () => {
      AppLog.log("AppSwitch() => toggle working");
      setIsEnabled((previousState) => !previousState);
      onValueChange(!isEnabled);
    };

    return (
      <ToggleSwitch
        testID="app-switch"
        isOn={isEnabled}
        onColor={themedColors.primary}
        offColor={themedColors.interface["300"]}
        onToggle={toggleSwitch}
        thumbOffStyle={styles.thumb}
        icon={
          showCustomThumb ? (
            isEnabled ? (
              <SwitchActive width={20} height={20} />
            ) : (
              <SwitchInActive width={20} height={20} />
            )
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
