import { usePreferredTheme } from "hooks";
import React from "react";
import {
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewProps
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface OwnProps extends ViewProps {
  // default false
  shouldKeyboardDismissOnTouch?: boolean;
  topSafeAreaAndStatusBarColor?: string; //default is theme.themedColor.background
  bottomSafeAreaColor?: string; //default is theme.themedColor.background
  contentViewBackgroundColor?: string; //default is theme.themedColor.backgroundSecondary

  shouldAddBottomInset?: boolean;
}

type Props = OwnProps;

const Screen: React.FC<Props> = ({
  shouldKeyboardDismissOnTouch = false,
  style,
  topSafeAreaAndStatusBarColor,
  bottomSafeAreaColor,
  contentViewBackgroundColor,
  shouldAddBottomInset = true,
  children,
  onLayout
}) => {
  let view = shouldKeyboardDismissOnTouch ? (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      onLayout={onLayout}>
      <View style={style}>{children}</View>
    </TouchableWithoutFeedback>
  ) : (
    <View style={style}>{children}</View>
  );

  const safeAreaInset = useSafeAreaInsets();

  const theme = usePreferredTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            topSafeAreaAndStatusBarColor ?? theme.themedColors.background
        }
      ]}>
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor:
              contentViewBackgroundColor ??
              theme.themedColors.backgroundSecondary
          }
        ]}>
        <StatusBar
          backgroundColor={
            topSafeAreaAndStatusBarColor ?? theme.themedColors.background
          }
          barStyle="dark-content"
        />
        {view}
      </SafeAreaView>
      {shouldAddBottomInset && (
        <View
          style={[
            {
              height: safeAreaInset.bottom,
              backgroundColor:
                bottomSafeAreaColor ?? theme.themedColors.background
            },
            styles.bottomSafeArea
          ]}
        />
      )}
    </View>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
  },
  wrapper: {
    flex: 1
  },
  bottomSafeArea: {
    width: "100%",
    alignSelf: "flex-end"
  }
});
