import { usePreferredTheme } from "hooks";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

interface OwnProps {
  style?: StyleProp<ViewStyle>;
  shouldNotOptimize?: boolean;
}

type Props = OwnProps;

const ListItemSeparator = optimizedMemo<Props>(({ style }) => {
  const theme = usePreferredTheme();
  return (
    <View
      style={[
        styles.separator,
        { backgroundColor: theme.themedColors.separator },
        style ? style : {}
      ]}
    />
  );
});

const styles = StyleSheet.create({
  separator: { flex: 1, height: 0.5 }
});
export default ListItemSeparator;
