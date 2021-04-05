import React, { FC } from "react";
import { ImageStyle, StyleProp, StyleSheet, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import { moderateScale } from "config/Dimens";
import Thumb from "assets/images/thumb.svg";

interface RangeSliderWithLabelProps {
  initialValues: number[] | undefined;
  enableTwoThumbs: boolean;
  result: (result: number[]) => void;
  labelLeft: string;
  labelRight: string;
  minValue: number;
  maxValue: number;
  sliderWidth: number;
  enableThumbOne?: boolean;
  enableThumbTwo?: boolean;
  isPreferenceSwitchChange?: boolean;
  allowSliderClick?: boolean;
}

export const RangeSliderWithLabel: FC<RangeSliderWithLabelProps> = React.memo(
  ({
    initialValues,
    enableTwoThumbs,
    result,
    labelLeft,
    labelRight,
    minValue,
    maxValue,
    sliderWidth,
    enableThumbOne = true,
    enableThumbTwo = true,
    allowSliderClick = false
  }) => {
    const { themedColors } = usePreferredTheme();

    const customSliderMarker = (markerStyle: StyleProp<ImageStyle>) => {
      return (
        <Thumb
          testID="icon"
          width={30}
          height={30}
          fill={themedColors.secondary}
          style={markerStyle}
        />
      );
    };

    if (initialValues === undefined) {
      initialValues = enableTwoThumbs ? [0, 0] : [0];
    }

    if (!enableTwoThumbs && initialValues.length > 1) {
      throw new Error(
        "Array should contain only one initial value in Range Slider"
      );
    }

    //callback with initial values
    result(initialValues);

    return (
      <>
        <AppLabel style={styles.label} text={labelLeft} />
        <View style={styles.sliderContainer}>
          <View
            style={[
              styles.leftPointer,
              { backgroundColor: themedColors.primary }
            ]}
          />
          <View
            style={[
              styles.rightPointer,
              { backgroundColor: themedColors.primary }
            ]}
          />
          <MultiSlider
            values={initialValues}
            {...(enableTwoThumbs
              ? {
                  selectedStyle: {
                    backgroundColor: themedColors.interface[400]
                  },
                  unselectedStyle: {
                    backgroundColor: themedColors.interface[200]
                  },
                  minMarkerOverlapDistance: 15,
                  allowOverlap: false
                }
              : {
                  selectedStyle: {
                    backgroundColor: themedColors.interface[200]
                  },
                  unselectedStyle: {
                    backgroundColor: themedColors.interface[200]
                  },
                  allowOverlap: true
                  /* minMarkerOverlapDistance: 15*/
                })}
            isMarkersSeparated={true}
            customMarkerLeft={(_) => {
              /*AppLog.log(
              "RangeSlider() => customMarkerLeft: " + e.currentValue
            );*/
              return customSliderMarker(styles.markerLeft);
            }}
            customMarkerRight={(_) => {
              // AppLog.log("RangeSlider() => customMarkerRight: " + e);
              return customSliderMarker(styles.markerRight);
            }}
            onValuesChangeFinish={(values: number[]) => {
              result(values);
              // AppLog.log("RangeSlider() => onValuesChangeFinish: " + values);
            }}
            trackStyle={styles.track}
            sliderLength={sliderWidth}
            min={minValue}
            max={maxValue}
            step={1}
            containerStyle={styles.sliderInnerContainer}
            enabledOne={enableThumbOne}
            enabledTwo={enableThumbTwo}
            allowSliderClick={allowSliderClick}
          />
        </View>
        <AppLabel
          text={labelRight}
          style={[styles.label, styles.labelRight]}
        />
      </>
    );
  }
);

const styles = StyleSheet.create({
  markerLeft: {
    width: 30,
    height: 30,
    marginTop: 10
  },
  markerRight: {
    width: 30,
    height: 30,
    marginTop: 10
  },
  track: {
    height: 8,
    borderRadius: 8
  },
  label: {
    fontSize: FONT_SIZE._2xsm
  },
  questionLabel: {
    fontWeight: "700",
    marginBottom: SPACE.sm
  },
  labelRight: {
    alignSelf: "flex-end"
  },
  labelXsm: {
    fontSize: FONT_SIZE._3xm
  },
  sliderContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  sliderInnerContainer: {
    height: 45,
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  leftPointer: {
    position: "absolute",
    width: moderateScale(2),
    height: moderateScale(7),
    left: moderateScale(5),
    top: "20%",
    borderRadius: moderateScale(1)
  },
  rightPointer: {
    position: "absolute",
    width: moderateScale(2),
    height: moderateScale(7),
    right: moderateScale(5),
    bottom: "20%",
    borderRadius: moderateScale(1)
  }
});
