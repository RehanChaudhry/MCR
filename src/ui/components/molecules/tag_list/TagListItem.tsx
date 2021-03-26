import React, { FC } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE, SPACE } from "config";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { grayShades } from "hooks/theme/ColorPaletteContainer";

type Props = {
  title?: string;
  style?: StyleProp<ViewStyle>;
};
const TagListItem: FC<Props> = ({ title }) => {
  const theme = usePreferredTheme();

  return (
    <View style={styles.mainContainer}>
      <AppLabel
        text={title}
        style={[styles.text, { color: theme.themedColors.labelSecondary }]}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: grayShades.warmGray[200],
    flexDirection: "row",
    flexWrap: "wrap",
    height: 36,
    alignItems: "center",
    marginRight: SPACE.sm,
    padding: 8,
    borderRadius: 5,
    marginBottom: SPACE.xsm
  },
  text: {
    fontSize: FONT_SIZE._2xsm
  }
});
export default TagListItem;
