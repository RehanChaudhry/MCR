import React from "react";
import { StyleSheet, View } from "react-native";
import { AppInputField } from "ui/components/molecules/appinputfield/AppInputField";
import { SPACE } from "config";

export interface TypingComponentProps {}

export const TypingComponent = React.memo<TypingComponentProps>(({}) => {
  return (
    <View style={[styles.container]}>
      <AppInputField
        multiline={true}
        valueToShowAtStart="Start typing your message"
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACE.md,
    paddingHorizontal: SPACE.md,
    flexDirection: "row",
    flex: 1
  }
});
