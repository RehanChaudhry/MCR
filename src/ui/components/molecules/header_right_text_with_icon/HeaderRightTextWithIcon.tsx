import { usePreferredTheme } from "hooks";
import React from "react";
import { TouchableOpacityProps } from "react-native";
import { LinkButton } from "ui/components/molecules/link_button/LinkButton";
import { SvgProp } from "utils/Util";

export interface HeaderRightTextWithIconProps
  extends TouchableOpacityProps {
  text: string;
  icon?: SvgProp;
  onPress?: () => void;
}

const HeaderRightTextWithIcon = React.memo<HeaderRightTextWithIconProps>(
  ({ text, icon, onPress }) => {
    const theme = usePreferredTheme();

    return (
      <LinkButton
        text={text}
        onPress={onPress}
        rightIcon={icon}
        textStyle={{
          color: theme.themedColors.primary
        }}
        fontWeight="semi-bold"
      />
    );
  }
);

export default HeaderRightTextWithIcon;
