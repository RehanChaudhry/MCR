import React, { useRef, useState } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { usePreferredTheme } from "hooks";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE, SPACE } from "config";
import { AppSwitch } from "ui/components/atoms/app_switch/AppSwitch";
import { RangeSliderWithLabel } from "./RangeSliderWithLabel";
import { AppLog } from "utils/Util";

export interface SliderCallback {
  topRangeSliderResult: number[];
  bottomRangeSliderResult: number[];
  isPreferenceActive: boolean;
}

export interface RangeSliderProps {
  question: string;
  initialValuesTopSlider?: number[];
  initialValuesBottomSlider?: number[];
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

    let topRangeSliderValues: React.MutableRefObject<number[]> = useRef(
        initialValuesTopSlider == undefined ? [] : initialValuesTopSlider
      ),
      bottomRangeSliderValues: React.MutableRefObject<number[]> = useRef(
        initialValuesBottomSlider == undefined
          ? []
          : initialValuesBottomSlider
      ),
      preferenceResult: React.MutableRefObject<boolean> = useRef(
        preferenceInitialValue
      ),
      [
        preferenceSwitchValue,
        setPreferenceSwitchValue
      ] = useState<boolean>(preferenceInitialValue);

    const topSliderCallback = (result: number[]) => {
      topRangeSliderValues.current = result;
      AppLog.log("top slider callback: " + result);
      returnResultToComponent();
    };

    const bottomSliderCallback = (result: number[]) => {
      bottomRangeSliderValues.current = result;
      AppLog.log("bottom slider callback: " + result);
      returnResultToComponent();
    };

    const returnResultToComponent = () => {
      callback({
        topRangeSliderResult: topRangeSliderValues.current,
        bottomRangeSliderResult: bottomRangeSliderValues.current,
        isPreferenceActive: preferenceResult.current
      });
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
                { marginEnd: SPACE.sm }
              ]}
              text="I have no preference"
            />

            <AppSwitch
              defaultValue={preferenceSwitchValue}
              showCustomThumb={true}
              onValueChange={(isEnabled: boolean) => {
                setPreferenceSwitchValue(isEnabled);
                preferenceResult.current = isEnabled;
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
            backgroundColor: themedColors.background,
            borderColor: themedColors.border
          },
          style
        ]}
        onLayout={(event) => {
          let { width } = event.nativeEvent.layout;
          setSliderWidth(width - (SPACE.md + SPACE.md + 10));
        }}>
        <AppLabel
          style={[styles.label, styles.questionLabel]}
          text={question}
        />

        <RangeSliderWithLabel
          initialValues={topRangeSliderValues.current}
          enableTwoThumbs={false}
          result={topSliderCallback}
          labelLeft={labelLeft}
          labelRight={labelRight}
          minValue={minValue}
          maxValue={maxValue}
          sliderWidth={sliderWidth}
          allowSliderClick={true}
        />

        {preferenceView()}

        <RangeSliderWithLabel
          initialValues={
            preferenceSwitchValue
              ? [minValue, maxValue]
              : initialValuesBottomSlider
          }
          enableTwoThumbs={true}
          result={bottomSliderCallback}
          labelLeft={labelLeft}
          labelRight={labelRight}
          minValue={minValue}
          maxValue={maxValue}
          sliderWidth={sliderWidth}
          enableThumbOne={!preferenceSwitchValue}
          enableThumbTwo={!preferenceSwitchValue}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACE.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: SPACE.md
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
  preferenceWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: SPACE.lg,
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
