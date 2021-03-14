import { StackNavigationOptions } from "@react-navigation/stack";
import { FONT_SIZE, FONTS } from "config";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

function create(
  title: string,
  back: () => void
): Partial<StackNavigationOptions> {
  return {
    title: title,
    headerTitleStyle: {
      fontSize: FONT_SIZE.xl,
      textAlign: "center",
      fontFamily: FONTS.bold
    },
    headerRight: getHomeHeaderRight(),
    headerLeft: getHomeHeaderLeft(back)
  };
}

function getHomeHeaderLeft(back: () => void) {
  return () => (
    <TouchableOpacity onPress={back}>
      <Image
        style={styles.crossButton}
        resizeMethod="scale"
        source={require("images/cross.png")}
      />
    </TouchableOpacity>
  );
}

function getHomeHeaderRight() {
  return () => (
    <TouchableOpacity>
      <View style={styles.rightButton} />
    </TouchableOpacity>
  );
}

export default { create };

const styles = StyleSheet.create({
  crossButton: {
    width: 18,
    height: 18,
    margin: 14
  },
  rightButton: {
    width: 50,
    height: 50
  }
});
