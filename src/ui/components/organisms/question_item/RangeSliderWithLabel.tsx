import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { usePreferredTheme } from "hooks";
import { FONT_SIZE, moderateScale, SPACE } from "config/Dimens";
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

    const customSliderMarker = () => {
      return (
        <Thumb
          testID="icon"
          width={moderateScale(24)}
          height={moderateScale(24)}
          fill={themedColors.secondary}
          style={styles.marker}
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
                    backgroundColor: themedColors.secondaryShade
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
              return customSliderMarker();
            }}
            customMarkerRight={(_) => {
              // AppLog.log("RangeSlider() => customMarkerRight: " + e);
              return customSliderMarker();
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
  marker: {
    marginTop: SPACE.sm,
    paddingHorizontal: SPACE.sm
  },
  track: {
    height: moderateScale(8),
    borderRadius: moderateScale(4)
  },
  label: {
    fontSize: FONT_SIZE.sm
  },
  labelRight: {
    alignSelf: "flex-end"
  },
  sliderContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: SPACE.sm
  },
  sliderInnerContainer: {
    height: moderateScale(40),
    paddingVertical: SPACE.lg,
    paddingHorizontal: SPACE.sm
  },
  leftPointer: {
    position: "absolute",
    width: moderateScale(2),
    height: moderateScale(8),
    left: moderateScale(2),
    top: SPACE.sm,
    borderRadius: moderateScale(1)
  },
  rightPointer: {
    position: "absolute",
    width: moderateScale(2),
    height: moderateScale(8),
    right: moderateScale(2),
    bottom: SPACE.sm,
    borderRadius: moderateScale(1)
  }
});
