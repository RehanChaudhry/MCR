import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle
} from "react-native";
import React from "react";
import { FONT_SIZE, SPACE } from "config";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import User from "models/User";
import { AppLog } from "utils/Util";

export interface ItemConversationProps extends ViewStyle {
  onPress: (item: User) => void;
  item: User;
  style?: StyleProp<ViewStyle>;
  shouldNotOptimize?: boolean;
}

export const ItemSuggestion = optimizedMemo<ItemConversationProps>(
  ({ item, onPress }) => {
    return (
      <TouchableOpacity
        style={styles.container}
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
    );
  }
);
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: SPACE.sm,
    paddingHorizontal: SPACE.lg
  },
  txt: {
    fontSize: FONT_SIZE.sm,
    marginStart: SPACE.md
  },
  img: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    overflow: "hidden"
  }
});
