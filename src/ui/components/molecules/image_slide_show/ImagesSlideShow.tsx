import ArrowLeft from "assets/images/left.svg";
import ArrowRight from "assets/images/right.svg";
import { SPACE } from "config";
import { moderateScale } from "config/Dimens";
import { usePreferredTheme } from "hooks";
import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacityProps, View } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { Color, NumberProp } from "react-native-svg";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import { AppLog, SvgProp } from "utils/Util";

export interface ImageSlideShowProps extends TouchableOpacityProps {
  images: string[];
}

export const ImagesSlideShow = React.memo<ImageSlideShowProps>(
  ({ images }) => {
    const arrowButton = useRef<SliderBox | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const leftIcon: SvgProp = (
      color?: Color,
      width?: NumberProp,
      height?: NumberProp
    ) => {
      return (
        <ArrowLeft
          testID="arrow-left"
          width={width}
          height={height}
          fill={
            selectedImageIndex === 0
              ? theme.themedColors.interface["700"]
              : theme.themedColors.background
          }
        />
      );
    };
    const rightIcon: SvgProp = (
      color?: Color,
      width?: NumberProp,
      height?: NumberProp
    ) => {
      return (
        <ArrowRight
          testID="arrow-right"
          width={width}
          height={height}
          fill={
            selectedImageIndex === 0 ||
            selectedImageIndex < images.length - 1
              ? theme.themedColors.background
              : theme.themedColors.interface["700"]
          }
        />
      );
    };
    const onLeftImagePress = () => {
      arrowButton.current.snapToPrev();
    };
    const onRightImagePress = () => {
      AppLog.logForcefully(
        "arrowButton.current.snapToNext();" +
          arrowButton.current.snapToNext()
      );
      arrowButton.current.snapToNext();
    };

    const leftImage = () => {
      return (
        <AppImageBackground
          containerShape={CONTAINER_TYPES.CIRCLE}
          icon={leftIcon}
          onPress={onLeftImagePress}
          containerStyle={[
            {
              backgroundColor:
                selectedImageIndex === 0
                  ? theme.themedColors.background
                  : theme.themedColors.primary
            },
            styles.imageArrowContainer
          ]}
        />
      );
    };

    const rightImage = () => {
      return (
        <AppImageBackground
          containerShape={CONTAINER_TYPES.CIRCLE}
          icon={rightIcon}
          onPress={onRightImagePress}
          containerStyle={[
            {
              backgroundColor:
                selectedImageIndex === 0 ||
                selectedImageIndex < images.length - 1
                  ? theme.themedColors.primary
                  : theme.themedColors.interface["200"]
            },
            styles.imageArrowContainer
          ]}
        />
      );
    };
    const theme = usePreferredTheme();
    return (
      <View style={styles.MainContainer}>
        <View style={styles.sliderBoxContainer}>
          <SliderBox
            ref={arrowButton}
            images={images}
            imageLoadingColor={theme.themedColors.primary}
            dotColor={theme.themedColors.primary}
            inactiveDotColor={theme.themedColors.interface["700"]}
            paginationBoxStyle={[
              styles.paginationColor,
              { backgroundColor: theme.themedColors.interface["200"] }
            ]}
            paginationBoxVerticalPadding={2}
            dotStyle={styles.dotStyle}
            ImageComponentStyle={styles.image}
            sliderBoxHeight={300}
            currentImageEmitter={(index: number) => {
              AppLog.logForcefully("image pressed: " + index);
              setSelectedImageIndex(index);
            }}
          />
        </View>
        {images.length > 1 && (
          <View style={styles.arrowButtons}>
            {leftImage()}
            {rightImage()}
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: "center"
  },
  paginationColor: {
    borderRadius: 30,
    marginBottom: 10,
    width: "23%",
    height: 15
  },
  image: {
    borderRadius: 15,
    width: "89%",
    marginTop: 5
  },
  sliderBoxContainer: {
    overflow: "visible",
    marginTop: SPACE.md,
    alignSelf: "center",
    justifyContent: "center"
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
  arrowButtons: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    top: "45%"
  },
  imageArrowContainer: {
    width: moderateScale(30),
    height: moderateScale(30)
  }
});
