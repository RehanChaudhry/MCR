import React, { useState } from "react";
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

export type Choice = { id: number; label: string };
type Props = {
  style?: StyleProp<ViewStyle>;
  values: Array<Choice>;
  onChange?: (value: Choice, index: number) => void;
  direction: DIRECTION_TYPE;
  byDefaultSelected?: number;
  itemsInRow?: number; //for horizontal buttons
  shouldNotOptimize?: boolean;
};

export enum DIRECTION_TYPE {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical"
}

export const RadioGroup = optimizedMemo<Props>(
  ({
    style,
    values,
    onChange,
    itemsInRow = 2,
    direction,
    byDefaultSelected = 0
  }) => {
    const theme = usePreferredTheme();
    const [selectedPosition, setSelectedPosition] = useState<number>(
      values.length - 1 >= byDefaultSelected ? byDefaultSelected : 0
    );

    function buttonPressed(position: number) {
      const oldSelectedOption = selectedPosition;
      setSelectedPosition(position);
      if (position !== oldSelectedOption) {
        onChange?.(values[position], position);
      }
    }

    function getStyleAsPerSelectionStatus(position: number) {
      return selectedPosition === position
        ? [{ backgroundColor: theme.themedColors.label }]
        : [{ backgroundColor: theme.themedColors.background }];
    }

    const getDirection = () => {
      if (direction === DIRECTION_TYPE.HORIZONTAL) {
        return styles.direction_horizontal;
      } else if (direction === DIRECTION_TYPE.VERTICAL) {
        return styles.direction_vertical;
      }
    };

    return (
      <View
        style={[style, getDirection(), styles.radioButtonWrapper]}
        testID={"RADIO_GROUP"}>
        {values.map((item, index) => (
          <View
            style={[
              styles.radioButtonContainer,
              {
                width: Dimensions.get("window").width / (itemsInRow - 10)
              }
            ]}
            key={item.label}>
            <TouchableOpacity
              testID={"RADIO_GROUP_BUTTON"}
              style={[
                styles.radioButton,
                {
                  borderColor: theme.themedColors.label,
                  backgroundColor: theme.themedColors.background
                }
              ]}
              onPress={() => buttonPressed(index)}>
              <View
                style={[
                  styles.radioButtonIcon,
                  getStyleAsPerSelectionStatus(index)
                ]}
              />
            </TouchableOpacity>
            <TouchableWithoutFeedback
              testID="RADIO_GROUP_LABEL"
              onPress={() => buttonPressed(index)}>
              <AppLabel style={styles.radioButtonText} text={item.label} />
            </TouchableWithoutFeedback>
          </View>
        ))}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: 16
  },
  radioButtonWrapper: {
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  radioButtonIcon: {
    height: 16,
    width: 16,
    borderRadius: 10,
    justifyContent: "flex-start"
  },
  radioButtonText: {
    fontSize: 14,
    marginLeft: 10,
    marginRight: 16
  },
  direction_horizontal: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  direction_vertical: {
    flexDirection: "column"
  }
});
