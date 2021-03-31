import Close from "assets/images/close.svg";
import { moderateScale, SPACE } from "config/Dimens";
import { usePreferredTheme } from "hooks";
import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from "react-native";
import { ImagePickerResponse } from "react-native-image-picker";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import { AppLog, SvgProp } from "utils/Util";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

export interface ImageWithCrossProps extends TouchableOpacityProps {
  imageResponse: ImagePickerResponse;
  onImageRemoved: (imageResponse: ImagePickerResponse) => void;
}

export const ImageWithCross = optimizedMemo<ImageWithCrossProps>(
  ({ imageResponse, onImageRemoved }) => {
    const theme = usePreferredTheme();
    const closeIcon: SvgProp = () => {
      return (
        <Close
          width={13}
          height={13}
          fill={theme.themedColors.interface["600"]}
        />
      );
    };
    const closeImage = () => {
      return (
        <AppImageBackground
          containerShape={CONTAINER_TYPES.CIRCLE}
          icon={closeIcon}
          // onPress={() => onImageRemoved(imageResponse)}
          containerStyle={[
            {
              backgroundColor: theme.themedColors.interface["200"]
            },
            style.crossView
          ]}
        />
      );
    };
    return (
      <View style={style.container}>
        <Image source={{ uri: imageResponse.uri }} style={style.image} />
        <TouchableOpacity
          onPress={() => {
            onImageRemoved(imageResponse);
            AppLog.logForcefully("onImageRemoved clicked");
          }}
          style={style.crossView}>
          {closeImage()}
        </TouchableOpacity>
      </View>
    );
  }
);

const style = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    marginRight: SPACE.lg
  },
  image: {
    overflow: "visible",
    width: 80,
    height: 80,
    borderRadius: 10
  },
  crossView: {
    position: "absolute",
    alignSelf: "flex-end",
    width: moderateScale(20),
    height: moderateScale(20),
    right: moderateScale(1.0),
    top: moderateScale(1.0)
  }
});
