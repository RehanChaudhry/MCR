import React from "react";
import { ThemeSwitcher } from "ui/components/templates/ThemeSwitcher";
import { StyleSheet, View } from "react-native";
import {
  QuestionItem,
  SliderCallback
} from "ui/components/organisms/question_item/QuestionItem";
import { SPACE } from "config";
import { AppLog } from "utils/Util";

type Props = {};

export const RangeSliderView = React.memo<Props>(({}) => {
  const myCallback = (result: SliderCallback) => {
    let {
      topRangeSliderResult,
      bottomRangeSliderResult,
      isPreferenceActive
    } = result;
    AppLog.logForcefully(
      "topSliderRange : " +
        topRangeSliderResult +
        " bottomSliderRange : " +
        bottomRangeSliderResult +
        " isPreferenceActive : " +
        isPreferenceActive
    );
  };

  return (
    <ThemeSwitcher>
      <View style={styles.container}>
        <QuestionItem
          question="When do you normally go to bed.?"
          minValue={0}
          maxValue={100}
          initialValuesBottomSlider={[0, 50]}
          initialValuesTopSlider={[50]}
          style={{
            marginBottom: SPACE.two
          }}
          callback={myCallback}
          preferenceInitialValue={false}
          labelLeft="Lights out at 10!"
          labelRight="Usually late, after 1 AM"
        />
      </View>
    </ThemeSwitcher>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
