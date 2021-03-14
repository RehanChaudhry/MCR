import React, { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE } from "config";

type Props = {
  title: string;
  onPress: () => void;
  style: StyleProp<ViewStyle>;
};
const BottomBreadCrumbsItem: FC<Props> = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.mainContainer, style]}>
        <AppLabel text={title} style={styles.text} weight={"semi-bold"} />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    //flexDirection: "row",
    flexWrap: "wrap",
    height: 36,
    margin: 8,
    padding: 8,
    borderRadius: 5,
    justifyContent: "center"
  },
  text: {
    fontSize: FONT_SIZE.md,
    fontWeight: "bold",
    includeFontPadding: false
  }
});
export default BottomBreadCrumbsItem;
