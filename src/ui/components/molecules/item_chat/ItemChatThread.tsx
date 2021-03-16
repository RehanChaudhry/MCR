import {
  Image,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import React from "react";
import { FONT_SIZE, SPACE } from "config";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";

export interface ItemChatThreadProps extends ViewStyle {
  style?: StyleProp<ViewStyle>;
}

export const ItemChatThread = React.memo<ItemChatThreadProps>(
  ({ style }) => {
    return (
      <View style={[styles.container1, style]}>
        <Image
          style={styles.imgStyle}
          source={require("assets/images/d_user_pic.png")}
        />

        <View style={styles.textWrapper}>
          <View style={styles.nameContainer}>
            <AppLabel
              style={styles.nameText}
              text="Phoenix walker"
              weight="normal"
            />
            <AppLabel
              style={styles.timeText}
              text="10m ago"
              weight="normal"
            />
          </View>
          <AppLabel
            style={styles.messageText}
            text="OK, I'll let him know.. sorry just saw your message"
            numberOfLines={2}
            ellipsizeMode="tail"
            weight="normal"
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container1: {
    paddingVertical: SPACE.md,
    paddingHorizontal: SPACE.md,
    flexDirection: "row"
  },
  indicator: {
    position: "absolute",
    start: 45,
    top: 10
  },
  imgStyle: {
    width: 45,
    height: 45,
    resizeMode: "cover"
  },
  textWrapper: {
    paddingVertical: SPACE.md,
    marginStart: SPACE.md,
    paddingHorizontal: SPACE.md,
    flexDirection: "column",
    borderRadius: 10,
    flex: 1,
    backgroundColor: "#E6F0ED"
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: SPACE.sm
  },
  nameText: {
    fontSize: FONT_SIZE.lg,
    color: "#111827"
  },
  messageText: {
    fontSize: FONT_SIZE.sm,
    color: "#111827",
    lineHeight: 16
  },
  timeText: {
    fontSize: FONT_SIZE.sm,
    color: "#4b5563",
    lineHeight: 20,
    marginEnd: SPACE.md
  }
});
