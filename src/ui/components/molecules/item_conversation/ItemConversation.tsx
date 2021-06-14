import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { usePreferredTheme } from "hooks";
import { CardView } from "ui/components/atoms/CardView";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
import { FONT_SIZE, SPACE } from "config";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { AppLog, SvgProp } from "utils/Util";
import { Color, NumberProp } from "react-native-svg";
import Trash from "assets/images/trash.svg";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import { User } from "models/User";
import { ConversationItem } from "models/ConversationItem";
export interface ItemConversationProps extends ViewStyle {
  onPress: (item: User | ConversationItem) => void;
  item: User | ConversationItem;
  style?: StyleProp<ViewStyle>;
  shouldNotOptimize?: boolean;
}

export const ItemConversation = optimizedMemo<ItemConversationProps>(
  ({ item, onPress }) => {
    const { themedColors } = usePreferredTheme();
    AppLog.logForcefullyForComplexMessages(
      () => "item user : " + JSON.stringify(item)
    );
    const defaultIcon: SvgProp = (
      color?: Color,
      width?: NumberProp,
      height?: NumberProp
    ) => {
      AppLog.logForComplexMessages(
        () => "color : " + color + width + height
      ); //just to avoid warning
      return (
        <Trash
          testID="icon"
          width={18}
          height={18}
          fill={themedColors.primary}
        />
      );
    };

    return (
      <CardView style={styles.card(themedColors)}>
        <AppLabel
          text={
            item.hasOwnProperty("firstName")
              ? item?.firstName + " " + item?.lastName
              : item?.value
          }
          style={styles.txt}
        />

        <AppImageBackground
          icon={defaultIcon}
          containerShape={CONTAINER_TYPES.CIRCLE}
          containerStyle={styles.img}
          onPress={() => {
            onPress(item);
          }}
        />
      </CardView>
    );
  }
);
const styles = StyleSheet.create({
  card: (themedColors: ColorPalette) => {
    return {
      paddingVertical: SPACE.sm,
      borderRadius: 6,
      paddingHorizontal: SPACE.lg,
      marginHorizontal: SPACE.lg,
      marginTop: SPACE.md,
      marginBottom: SPACE.xs,
      backgroundColor: themedColors.background,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    };
  },
  txt: {
    fontSize: FONT_SIZE.sm
  },
  img: {
    width: 32,
    height: 32
  }
});
