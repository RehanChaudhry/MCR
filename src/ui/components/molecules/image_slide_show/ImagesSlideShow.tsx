import ArrowLeft from "assets/images/left.svg";
import ArrowRight from "assets/images/right.svg";
import { SPACE } from "config";
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
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const arrowButton = useRef<SliderBox | null>(null);
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
          fill={theme.themedColors.interface["700"]}
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
          fill={theme.themedColors.background}
        />
      );
    };
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
          containerStyle={{
            backgroundColor: theme.themedColors.interface["200"]
          }}
        />
      );
    };

    const rightImage = () => {
      return (
        <AppImageBackground
          containerShape={CONTAINER_TYPES.CIRCLE}
          icon={rightIcon}
          onPress={onRightImagePress}
          containerStyle={{ backgroundColor: theme.themedColors.primary }}
        />
      );
    };
    const theme = usePreferredTheme();
    return (
      <View style={styles.MainContainer}>
        <View style={styles.sliderBoxContainer}>
          <SliderBox
            resizeMethod={"resize"}
            resizeMode={"contain"}
            ref={arrowButton}
            images={images}
            dotColor={theme.themedColors.primary}
            inactiveDotColor={theme.themedColors.interface["700"]}
            paginationBoxStyle={[
              styles.paginationColor,
              { backgroundColor: theme.themedColors.interface["200"] }
            ]}
            paginationBoxVerticalPadding={3}
            dotStyle={styles.dotStyle}
            ImageComponentStyle={styles.image}
            sliderBoxHeight={250}
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
    marginBottom: 10
  },
  image: {
    borderRadius: 20,
    justifyContent: "center"
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
  }
});
