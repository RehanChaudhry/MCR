import { usePreferredTheme } from "hooks";
import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
  View
} from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import { FONT_SIZE } from "config";

export interface AppLoadMoreProps extends TouchableOpacityProps {
  text?: string;
  loaderSize?: number;
  textStyle?: StyleProp<TextStyle>;
  shouldShowLoadMore?: boolean;
  shouldNotOptimize?: boolean;
}

export const AppLoadMore = optimizedMemo<AppLoadMoreProps>(
  ({
    loaderSize = 25,
    text = "Loading, please wait",
    textStyle,
    shouldShowLoadMore = true
  }) => {
    const theme = usePreferredTheme();
    const view = () => {
      return (
        <>
          <ActivityIndicator
            size={loaderSize}
            color={theme.themedColors.label}
          />
          <AppLabel
            text={text}
            style={[style.textStyle, textStyle]}
            numberOfLines={3}
          />
        </>
      );
    };
    return (
      <View style={style.container}>
        {shouldShowLoadMore ? view() : null}
      </View>
    );
  }
);

const style = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  textStyle: {
    paddingLeft: 5,
    fontSize: FONT_SIZE.sm
  }
});
