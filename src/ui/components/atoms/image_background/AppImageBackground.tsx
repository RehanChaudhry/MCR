import { usePreferredTheme } from "hooks";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle
} from "react-native";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import { SvgProp } from "utils/Util";

export interface AppImageBackgroundProps extends TouchableOpacityProps {
  containerStyle?: StyleProp<ViewStyle>;
  icon?: SvgProp;
  containerShape: CONTAINER_TYPES;
  onPress?: () => void;
  shouldNotOptimize?: boolean;
}

export enum CONTAINER_TYPES {
  CIRCLE = "circle",
  SQUARE = "square"
}

export const AppImageBackground = optimizedMemo<AppImageBackgroundProps>(
  ({ containerStyle, icon, containerShape, onPress }) => {
    const theme = usePreferredTheme();
    const imageWithBgJsx = (
      <View
        style={[
          style.container,
          {
            backgroundColor: theme.themedColors.interface[200],
            shadowColor: theme.themedColors.interface[200]
          },
          containerShape === CONTAINER_TYPES.CIRCLE
            ? style.circleShape
            : style.squareShape,
          containerStyle
        ]}>
        {icon?.(theme.themedColors.interface[700], 20, 20)}
      </View>
    );

    if (onPress) {
      return (
        <TouchableOpacity testID="image-container" onPress={onPress}>
          {imageWithBgJsx}
        </TouchableOpacity>
      );
    } else {
      return imageWithBgJsx;
    }
  }
);

const style = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
    // elevation: 3,
    // shadowOffset: { width: 0, height: 3 },
    // shadowRadius: 3,
    // shadowOpacity: 0.15
  },
  squareShape: {
    borderRadius: 5
  },
  circleShape: {
    borderRadius: 50
  },
  icon: {
    width: "50%",
    height: undefined,
    aspectRatio: 1
  }
});
