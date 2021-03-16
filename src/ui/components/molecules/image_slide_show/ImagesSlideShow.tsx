import ArrowLeft from "assets/images/left.svg";
import ArrowRight from "assets/images/right.svg";
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

export const ImagesSlideShow = React.memo<ImageSlideShowProps>(
  ({ images }) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const arrowButton = useRef<SliderBox | null>(null);
    const onLeftImagePress = () => {
      AppLog.logForcefully(selectedIndex);
      if (selectedIndex > 0) {
        arrowButton.current.onSnap(selectedIndex - 1);
      }
    };
    const onRightImagePress = () => {
      AppLog.logForcefully(selectedIndex);
      arrowButton.current.onSnap(selectedIndex);
    };

    const leftImage = () => {
      return (
        <AppImageBackground
          containerShape={CONTAINER_TYPES.CIRCLE}
          icon={leftIcon}
          onPress={onLeftImagePress}
        />
      );
    };

    const rightImage = () => {
      return (
        <AppImageBackground
          containerShape={CONTAINER_TYPES.CIRCLE}
          icon={rightIcon}
          onPress={onRightImagePress}
        />
      );
    };
    return (
      <View style={styles.MainContainer}>
        <View style={{ overflow: "visible" }}>
          <SliderBox
            ref={arrowButton}
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
            sliderBoxHeight={350}
            onCurrentImagePressed={(index: number) =>
              setSelectedIndex(index)
            }
            currentImageEmitter={(index: number) =>
              setSelectedIndex(index)
            }
          />
        </View>
        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
            top: "45%"
          }}>
          {leftImage()}
          {rightImage()}
        </View>
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
