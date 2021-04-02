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
import { FONT_SIZE } from "config";

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
    //flexDirection: "row",
    flexWrap: "wrap",
    height: 36,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 6,
    marginRight: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    justifyContent: "center"
  },
  text: {
    fontSize: FONT_SIZE._2xsm,
    fontWeight: "bold",
    includeFontPadding: false
  }
});
export default BottomBreadCrumbsItem;
