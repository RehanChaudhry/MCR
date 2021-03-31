import { FormikValues, useFormikContext } from "formik";
import React from "react";
import { SvgProp } from "utils/Util";
import { AppCompactButton } from "ui/components/atoms/app_compact_button/AppCompactButton";
import { Color, NumberProp } from "react-native-svg";
import Photo from "assets/images/photo.svg";

type Props = {
  onPress: () => void;
  isSelected: boolean;
};
export const PhotosButton = React.memo<Props>(
  ({ onPress, isSelected = false }) => {
    const photosIcon: SvgProp = (
      color?: Color,
      width?: NumberProp,
      height?: NumberProp
    ) => {
      return <Photo fill={color} width={width} height={height} />;
    };
    const { values } = useFormikContext<FormikValues>();
    return (
      <AppCompactButton
        unSelectedText={"Photos"}
        shouldIconColorChangeOnClick={true}
        shouldTextChangeOnClick={true}
        shouldShowBgColorCahange={true}
        isSelected={isSelected}
        icon={photosIcon}
        onPress={() => {
          values.link = "";
          values.embed = "";
          onPress();
        }}
      />
    );
  }
);
