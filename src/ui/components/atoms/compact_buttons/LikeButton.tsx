import React, { useState } from "react";
import { AppCompactButton } from "ui/components/atoms/app_compact_button/AppCompactButton";
import Like from "assets/images/like.svg";
import { SvgProp } from "utils/Util";
import { Color, NumberProp } from "react-native-svg";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

type Props = {
  onValueChanged?: (isSelected: boolean) => void;
  shouldSelected: boolean;
  shouldNotOptimize?: boolean;
};

export const LikeButton = optimizedMemo<Props>(
  ({ onValueChanged, shouldSelected = false }) => {
    const likeIcon: SvgProp = (
      color?: Color,
      width?: NumberProp,
      height?: NumberProp
    ) => {
      return <Like fill={color} width={width} height={height} />;
    };

    const [isSelected, setIsSelected] = useState(shouldSelected);

    return (
      <AppCompactButton
        unSelectedText={"Like"}
        selectedText={"Liked"}
        shouldIconColorChangeOnClick={true}
        shouldTextChangeOnClick={true}
        shouldShowBgColorCahange={true}
        icon={likeIcon}
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        onPress={() => {
          setIsSelected(!isSelected);
          onValueChanged?.(!isSelected);
        }}
      />
    );
  }
);
