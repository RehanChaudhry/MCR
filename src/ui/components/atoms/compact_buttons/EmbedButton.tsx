import { FormikValues, useFormikContext } from "formik";
import React from "react";
import { SvgProp } from "utils/Util";
import { Color, NumberProp } from "react-native-svg";
import Code from "assets/images/code.svg";
import { AppCompactButton } from "ui/components/atoms/app_compact_button/AppCompactButton";

type Props = {
  onPress: () => void;
  isSelected: boolean;
};
export const EmbedButton = React.memo<Props>(
  ({ onPress, isSelected = false }) => {
    const codeIcon: SvgProp = (
      color?: Color,
      width?: NumberProp,
      height?: NumberProp
    ) => {
      return <Code fill={color} width={width} height={height} />;
    };
    const { values } = useFormikContext<FormikValues>();
    return (
      <AppCompactButton
        unSelectedText={"Embed"}
        shouldIconColorChangeOnClick={true}
        shouldTextChangeOnClick={true}
        shouldShowBgColorCahange={true}
        isSelected={isSelected}
        icon={codeIcon}
        onPress={() => {
          values.link = "";
          onPress();
        }}
      />
    );
  }
);
