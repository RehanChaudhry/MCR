import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE } from "config";
import usePreferredTheme from "hooks/theme/usePreferredTheme";

type Props = {
  title: string;
  //onPress: () => void;
  //style: StyleProp<ViewStyle>;
};
const TagListItem: FC<Props> = ({ title }) => {
  const theme = usePreferredTheme();

  return (
    //<TouchableOpacity onPress={onPress}>
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: theme.themedColors.interface[100] }
      ]}>
      <AppLabel text={title} style={styles.text} />
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
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 5,
    marginBottom: 8
  },
  text: {
    fontSize: FONT_SIZE.sm
  }
});
export default TagListItem;
