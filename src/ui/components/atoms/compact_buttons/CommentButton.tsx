import React from "react";
import { SvgProp } from "utils/Util";
import { Color, NumberProp } from "react-native-svg";
import Chat from "assets/images/chat.svg";
import { AppCompactButton } from "ui/components/atoms/app_compact_button/AppCompactButton";

type Props = {
  onPress: () => void;
};
export const CommentButton = React.memo<Props>(({ onPress }) => {
  const chatIcon: SvgProp = (
    color?: Color,
    width?: NumberProp,
    height?: NumberProp
  ) => {
    return <Chat fill={color} width={width} height={height} />;
  };
  return (
    <AppCompactButton
      unSelectedText={"Comment"}
      shouldIconColorChangeOnClick={false}
      shouldTextChangeOnClick={false}
      shouldShowBgColorCahange={false}
      isSelected={false}
      icon={chatIcon}
      onPress={onPress}
    />
  );
});
