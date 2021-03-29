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
import { moderateScale } from "config/Dimens";
import { ConversationItem } from "models/ConversationItem";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

export interface ItemConversationProps extends ViewStyle {
  onPress: (item: ConversationItem) => void;
  item: ConversationItem;
  style?: StyleProp<ViewStyle>;
}

export const ItemConversation = optimizedMemo<ItemConversationProps>(
  ({ item, onPress }) => {
    const { themedColors } = usePreferredTheme();

    const defaultIcon: SvgProp = (
      color?: Color,
      width?: NumberProp,
      height?: NumberProp
    ) => {
      AppLog.log("color : " + color + width + height); //just to avoid warning
      return (
        <Trash
          testID="icon"
          width={25}
          height={25}
          fill={themedColors.primary}
        />
      );
    };

    return (
      <CardView style={styles.card(themedColors)}>
        <AppLabel text={item.name} style={styles.txt} />

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
      borderRadius: 5,
      paddingHorizontal: SPACE.lg,
      marginHorizontal: SPACE.md,
      marginTop: SPACE.xsm,
      marginBottom: SPACE.xsm,
      backgroundColor: themedColors.background,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    };
  },
  txt: {
    fontSize: FONT_SIZE.xsm
  },
  img: {
    width: moderateScale(35),
    height: moderateScale(35)
  }
});
