import { usePreferredTheme } from "hooks";
import React from "react";
import { StyleProp, TextStyle, TouchableOpacityProps } from "react-native";
import { LinkButton } from "ui/components/molecules/link_button/LinkButton";
import { SvgProp } from "utils/Util";

export interface HeaderRightTextWithIconProps
  extends TouchableOpacityProps {
  text: string;
  icon?: SvgProp;
  onPress?: () => void;
  textStyle?: StyleProp<TextStyle>;
}

const HeaderRightTextWithIcon = React.memo<HeaderRightTextWithIconProps>(
  ({ text, icon, onPress, textStyle }) => {
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
          textStyle
        ]}
        fontWeight="semi-bold"
      />
    );
  }
);

export default HeaderRightTextWithIcon;
