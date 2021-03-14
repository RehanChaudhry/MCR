import { COLORS } from "config";
import React from "react";
import {
  Keyboard,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  View,
  ViewProps
} from "react-native";

interface OwnProps extends ViewProps {
  // default false
  shouldKeyboardDismissOnTouch?: boolean;
}

type Props = OwnProps;

const Screen: React.FC<Props> = ({
  shouldKeyboardDismissOnTouch = false,
  style,
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

  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor={COLORS.backgroundColor}
        barStyle="dark-content"
      />
      {view}
    </SafeAreaView>
  );
};

export default Screen;
