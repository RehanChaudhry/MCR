import React from "react";
import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "config";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

export interface AppFormValidationLabelProps {
  errorString?: string;
  shouldVisible?: boolean;
  numberOfLines?: number;
  validationLabelTestID?: string;
}

type Props = AppFormValidationLabelProps;

export const AppFormValidationLabel = optimizedMemo<Props>(
  ({
    errorString,
    shouldVisible,
    numberOfLines,
    validationLabelTestID
  }) => {
    if (!shouldVisible || errorString === undefined) {
      return null;
    }
    return (
      <AppLabel
        testID={validationLabelTestID}
        text={errorString}
        style={styles.error}
        numberOfLines={numberOfLines}
      />
    );
  }
);

const styles = StyleSheet.create({
  error: {
    color: COLORS.red,
    fontSize: FONT_SIZE.md,
    marginTop: 6
  }
});
