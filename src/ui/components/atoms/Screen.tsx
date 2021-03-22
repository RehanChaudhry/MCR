import { COLORS } from "config";
import React from "react";
import {
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewProps,
  ViewStyle
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface OwnProps extends ViewProps {
  // default false
  shouldKeyboardDismissOnTouch?: boolean;
  topSafeAreaViewStyle?: StyleProp<ViewStyle>;
  bottomSafeAreaViewStyle?: StyleProp<ViewStyle>;
}

type Props = OwnProps;

const Screen: React.FC<Props> = ({
  shouldKeyboardDismissOnTouch = false,
  style,
  topSafeAreaViewStyle,
  bottomSafeAreaViewStyle,
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

  return (
    <View style={styles.container}>
      <View
        style={[
          topSafeAreaViewStyle,
          {
            height: safeAreaInset.top
          },
          styles.topSafeArea
        ]}
      />
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={COLORS.backgroundColor}
          barStyle="dark-content"
        />
        {view}
      </SafeAreaView>
      <View
        style={[
          bottomSafeAreaViewStyle,
          {
            height: safeAreaInset.bottom
          },
          styles.bottomSafeArea
        ]}
      />
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
  topSafeArea: {
    width: "100%"
  },
  bottomSafeArea: {
    width: "100%",
    alignSelf: "flex-end"
  }
});
