import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface ownProps {
  children?: any;
  style?: StyleProp<ViewStyle>;
}

type props = ownProps;

export const CardView = React.memo<props>(({ children, style }) => {
  return <View style={[style, styles.container]}>{children}</View>;
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    //padding: 8,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
    borderRadius: 10
  }
});
