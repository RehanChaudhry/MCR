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
import { useAuth, usePreferredTheme } from "hooks";
import { PrettyTimeFormat } from "utils/PrettyTimeFormat";
import Message from "models/Message";
import { ContinuousProgress } from "ui/components/molecules/continuous_progress/ContinuousProgress";

export interface ItemChatThreadProps extends ViewStyle {
  item: Message | undefined;
  style?: StyleProp<ViewStyle>;
  retry?: (message: Message) => void;
}

export const ItemChatThread = React.memo<ItemChatThreadProps>(
  ({ style, item, retry }) => {
    const { themedColors } = usePreferredTheme();
    const currentUser = useAuth();
    const DateFormatter = new PrettyTimeFormat();

    let formattedDate = DateFormatter.getPrettyTime(
      (item!.createdAt as unknown) as string
    );
    //AppLog.log(() => `Item: ${item?.id}, formattedDate: ${formattedDate}`);
    const [prettyTime, setPrettyTime] = useState<string>(formattedDate);

    useEffect(() => {
      /*AppLog.log(
        () =>
          `In useEffect()... Item: ${item?.id}, formattedDate: ${formattedDate}`
      );*/
      setPrettyTime(
        DateFormatter.getPrettyTime((item!.createdAt as unknown) as string)
      );
      let id = setInterval(() => {
        setPrettyTime(
          DateFormatter.getPrettyTime(
            (item!.createdAt as unknown) as string
          )
        );
      }, 5000);
      return () => {
        clearInterval(id);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formattedDate]);

    return (
      <View style={{ flexDirection: "column" }}>
        <View style={[styles.container, style]}>
          <Image
            style={styles.imgStyle}
            source={
              item?.profilePicture?.fileURL !== undefined
                ? { uri: item?.profilePicture?.fileURL }
                : require("assets/images/profile.png")
            }
          />

          <View
            style={styles.textWrapper(
              themedColors,
              item?.userId === currentUser.user?.profile?.id
            )}>
            <View style={styles.nameContainer}>
              <AppLabel
                style={styles.nameText(themedColors)}
                text={item?.firstName + " " + item?.lastName}
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
              text={item?.text}
              numberOfLines={0}
              ellipsizeMode="tail"
              weight="normal"
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <ContinuousProgress
            isLoading={item!.isLoading}
            isError={item!.isError}
            retryCallback={() => {
              retry?.(item!);
            }}
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: SPACE.lg
  },
  imgStyle: {
    width: 48,
    height: 48,
    resizeMode: "cover",
    borderRadius: 48 / 2
  },
  textWrapper: (theme: ColorPalette, isCurrentUser: boolean) => {
    return {
      paddingVertical: SPACE.md,
      marginStart: SPACE.md,
      paddingHorizontal: SPACE.md,
      flexDirection: "column",
      borderRadius: 12,
      flex: 1,
      backgroundColor: isCurrentUser
        ? theme.background
        : theme.primaryShade
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
