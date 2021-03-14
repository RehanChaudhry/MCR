import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { AppLog } from "utils/Util";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { usePreferredTheme } from "hooks";
import { FONT_SIZE } from "config";

export type Choice = { label: string; value: string };

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  values: Array<Choice>;
  selectedIndex?: number;
  onChange?: (value: Choice, index: number) => void;
}

export const SegmentedControl = React.memo<Props>(
  ({ onChange, selectedIndex = 0, containerStyle, tabStyle, values }) => {
    AppLog.log("rendering SegmentedControl...");

    if (values.length < 2) {
      throw new Error("At-least 2 values are required");
    }

    const theme = usePreferredTheme();

    const [selectedPosition, setSelectedPosition] = useState<number>(
      values.length - 1 >= selectedIndex ? selectedIndex : 0
    );

    // setup animation
    const [segmentWidth, setSegmentWidth] = useState(0);
    const animation = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      function computeToValue() {
        return segmentWidth * (selectedPosition || 0);
      }

      if (animation) {
        Animated.timing(animation, {
          toValue: computeToValue(),
          duration: 150,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true
        }).start();
      }
    }, [animation, segmentWidth, selectedPosition]);
    ///////////////////

    function getStyleAsPerSelectionStatus(position: number) {
      return selectedPosition === position
        ? [{ color: theme.themedColors.primaryBackground }]
        : [{ color: theme.themedColors.primaryLabelColor }];
    }

    function buttonPressed(position: number) {
      const oldSelectedOption = selectedPosition;
      setSelectedPosition(position);
      if (position !== oldSelectedOption) {
        onChange?.(values[position], position);
      }
    }

    const selectPadding = 3;

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.themedColors.primaryBackground },
          containerStyle
        ]}
        onLayout={({
          nativeEvent: {
            layout: { width }
          }
        }) => {
          const newSegmentWidth = values.length
            ? width / values.length
            : 0;
          if (newSegmentWidth !== segmentWidth) {
            animation.setValue(newSegmentWidth * (selectedIndex || 0));
            setSegmentWidth(newSegmentWidth);
          }
        }}>
        <Animated.View
          testID={"animatedView"}
          style={[
            styles.selectedOptionBg,
            { transform: [{ translateX: animation }] },
            {
              width: segmentWidth - selectPadding * 2,
              top: selectPadding,
              bottom: selectPadding,
              start: selectPadding,
              end: selectPadding,
              backgroundColor: theme.themedColors.primaryLabelColor
            }
          ]}
        />
        <View style={styles.segmentsContainer}>
          {values &&
            values.map((value, index) => {
              return (
                <TouchableOpacity
                  style={[styles.tabContainer, tabStyle]}
                  key={value.value}
                  onPress={() => {
                    buttonPressed(index);
                  }}>
                  <AppLabel
                    style={[
                      styles.text,
                      getStyleAsPerSelectionStatus(index)
                    ]}
                    weight="semi-bold"
                    text={value.label}
                  />
                </TouchableOpacity>
              );
            })}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderStyle: "solid",
    alignItems: "center",
    borderRadius: 5,
    overflow: "hidden",
    height: 40
  },
  selectedOptionBg: {
    position: "absolute",
    borderRadius: 5
  },
  text: {
    fontSize: FONT_SIZE.md
  },
  selectedOption: {},
  unselectedOption: {},
  segmentsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  tabContainer: {
    flex: 1,
    alignContent: "center",
    alignItems: "center"
  }
});
