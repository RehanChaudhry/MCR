import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
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
import Strings from "config/Strings";

type Props = {
  data: ConversationItem[];
  removeItem: (
    items: ConversationItem[],
    itemToDelete: ConversationItem
  ) => ConversationItem[];
};

export const AddInterestsView = React.memo<Props>(
  ({ data, removeItem }) => {
    const { themedColors } = usePreferredTheme();
    let [items, setItems] = useState<ConversationItem[]>(data);

    function plusIcon(
      color?: Color,
      width?: NumberProp,
      height?: NumberProp
    ) {
      AppLog.log("color : " + color + " " + width + " " + height); //just to avoid warning
      return (
        <Plus
          testID="icon"
          width={moderateScale(12)}
          height={moderateScale(12)}
          fill={themedColors.primary}
        />
      );
    }

    function appInputCallback(text: string) {
      AppLog.log("AppInput field callback " + text);
    }

    const renderItem = ({ item }: { item: ConversationItem }) => {
      AppLog.log("rendering list item : " + JSON.stringify(item));
      return (
        <ItemConversation
          item={item}
          onPress={(currentItem: ConversationItem) => {
            setItems(removeItem(items, currentItem));
          }}
        />
      );
    };

    return (
      <Screen style={styles.container} shouldAddBottomInset={false}>
        <View style={styles.contentWrapper}>
          <FlatListWithPb
            shouldShowProgressBar={false}
            data={items}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            style={[styles.list]}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <WriteMessage
          btnImage={plusIcon}
          appInputFieldCallback={appInputCallback}
          appInputPlaceHolder={Strings.newConversation.typingHint}
          btnPressCallback={appInputCallback}
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
