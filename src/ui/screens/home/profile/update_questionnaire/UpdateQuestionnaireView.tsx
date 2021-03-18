import { COLORS } from "config";
import React from "react";
import { StyleSheet, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";

type Props = {};

export const UpdateQuestionnaireView: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <AppLabel
        style={[{ alignSelf: "center" }]}
        text="Update Questionnaire"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: COLORS.yellow,
    flex: 1
  }
});
