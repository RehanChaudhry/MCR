import React from "react";
import { StyleSheet } from "react-native";
import { usePreferredTheme } from "hooks";
import RightArrow from "*.svg";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";

interface Props {
  onPress?: () => void;
}

const WelcomeSkipTitleButton: React.FC<Props> = ({ onPress }: Props) => {
  const { themedColors } = usePreferredTheme();

  return (
    <HeaderRightTextWithIcon
      text="Skip"
      fontWeight={"normal"}
      textStyle={{ color: themedColors.interface["700"] }}
      icon={() => {
        return (
          <RightArrow
            width={20}
            height={20}
            fill={themedColors.interface["700"]}
          />
        );
      }}
      onPress={() => {
        onPress?.();
      }}
    />
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = StyleSheet.create({
  container: {}
});

export default WelcomeSkipTitleButton;
