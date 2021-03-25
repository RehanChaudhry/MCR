import React, { FC } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE, SPACE } from "config";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { grayShades } from "../../../../hooks/theme/ColorPaletteContainer";

type Props = {
  title?: string;
  //onPress: () => void;
  style?: StyleProp<ViewStyle>;
};
const TagListItem: FC<Props> = ({ title }) => {
  const theme = usePreferredTheme();

  return (
    //<TouchableOpacity onPress={onPress}>
    <View
      style={[
        styles.mainContainer,
        title
          ? { backgroundColor: grayShades.warmGray[200] }
          : { backgroundColor: grayShades.warmGray[100] }
      ]}>
      <AppLabel
        text={title ? title : "N/A"}
        style={[styles.text, { color: theme.themedColors.labelSecondary }]}
      />
    </View>
    //</TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
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
    fontSize: FONT_SIZE.sm
  }
});
export default TagListItem;
