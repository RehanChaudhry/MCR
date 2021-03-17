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
            <Image
              source={
                isEnabled
                  ? require("assets/images/switch-active.png")
                  : require("assets/images/switch-inactive.png")
              }
              style={styles.tinyLogo}
            />
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
