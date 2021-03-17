import React, { FC } from "react";
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View
} from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import { AppLog } from "utils/Util";

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

export const RangeSliderWithLabel: FC<RangeSliderWithLabelProps> = ({
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
      <Image
        source={require("assets/images/thumb.png")}
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
          customMarkerLeft={(e) => {
            AppLog.log(
              "RangeSlider() => customMarkerLeft: " + e.currentValue
            );
            return customSliderMarker(styles.markerLeft);
          }}
          customMarkerRight={(e) => {
            AppLog.log("RangeSlider() => customMarkerRight: " + e);
            return customSliderMarker(styles.markerRight);
          }}
          onValuesChangeFinish={(values: number[]) => {
            result(values);
            AppLog.log("RangeSlider() => onValuesChangeFinish: " + values);
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
};

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
    fontSize: FONT_SIZE.sm
  },
  questionLabel: {
    fontWeight: "700",
    marginBottom: SPACE.sm
  },
  labelRight: {
    alignSelf: "flex-end"
  },
  labelXsm: {
    fontSize: FONT_SIZE.xsm
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
  }
});
