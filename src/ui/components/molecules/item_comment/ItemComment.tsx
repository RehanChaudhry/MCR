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
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
import { usePreferredTheme } from "hooks";
import { PrettyTimeFormat } from "utils/PrettyTimeFormat";
import { Comment } from "models/api_responses/CommentsResponseModel";

export interface ItemCommentProps extends ViewStyle {
  item: Comment;
  style?: StyleProp<ViewStyle>;
}

export const ItemComment = React.memo<ItemCommentProps>(
  ({ style, item }) => {
    const { themedColors } = usePreferredTheme();

    let prettyTime = new PrettyTimeFormat().getPrettyTime(
      (item.createdAt as unknown) as string
    );

    return (
      <View style={[styles.container, style]}>
        <Image
          style={styles.imgStyle}
          source={{
            uri: item.user?.profilePicture?.fileURL
          }}
        />

        <View style={styles.textWrapper(themedColors)}>
          <View style={styles.nameContainer}>
            <AppLabel
              style={styles.nameText(
                themedColors,
                item.shouldRetry !== undefined ? item.shouldRetry : false
              )}
              text={item.user?.firstName + " " + item.user?.lastName}
              weight="semi-bold"
            />
            <AppLabel
              style={styles.timeText(themedColors)}
              text={prettyTime}
              weight="normal"
            />
          </View>
          <AppLabel
            style={styles.messageText(themedColors)}
            text={item.comment}
            numberOfLines={0}
            ellipsizeMode="tail"
            weight="normal"
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  imgStyle: {
    width: 48,
    height: 48,
    resizeMode: "cover",
    borderRadius: 48 / 2
  },
  textWrapper: (theme: ColorPalette) => {
    return {
      paddingVertical: SPACE.md,
      marginStart: SPACE.md,
      paddingHorizontal: SPACE.md,
      flexDirection: "column",
      borderRadius: 12,
      flex: 1,
      backgroundColor: theme.background
    };
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  nameText: (theme: ColorPalette, retry: boolean) => {
    return {
      fontSize: FONT_SIZE.sm,
      color: retry ? theme.interface["800"] : "#d21818"
    };
  },
  messageText: (theme: ColorPalette) => {
    return {
      fontSize: FONT_SIZE.sm,
      color: theme.label,
      paddingTop: SPACE.xs
    };
  },
  timeText: (theme: ColorPalette) => {
    return {
      fontSize: FONT_SIZE.xs,
      color: theme.interface["700"]
    };
  }
});
