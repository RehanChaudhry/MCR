import Close from "assets/images/ic_cross.svg";
import { SPACE } from "config";
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

export interface HeaderLeftTextWithIconProps
  extends TouchableOpacityProps {
  text?: string;
  icon?: SvgProp;
  onPress: () => void;
  textStyle?: StyleProp<TextStyle>;
  fontWeight?: Weight;
}

const HeaderLeftTextWithIcon = React.memo<HeaderLeftTextWithIconProps>(
  ({ text = "Close", icon, onPress, textStyle, fontWeight }) => {
    const theme = usePreferredTheme();
    const closeIcon: SvgProp = () => {
      return (
        <Close
          width={15}
          height={15}
          fill={theme.themedColors.interface["700"]}
        />
      );
    };

    return (
      <LinkButton
        text={text}
        onPress={onPress}
        leftIcon={icon ? icon : closeIcon}
        textStyle={[
          { color: theme.themedColors.interface["700"] },
          style.text,
          textStyle
        ]}
        viewStyle={style.container}
        fontWeight={fontWeight}
      />
    );
  }
);

const style = StyleSheet.create({
  container: {
    marginLeft: SPACE.sm
  },
  text: {
    paddingLeft: SPACE.xxsm
  }
});

export default HeaderLeftTextWithIcon;
