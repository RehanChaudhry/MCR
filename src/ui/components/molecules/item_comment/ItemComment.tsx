import {
  Image,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import React, { useEffect, useState } from "react";
import { FONT_SIZE, SPACE } from "config";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
import { usePreferredTheme } from "hooks";
import { PrettyTimeFormat } from "utils/PrettyTimeFormat";
import { Comment } from "models/api_responses/CommentsResponseModel";
import { ContinuousProgress } from "ui/components/molecules/continuous_progress/ContinuousProgress";

export interface ItemCommentProps extends ViewStyle {
  item: Comment;
  style?: StyleProp<ViewStyle>;
  retry: (postId: number) => void;
}

export const ItemComment = React.memo<ItemCommentProps>(
  ({ style, item, retry }) => {
    const { themedColors } = usePreferredTheme();
    const DateFormatter = new PrettyTimeFormat();
    const [prettyTime, setPrettyTime] = useState<string>(
      DateFormatter.getPrettyTime((item.createdAt as unknown) as string)
    );

    useEffect(() => {
      let id = setTimeout(() => {
        setPrettyTime(
          DateFormatter.getPrettyTime(
            (item.createdAt as unknown) as string
          )
        );
      }, 10000);
      return () => {
        clearTimeout(id);
      };
    });

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
              style={styles.nameText(themedColors)}
              shouldNotOptimize={true}
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

          <View
            style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <ContinuousProgress
              isLoading={item.isLoading}
              isError={item.isError}
              retryCallback={() => {
                /*item.retry?.(item.id!!);*/
                retry(item.id);
              }}
            />
          </View>
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
  nameText: (theme: ColorPalette) => {
    return {
      fontSize: FONT_SIZE.sm,
      color: theme.interface["800"]
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
