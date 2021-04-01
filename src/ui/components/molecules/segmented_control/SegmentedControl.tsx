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
import { optimizedMemoWithStyleProp } from "ui/components/templates/optimized_memo/optimized_memo";
import { AppLog } from "utils/Util";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { usePreferredTheme } from "hooks";
import { FONT_SIZE } from "config";
import { grayShades } from "hooks/theme/ColorPaletteContainer";

export type Choice = { label: string; value: string };

interface Props {
  containerStyle?: StyleProp<ViewStyle>; //please dont pass padding start, end or horizontal because width is used to show selected item
  tabStyle?: StyleProp<ViewStyle>;
  tabHeight?: number;
  values: Array<Choice>;
  selectedIndex?: number;
  onChange?: (value: Choice, index: number) => void;
  shouldNotOptimize?: boolean;
}

export const SegmentedControl = optimizedMemoWithStyleProp<Props>(
  ({
    onChange,
    selectedIndex = 0,
    containerStyle,
    tabHeight = 40,
    tabStyle,
    values
  }) => {
    AppLog.log("rendering SegmentedControl...");

    if (values.length < 2) {
      throw new Error("At-least 2 values are required");
    }

    const theme = usePreferredTheme();

    const [selectedPosition, setSelectedPosition] = useState<number>(
      values.length - 1 >= selectedIndex ? selectedIndex : 0
    );

    const [
      selectedIndexDuplicate,
      setSelectedIndexDuplicate
    ] = useState<number>(selectedIndex);

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
        ? [{ color: theme.themedColors.background }]
        : [{ color: theme.themedColors.interface["500"] }];
    }

    function buttonPressed(position: number) {
      const oldSelectedOption = selectedPosition;
      AppLog.logForcefully("position : " + position);
      setSelectedIndexDuplicate(position);
      setSelectedPosition(position);
      if (position !== oldSelectedOption) {
        onChange?.(values[position], position);
      }
    }

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.themedColors.background },
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

          AppLog.logForcefully("width : " + width);
          if (newSegmentWidth !== segmentWidth) {
            animation.setValue(newSegmentWidth * (selectedIndex || 0));
            setSegmentWidth(newSegmentWidth);
          }
        }}>
        <Animated.View
          testID={"animatedView"}
          style={[
            styles.selectedOptionBg(
              values.length - 1,
              selectedIndexDuplicate
            ),
            { transform: [{ translateX: animation }] },
            {
              width: segmentWidth,
              height: tabHeight,
              borderWidth: 0.5,
              borderColor: grayShades.gray["600"],
              backgroundColor: grayShades.gray["600"]
            }
          ]}
        />

        <View style={styles.segmentsContainer}>
          {values &&
            values.map((value, index) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.tabContainer(values.length, index),
                    tabStyle,
                    { height: tabHeight }
                  ]}
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
)(["containerStyle", "tabStyle"]);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderStyle: "solid",
    alignItems: "center",
    borderRadius: 5,
    overflow: "hidden"
  },
  selectedOptionBg: (size: number, index: number) => {
    return {
      position: "absolute",
      borderBottomLeftRadius: index === 0 ? 5 : 0,
      borderTopLeftRadius: index === 0 ? 5 : 0,
      borderTopRightRadius: size === index ? 5 : 0,
      borderBottomRightRadius: size === index ? 5 : 0
    };
  },
  text: {
    fontSize: FONT_SIZE.xsm
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
  tabContainer: (size: number, index: number) => {
    return {
      flex: 1,
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      borderBottomLeftRadius: index === 0 ? 5 : 0,
      borderTopLeftRadius: index === 0 ? 5 : 0,
      borderTopRightRadius: size - 1 === index ? 5 : 0,
      borderBottomRightRadius: size - 1 === index ? 5 : 0,
      borderWidth: 0.5,
      borderColor: grayShades.gray["700"]
    };
  }
});
