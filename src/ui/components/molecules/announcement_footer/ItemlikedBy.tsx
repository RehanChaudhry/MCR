import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import React from "react";
import { FONT_SIZE, SPACE } from "config";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import { User } from "models/User";
import { usePreferredTheme } from "hooks";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import ChatRound from "assets/images/chat_round.svg";
import { moderateScale } from "config/Dimens";
import useAuth from "hooks/useAuth";
import EIntBoolean from "models/enums/EIntBoolean";

export interface ItemLikedBy extends ViewStyle {
  onPress: (item: User) => void;
  item: User;
  style?: StyleProp<ViewStyle>;
  shouldNotOptimize?: boolean;
  onchatButtonClicked: (user: User) => void;
}

export const ItemLikedBy = optimizedMemo<ItemLikedBy>(
  ({ item, onPress, onchatButtonClicked }) => {
    const { themedColors } = usePreferredTheme();
    const auth = useAuth();
    return (
      <View style={styles.container(themedColors)}>
        <TouchableOpacity
          style={styles.profile}
          onPress={() => {
            onPress(item);
          }}>
          <Image
            style={styles.img}
            source={{ uri: item.profilePicture?.fileURL }}
          />
          <AppLabel
            text={item.firstName + " " + item.lastName}
            style={styles.txt}
          />
        </TouchableOpacity>

        {auth.uni?.chatFeature === EIntBoolean.TRUE && (
          <AppImageBackground
            onPress={() => {
              onchatButtonClicked(item);
            }}
            containerStyle={styles.btnChat}
            containerShape={CONTAINER_TYPES.SQUARE}
            icon={() => (
              <ChatRound
                fill={themedColors.interface[800]}
                width={moderateScale(24)}
                height={moderateScale(24)}
              />
            )}
          />
        )}
      </View>
    );
  }
);
const styles = StyleSheet.create({
  container: (theme: ColorPalette) => {
    return {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: SPACE.sm,
      paddingHorizontal: SPACE.lg,
      justifyContent: "space-between",
      backgroundColor: theme.background,
      borderRadius: 6
    };
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  txt: {
    fontSize: FONT_SIZE.sm,
    marginStart: SPACE.md
  },
  img: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    overflow: "hidden"
  },
  btnChat: {
    marginLeft: SPACE.md,
    height: 36,
    width: 36
  }
});
