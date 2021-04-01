import React, { useRef, useState } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { usePreferredTheme } from "hooks";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE, SPACE } from "config";
import { AppSwitch } from "ui/components/atoms/app_switch/AppSwitch";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import { RangeSliderWithLabel } from "./RangeSliderWithLabel";
import Question from "models/Question";

export interface SliderCallback {
  topRangeSliderResult: number[];
  bottomRangeSliderResult: number[];
  isPreferenceActive: boolean;
}

export interface RangeSliderProps {
  question: Question;
  initialValuesTopSlider?: number[];
  initialValuesBottomSlider?: number[];
  minValue?: number; //slider minimum
  maxValue?: number; //slider maximum
  preferenceInitialValue?: boolean;
  callback: (result: SliderCallback) => void;
  shouldNotOptimize?: boolean;
  style?: StyleProp<ViewStyle>; //avoid passing padding use margin instead, it will handle range slide width
}

export const QuestionItem = optimizedMemo<RangeSliderProps>(
  ({
    question,
    initialValuesTopSlider = null,
    initialValuesBottomSlider = null,
    minValue = 0,
    maxValue = 10,
    preferenceInitialValue = false,
    callback,
    style
  }) => {
    // AppLog.log("Rendering QuestionItem");
    const { themedColors } = usePreferredTheme();
    let [sliderWidth, setSliderWidth] = useState<number>(0);

    const topRangeSliderValues: React.MutableRefObject<number[]> = useRef(
        initialValuesTopSlider ?? []
      ),
      bottomRangeSliderValues: React.MutableRefObject<number[]> = useRef(
        initialValuesBottomSlider ?? []
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
      // AppLog.log("top slider callback: " + result);
      returnResultToComponent();
    };

    const bottomSliderCallback = (result: number[]) => {
      bottomRangeSliderValues.current = result;
      // AppLog.log("bottom slider callback: " + result);
      returnResultToComponent();
    };

    const returnResultToComponent = () => {
      callback({
        topRangeSliderResult: topRangeSliderValues.current,
        bottomRangeSliderResult: bottomRangeSliderValues.current,
        isPreferenceActive: preferenceResult.current
      });
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
          text={question.title}
        />

        <RangeSliderWithLabel
          initialValues={topRangeSliderValues.current}
          enableTwoThumbs={false}
          result={topSliderCallback}
          labelLeft={question.minOption}
          labelRight={question.maxOption}
          minValue={minValue}
          maxValue={maxValue}
          sliderWidth={sliderWidth}
          allowSliderClick={true}
        />

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
                { marginEnd: SPACE.xsm }
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

        <RangeSliderWithLabel
          initialValues={
            preferenceSwitchValue
              ? [minValue!, maxValue!]
              : initialValuesBottomSlider!
          }
          enableTwoThumbs={true}
          result={bottomSliderCallback}
          labelLeft={question.minOption}
          labelRight={question.maxOption}
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
    padding: SPACE.md,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  label: {
    fontSize: FONT_SIZE._2xsm
  },
  questionLabel: {
    fontWeight: "700",
    marginBottom: SPACE.xsm
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
    fontSize: FONT_SIZE._3xm
  }
});
