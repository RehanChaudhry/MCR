import React, { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE, SPACE } from "config/Dimens";

type Props = {
  title: string;
  onPress: () => void;
  style: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
};
const BottomBreadCrumbsItem: FC<Props> = ({
  title,
  onPress,
  style,
  textStyle
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.mainContainer, style]}>
        <AppLabel
          text={title}
          shouldNotOptimize={true}
          style={[styles.text, textStyle]}
          weight={"semi-bold"}
        />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 6,
    justifyContent: "center"
  },
  text: {
    fontSize: FONT_SIZE.sm,
    includeFontPadding: false,
    paddingVertical: SPACE.sm,
    paddingHorizontal: SPACE._2md
  }
});
export default BottomBreadCrumbsItem;
