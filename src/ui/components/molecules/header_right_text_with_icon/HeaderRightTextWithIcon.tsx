import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps
} from "react-native";
import { LinkButton } from "ui/components/molecules/link_button/LinkButton";
import { SvgProp } from "utils/Util";
import { Weight } from "ui/components/atoms/app_label/AppLabel";

export interface HeaderRightTextWithIconProps
  extends TouchableOpacityProps {
  text: string;
  icon?: SvgProp;
  onPress?: () => void;
  textStyle?: StyleProp<TextStyle>;
  fontWeight?: Weight;
}

const HeaderRightTextWithIcon = React.memo<HeaderRightTextWithIconProps>(
  ({ text, icon, onPress, textStyle, fontWeight = "normal" }) => {
    const theme = usePreferredTheme();

    return (
      <LinkButton
        text={text}
        onPress={onPress}
        rightIcon={icon}
        textStyle={[
          {
            color: theme.themedColors.primary
          },
          style.text,
          textStyle
        ]}
        fontWeight={fontWeight}
        viewStyle={style.container}
      />
    );
  }
);

const style = StyleSheet.create({
  container: {
    marginRight: SPACE.sm
  },
  text: {
    paddingRight: SPACE._2xs,
    fontSize: FONT_SIZE.sm
  }
});

export default HeaderRightTextWithIcon;
