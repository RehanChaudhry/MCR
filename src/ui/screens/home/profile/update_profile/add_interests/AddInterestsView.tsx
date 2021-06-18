import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback, useRef } from "react";
import { WriteMessage } from "ui/components/molecules/item_chat/WriteMessage";
import Screen from "ui/components/atoms/Screen";
import { AppLog, shadowStyleProps } from "utils/Util";
import { Color, NumberProp } from "react-native-svg";
import Plus from "assets/images/plus.svg";
import { usePreferredTheme } from "hooks";
import { FONT_SIZE, moderateScale, SPACE } from "config/Dimens";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { ItemConversation } from "ui/components/molecules/item_conversation/ItemConversation";
import { ConversationItem } from "models/ConversationItem";

type Props = {
  data: ConversationItem[];
  removeItem: (itemToDelete: ConversationItem) => void;
  addItem: (text: string) => void;
};

export const AddInterestsView = React.memo<Props>(
  ({ data, removeItem, addItem }) => {
    const { themedColors } = usePreferredTheme();

    const list = useRef<FlatList>(null);

    const onAddItem = useCallback(
      (text: string) => {
        addItem(text);
        setTimeout(
          () => list.current?.scrollToEnd({ animated: true }),
          200
        );
      },
      [addItem]
    );

    function plusIcon(
      color?: Color,
      width?: NumberProp,
      height?: NumberProp
    ) {
      AppLog.log(() => "color : " + color + " " + width + " " + height); //just to avoid warning
      return (
        <Plus
          testID="icon"
          width={moderateScale(12)}
          height={moderateScale(12)}
          fill={themedColors.primary}
        />
      );
    }

    const renderItem = ({ item }: { item: ConversationItem }) => {
      AppLog.log(() => "rendering list item : " + JSON.stringify(item));
      return (
        <ItemConversation
          item={item}
          onPress={(currentItem: ConversationItem) => {
            removeItem(currentItem);
          }}
        />
      );
    };

    return (
      <Screen style={styles.container} shouldAddBottomInset={false}>
        <View style={styles.contentWrapper}>
          <FlatListWithPb
            listRef={list}
            shouldShowProgressBar={false}
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            style={[styles.list]}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <WriteMessage
          btnImage={plusIcon}
          appInputPlaceHolder="Start typing"
          btnPressCallback={onAddItem}
          multiline={false}
        />
      </Screen>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1
  },
  segmentControlWrapper: (theme: ColorPalette) => {
    return {
      backgroundColor: theme.background,
      ...shadowStyleProps
    };
  },
  contentWrapper: {
    flex: 1,
    paddingVertical: SPACE.lg
  },
  textStyle: (theme: ColorPalette) => {
    return {
      color: theme.interface["600"],
      fontSize: FONT_SIZE.xs,
      paddingHorizontal: SPACE.md,
      paddingBottom: SPACE.lg
    };
  },
  list: {
    flex: 1
  }
});
