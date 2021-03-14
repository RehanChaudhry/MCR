import React, { useEffect, useState } from "react";
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import { usePreferredTheme } from "hooks";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { AppLog } from "utils/Util";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE, SPACE } from "config";
import { AppSwitch } from "ui/components/atoms/app_switch/AppSwitch";

export interface SliderCallback {
  topRangeSliderResult: number[];
  bottomRangeSliderResult: number[];
  isPreferenceActive: boolean;
}

export interface RangeSliderProps {
  question: string;
  initialValuesTopSlider?: number[];
  initialValuesBottomSlider?: number[];
  /* enableTwoThumbs?: boolean;*/
  minValue: number; //slider minimum
  maxValue: number; //slider maximum
  labelLeft: string;
  labelRight: string;
  preferenceInitialValue: boolean;
  callback: (result: SliderCallback) => void;
  style?: StyleProp<ViewStyle>; //avoid passing padding use margin instead, it will handle range slide width
}

export const RangeSlider = React.memo<RangeSliderProps>(
  ({
    question,
    /* enableTwoThumbs = true,*/
    initialValuesTopSlider = undefined,
    initialValuesBottomSlider = undefined,
    minValue,
    maxValue,
    labelLeft,
    labelRight,
    preferenceInitialValue,
    callback,
    style
  }) => {
    const { themedColors } = usePreferredTheme();
    let [sliderWidth, setSliderWidth] = useState<number>(0);

    let topRangeSliderResult: number[] =
        initialValuesTopSlider == undefined ? [] : initialValuesTopSlider,
      bottomRangeSliderResult: number[] =
        initialValuesBottomSlider == undefined
          ? []
          : initialValuesBottomSlider,
      [
        preferenceSwitchResult,
        setPreferenceSwitchResult
      ] = useState<boolean>(preferenceInitialValue);

    const returnResultToComponent = () => {
      callback({
        topRangeSliderResult: topRangeSliderResult,
        bottomRangeSliderResult: bottomRangeSliderResult,
        isPreferenceActive: preferenceSwitchResult
      });
    };

    // notify parent component about default state upon creation
    useEffect(() => {
      AppLog.log("range slider useeffect");
      returnResultToComponent();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const customSliderMarker = (markerStyle: StyleProp<ImageStyle>) => {
      return (
        <Image
          source={require("assets/images/thumb.png")}
          style={markerStyle}
        />
      );
    };

    const rangeSliderWithLabels = (
      enableTwoThumbs: boolean,
      initialValues: number[] | undefined,
      result: (result: number[]) => void,
      enableThumbOne: boolean = true,
      enableThumbTwo: boolean = true
    ) => {
      if (initialValues == undefined) {
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
          <MultiSlider
            values={initialValues}
            {...(enableTwoThumbs
              ? {
                  selectedStyle: {
                    backgroundColor: themedColors.primaryLabelColor
                  },
                  unselectedStyle: {
                    backgroundColor: themedColors.tertiaryLabelColor
                  }
                }
              : { selectedStyle: {}, unselectedStyle: {} })}
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
              AppLog.log(
                "RangeSlider() => onValuesChangeFinish: " + values
              );
            }}
            trackStyle={styles.track}
            sliderLength={sliderWidth}
            min={minValue}
            max={maxValue}
            step={1}
            allowOverlap={false}
            minMarkerOverlapDistance={25}
            containerStyle={{
              height: 30
            }}
            enabledOne={enableThumbOne}
            enabledTwo={enableThumbTwo}
          />
          <AppLabel
            text={labelRight}
            style={[styles.label, styles.labelRight]}
          />
        </>
      );
    };

    const preferenceView = () => {
      return (
        <View style={styles.preferenceWrapper}>
          <AppLabel
            style={[styles.label, styles.questionLabel]}
            text="Comfort Zone"
          />

          <View style={styles.switchWrapper}>
            <AppLabel
              style={[
                styles.label,
                styles.questionLabel,
                { marginEnd: SPACE.one }
              ]}
              text="I have no preference"
            />

            <AppSwitch
              defaultValue={preferenceSwitchResult}
              showCustomThumb={true}
              onValueChange={(isEnabled: boolean) => {
                setPreferenceSwitchResult(isEnabled);
                AppLog.log("range slider switch");
                returnResultToComponent();
              }}
            />
          </View>
        </View>
      );
    };
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: themedColors.primaryBackground,
            borderColor: themedColors.tertiaryBackground
          },
          style
        ]}
        onLayout={(event) => {
          let { width } = event.nativeEvent.layout;
          setSliderWidth(width - (SPACE.two + SPACE.two));
        }}>
        <AppLabel
          style={[styles.label, styles.questionLabel]}
          text={question}
        />

        {rangeSliderWithLabels(
          false,
          initialValuesTopSlider,
          (result: number[]) => {
            topRangeSliderResult = result;
            AppLog.log("range slider slider1");
            returnResultToComponent();
            AppLog.log("Range Result: " + JSON.stringify(result));
          }
        )}

        {preferenceView()}

        {rangeSliderWithLabels(
          true,
          preferenceSwitchResult
            ? [minValue, maxValue]
            : initialValuesBottomSlider,
          (result: number[]) => {
            bottomRangeSliderResult = result;
            AppLog.log("range slider slider2");
            returnResultToComponent();
            AppLog.log("Range Result: " + JSON.stringify(result));
          },
          !preferenceSwitchResult,
          !preferenceSwitchResult
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACE.two,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: SPACE.two
  },
  markerLeft: {
    width: 25,
    height: 25,
    marginTop: SPACE.one,
    marginEnd: -15 //to prevent icon from going outside
  },
  markerRight: {
    width: 25,
    height: 25,
    marginTop: SPACE.one,
    marginRight: 15 //to prevent icon from going outside
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
    marginBottom: SPACE.one
  },
  labelRight: {
    alignSelf: "flex-end"
  },
  preferenceWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: SPACE.three,
    alignItems: "center"
  },
  switchWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  labelXsm: {
    fontSize: FONT_SIZE.xsm
  }
});
