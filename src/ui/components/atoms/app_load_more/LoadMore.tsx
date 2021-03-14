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

export interface AppLoadMoreProps extends TouchableOpacityProps {
  text?: string;
  loaderSize?: number;
  textStyle?: StyleProp<TextStyle>;
  shouldShowLoadMore?: boolean;
}

export const LoadMore = React.memo<AppLoadMoreProps>(
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
            color={theme.themedColors.primaryIconColor}
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
    paddingLeft: 5
  }
});
