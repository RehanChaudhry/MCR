import { FormikValues, useFormikContext } from "formik";
import React from "react";
import { SvgProp } from "utils/Util";
import { Color, NumberProp } from "react-native-svg";
import Link from "assets/images/link.svg";
import { AppCompactButton } from "ui/components/atoms/app_compact_button/AppCompactButton";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

type Props = {
  onPress: () => void;
  isSelected: boolean;
  shouldNotOptimize?: boolean;
};
export const LinkButton = optimizedMemo<Props>(
  ({ onPress, isSelected = false }) => {
    const linkIcon: SvgProp = (
      color?: Color,
      width?: NumberProp,
      height?: NumberProp
    ) => {
      return <Link fill={color} width={width} height={height} />;
    };
    const { values } = useFormikContext<FormikValues>();
    return (
      <AppCompactButton
        shouldTextColorChangeOnClick={true}
        unSelectedText={"Link"}
        shouldIconColorChangeOnClick={true}
        shouldTextChangeOnClick={true}
        shouldShowBgColorCahange={true}
        isSelected={isSelected}
        icon={linkIcon}
        onPress={() => {
          values.embed = "";
          onPress();
        }}
      />
    );
  }
);
