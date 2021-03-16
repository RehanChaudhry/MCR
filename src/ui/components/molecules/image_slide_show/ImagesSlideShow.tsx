import ArrowLeft from "assets/images/left.svg";
import ArrowRight from "assets/images/right.svg";
import React from "react";
import { StyleSheet, TouchableOpacityProps, View } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { Color, NumberProp } from "react-native-svg";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import { SvgProp } from "utils/Util";

export interface ImageSlideShowProps extends TouchableOpacityProps {
  images: string[];
}
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
      fill={color}
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
      fill={color}
    />
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const leftImage = () => {
  return (
    <AppImageBackground
      containerShape={CONTAINER_TYPES.CIRCLE}
      icon={leftIcon}
    />
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rightImage = () => {
  return (
    <AppImageBackground
      containerShape={CONTAINER_TYPES.CIRCLE}
      icon={rightIcon}
    />
  );
};

export const ImagesSlideShow = React.memo<ImageSlideShowProps>(
  ({ images }) => {
    return (
      <View style={styles.MainContainer}>
        <SliderBox
          images={images}
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
          paginationBoxStyle={styles.paginationColor}
          paginationBoxVerticalPadding={3}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5
          }}
          ImageComponentStyle={styles.image}
        />
        {/*<Slideshow*/}
        {/*  dataSource={images}*/}
        {/*  indicatorColor="gray"*/}
        {/*  indicatorSelectedColor={"red"}*/}
        {/*  arrowLeft={leftImage()}*/}
        {/*  arrowRight={rightImage()}*/}
        {/*  onPress={(index: number) => AppLog.logForcefully(index)}*/}
        {/*/>*/}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF8E1"
  },
  paginationColor: {
    backgroundColor: "white",
    borderRadius: 30,
    marginBottom: 10
  },
  image: {
    borderRadius: 20
  }
});
