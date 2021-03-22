import { usePreferredTheme } from "hooks";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface ownProps {
  children?: any;
  style?: StyleProp<ViewStyle>;
}

type props = ownProps;

export const CardView = React.memo<props>(({ children, style }) => {
  const theme = usePreferredTheme();
  return (
    <View
      style={[
        { backgroundColor: theme.themedColors.background },
        styles.container,
        style
      ]}>
      {children}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 2,
    borderRadius: 10
  }
});
