import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle
} from "react-native";
import * as Progress from "react-native-progress";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE, SPACE } from "config/Dimens";
import { usePreferredTheme } from "hooks";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

export interface AppProgressBarProps {
  style?: StyleProp<ViewStyle>;
  borderWidth?: number;
  borderRadius?: number;
  filledColor?: string;
  unFilledColor?: string;
  shouldShowBottomText?: boolean;
  bottomTextStyle?: StyleProp<TextStyle>;
  shouldNotOptimize?: boolean;
  progressPercentage: number; //0 to 100
}

export const AppProgressBar = optimizedMemo<AppProgressBarProps>(
  ({
    style,
    borderWidth = 0,
    borderRadius = 50,
    unFilledColor,
    filledColor,
    shouldShowBottomText = true,
    bottomTextStyle,
    progressPercentage
  }) => {
    const { themedColors } = usePreferredTheme();
    const progress = progressPercentage / 100;

    if (progressPercentage < 0 || progressPercentage > 100) {
      throw new Error(
        "InValid 'progressPercentage' provided to AppProgressBar "
      );
    }

    return (
      <View style={[styles.container, style]}>
        <Progress.Bar
          progress={progress}
          width={null}
          borderWidth={borderWidth}
          borderRadius={borderRadius}
          height={18}
          unfilledColor={
            unFilledColor ? unFilledColor : themedColors.interface[200]
          }
          useNativeDriver={true}
          animationType="timing"
          color={filledColor ? filledColor : themedColors.secondary}
        />
        {shouldShowBottomText && (
          <View testID="bottom-view" style={styles.textWrapper}>
            <AppLabel
              text="Complete profile & questionnaire: "
              style={[styles.textStyle, bottomTextStyle]}
            />
            <AppLabel
              text={progressPercentage + "%"}
              weight="semi-bold"
              style={[styles.textStyle, bottomTextStyle]}
            />
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textWrapper: {
    flexDirection: "row",
    marginTop: SPACE.sm
  },
  textStyle: {
    fontSize: FONT_SIZE.xs
  }
});
