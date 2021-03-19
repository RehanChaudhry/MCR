import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import usePreferredTheme from "hooks/theme/usePreferredTheme";

export type Choice = { id: number; label: string };
type Props = {
  values: Array<Choice>;
  onChange?: (value: Choice, index: number) => void;
  direction: DIRECTION_TYPE;
  byDefaultSelected?: number;
  itemsInRow?: number; //for horizontal buttons
};

export enum DIRECTION_TYPE {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical"
}

export const RadioGroup = React.memo<Props>(
  ({
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
        style={[getDirection(), styles.radioButtonWrapper]}
        testID={"RADIO_GROUP"}>
        {values.map((item, index) => (
          <View
            style={[
              styles.radioButtonContainer,
              {
                width: Dimensions.get("window").width / (itemsInRow + 1)
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
            <TouchableOpacity
              testID="RADIO_GROUP_LABEL"
              onPress={() => buttonPressed(index)}>
              <AppLabel style={styles.radioButtonText} text={item.label} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    //paddingVertical: 10,
    alignSelf: "flex-start",
    marginTop: 16
    //marginStart: 10
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
    borderRadius: 7,
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
