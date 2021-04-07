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
import { FONT_SIZE, moderateScale, SPACE } from "config/Dimens";

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
    flexWrap: "wrap",
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
    marginLeft: SPACE.xs,
    marginRight: SPACE.xs,
    borderRadius: 5,
    justifyContent: "center"
  },
  text: {
    fontSize: FONT_SIZE.sm,
    fontWeight: "bold",
    includeFontPadding: false,
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(10)
  }
});
export default BottomBreadCrumbsItem;
