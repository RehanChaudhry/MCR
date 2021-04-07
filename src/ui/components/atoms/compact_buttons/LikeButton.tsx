import Like from "assets/images/like.svg";
import React, { useState } from "react";
import { Color } from "react-native-svg";
import { AppCompactButton } from "ui/components/atoms/app_compact_button/AppCompactButton";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import { SvgProp } from "utils/Util";

type Props = {
  onValueChanged?: (isSelected: boolean) => void;
  shouldSelected: boolean;
  shouldNotOptimize?: boolean;
};

export const LikeButton = optimizedMemo<Props>(
  ({ onValueChanged, shouldSelected = false }) => {
    const likeIcon: SvgProp = (color?: Color) => {
      return <Like fill={color} width={10} height={10} />;
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
