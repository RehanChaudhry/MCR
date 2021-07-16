import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle
} from "react-native";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import { usePreferredTheme } from "hooks";
import React from "react";
import { moderateScale } from "config/Dimens";
import ChatRound from "assets/images/chat_round.svg";
import useAuth from "hooks/useAuth";
import EIntBoolean from "models/enums/EIntBoolean";

export interface ChatButtonProps extends TouchableOpacityProps {
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  shouldNotOptimize?: boolean;
}

export const ChatButton = optimizedMemo<ChatButtonProps>(
  ({ containerStyle, onPress }) => {
    const theme = usePreferredTheme();
    const auth = useAuth();
    const imageWithBgJsx = (
      <View
        style={[
          style.container,
          {
            backgroundColor: theme.themedColors.interface[200],
            shadowColor: theme.themedColors.interface[200]
          },

          style.squareShape,
          containerStyle
        ]}>
        <ChatRound
          fill={theme.themedColors.interface[800]}
          width={moderateScale(24)}
          height={moderateScale(24)}
        />
      </View>
    );
    if (auth.uni?.chatFeature === EIntBoolean.TRUE) {
      return (
        <TouchableOpacity onPress={onPress}>
          {imageWithBgJsx}
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }
);

const style = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  squareShape: {
    borderRadius: 5
  },
  circleShape: {
    borderRadius: 50
  },
  icon: {
    width: "50%",
    height: undefined,
    aspectRatio: 1
  }
});
