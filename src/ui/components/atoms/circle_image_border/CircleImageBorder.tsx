import React from "react";
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import Colors from "config/Colors";
import Profile from "assets/images/profile.svg";

import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import { SvgProp } from "utils/Util";
import usePreferredTheme from "hooks/theme/usePreferredTheme";

type Props = {
  shouldNotOptimize?: boolean;
  imageUrl: string;
  icon: SvgProp;
  onPress: () => void;
};

export const CircleImageBorder = optimizedMemo<Props>(
  ({ imageUrl, icon, onPress }) => {
    const theme = usePreferredTheme();
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.mainContainer}>
          <View style={styles.circle}>
            {imageUrl !== undefined && (
              <Image source={{ uri: imageUrl }} style={styles.image} />
            )}
            {imageUrl === undefined && <Profile />}
            <View style={styles.innerContainer}>
              {icon?.(theme.themedColors.interface[700], 14, 14)}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
);

const styles = StyleSheet.create({
  circle: {
    width: 50,
    height: 50,
    position: "absolute",
    overflow: "visible",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.white
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  innerContainer: {
    height: 20,
    width: 20,
    borderRadius: 20,
    marginLeft: 32,
    marginTop: 30,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white
  },
  mainContainer: {
    width: 65,
    height: 65
  },
  userGroup: {
    alignSelf: "center"
  }
});
