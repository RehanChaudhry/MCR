import Close from "assets/images/ic_cross.svg";
import { usePreferredTheme } from "hooks";
import React from "react";
import { TouchableOpacityProps } from "react-native";
import { LinkButton } from "ui/components/molecules/link_button/LinkButton";
import { SvgProp } from "utils/Util";

export interface HeaderLeftTextWithIconProps
  extends TouchableOpacityProps {
  text?: string;
  icon?: SvgProp;
  onPress: () => void;
}

const HeaderLeftTextWithIcon = React.memo<HeaderLeftTextWithIconProps>(
  ({ text = "Close", icon, onPress }) => {
    const theme = usePreferredTheme();
    const closeIcon: SvgProp = () => {
      return (
        <Close
          width={20}
          height={20}
          fill={theme.themedColors.interface["700"]}
        />
      );
    };

    return (
      <LinkButton
        text={text}
        onPress={onPress}
        leftIcon={icon ? icon : closeIcon}
        textStyle={{ color: theme.themedColors.interface["700"] }}
      />
    );
  }
);

export default HeaderLeftTextWithIcon;