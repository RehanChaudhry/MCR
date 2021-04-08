import React, { useEffect, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  SwitchProps,
  ViewStyle
} from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import { usePreferredTheme } from "hooks";
import SwitchActive from "assets/images/switch_active.svg";
import SwitchInActive from "assets/images/switch_inactive.svg";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

export interface AppButtonProps extends SwitchProps {
  defaultValue: boolean;
  onValueChange: (isSwitchEnabled: boolean) => void;
  style?: StyleProp<ViewStyle>;
  showCustomThumb?: boolean;
  shouldNotOptimize?: boolean;
}

export const AppSwitch = optimizedMemo<AppButtonProps>(
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
      // AppLog.log("AppSwitch() => toggle working");
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
              <SwitchActive
                width={20}
                height={20}
                fill={themedColors.primary}
              />
            ) : (
              <SwitchInActive
                width={20}
                height={20}
                fill={themedColors.interface["400"]}
              />
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
