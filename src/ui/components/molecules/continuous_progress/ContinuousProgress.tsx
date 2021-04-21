import {
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
import { usePreferredTheme } from "hooks";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import Colors from "config/Colors";
import Retry from "assets/images/retry.svg";
import useEffectWithSkipFirstTime from "hooks/useEffectWithSkipFirstTime";

export interface ContinuousProgressProps {
  isLoading: boolean | undefined;
  isError: boolean | undefined;
  retryCallback: () => void;
  size: number;
}

const values = [{ index: 0 }, { index: 1 }, { index: 2 }];

export const ContinuousProgress = React.memo<ContinuousProgressProps>(
  ({ isLoading, isError, retryCallback, size = 5 }) => {
    const { themedColors } = usePreferredTheme();
    const [segmentWidth, setSegmentWidth] = useState(0);
    const animation = useRef(new Animated.Value(0)).current;
    const [selectedPosition, setSelectedPosition] = useState<number>(0);
    let index = useRef(0);

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
    }, [segmentWidth, animation, selectedPosition]);

    useEffectWithSkipFirstTime(() => {
      let id = setTimeout(() => {
        if (index.current === 2) {
          index.current = -1;
        }
        setSelectedPosition(index.current + 1);
        index.current++;
      }, 1000);
      return () => {
        clearTimeout(id);
      };
    });

    return (
      <View
        style={styles.container}
        onLayout={({
          nativeEvent: {
            layout: { width }
          }
        }) => {
          const newSegmentWidth = values.length
            ? width / values.length
            : 0;
          setSegmentWidth(newSegmentWidth);
          animation.setValue(newSegmentWidth * (selectedPosition || 0));
        }}>
        {isLoading &&
          values &&
          values.map(() => {
            return (
              <View style={styles.defaultProgress(themedColors, size)} />
            );
          })}

        {isLoading && (
          <Animated.View
            testID={"animatedView"}
            style={[
              styles.progress(themedColors, size),
              { transform: [{ translateX: animation }] }
            ]}
          />
        )}

        {isError && (
          <TouchableOpacity onPress={retryCallback}>
            <View style={styles.retryWrapper}>
              <Retry
                testID="icon"
                width={8}
                height={8}
                fill={Colors.red}
              />
              <AppLabel text="Retry" style={styles.text} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  defaultProgress: (theme: ColorPalette, size: number) => {
    return {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: theme.interface["400"],
      marginStart: size
    };
  },
  progress: (theme: ColorPalette, size: number) => {
    return {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: theme.primary,
      position: "absolute",
      marginStart: size
    };
  },
  retryWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 10,
    color: Colors.red,
    marginStart: 2
  }
});
