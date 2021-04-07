import React, { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from "react-native";
import { COLORS, FONTS, FONT_SIZE, SPACE } from "config";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import Strings from "config/Strings";

type Props = {
  viewStyle?: StyleProp<ViewStyle>;
  title: string;
  onPress: () => void;
  textStyle: StyleProp<TextStyle>;
};
export const FieldBox: FC<Props> = ({
  viewStyle,
  title,
  onPress,
  textStyle
}) => {
  const theme = usePreferredTheme();
  return (
    <View>
      <AppLabel text={title} weight={"semi_bold"} />
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={[
            styles.input,
            viewStyle,
            { borderColor: theme.themedColors.border }
          ]}>
          <AppLabel
            text={Strings.profile.dropDownInitialValue.addOptions}
            style={textStyle}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: "column",
    justifyContent: "center",
    color: COLORS.textColor1,
    borderStyle: "solid",
    height: 42,
    borderRadius: 5,
    borderColor: COLORS.grey3,
    paddingRight: SPACE.md,
    paddingLeft: SPACE.md,
    fontSize: FONT_SIZE.xsm,
    fontFamily: FONTS.regular,
    borderWidth: 1,
    flex: 1,
    marginTop: SPACE.xsm

    // //Its for IOS
    // shadowColor: COLORS.black,
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    //
    // // its for android
    // elevation: 2,
    // backgroundColor: "white"
  }
});
