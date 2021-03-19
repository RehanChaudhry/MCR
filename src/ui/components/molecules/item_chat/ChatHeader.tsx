import { StyleSheet, View } from "react-native";
import React from "react";
import { FONT_SIZE, SPACE } from "config";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { usePreferredTheme } from "hooks";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
import ChatItem, { SenderType } from "models/ChatItem";

export interface ChatHeaderProps {
  chatItem: ChatItem;
  lastHeaderTitle: string;
  onHeaderCreated: (title: string) => void;
}

const createHeader = (
  theme: ColorPalette,
  item: ChatItem,
  lastHeaderTitle: string,
  callback: any
) => {
  const label = (title: string) => {
    return (
      <AppLabel
        text={title}
        style={styles.listHeader(theme)}
        weight="semi-bold"
      />
    );
  };

  if (!item.isMessageRead && lastHeaderTitle !== SenderType.NEW_MESSAGES) {
    lastHeaderTitle = SenderType.NEW_MESSAGES;
    callback(lastHeaderTitle);
    return label(lastHeaderTitle);
  } else if (
    item.type === SenderType.STAFF &&
    lastHeaderTitle !== SenderType.STAFF &&
    item.isMessageRead
  ) {
    lastHeaderTitle = SenderType.STAFF;
    callback(lastHeaderTitle);
    return label(lastHeaderTitle);
  } else if (
    item.type === SenderType.STUDENTS &&
    lastHeaderTitle !== SenderType.STUDENTS &&
    item.isMessageRead
  ) {
    lastHeaderTitle = SenderType.STUDENTS;
    callback(lastHeaderTitle);
    return label(lastHeaderTitle);
  }
};

export const ChatHeader = React.memo<ChatHeaderProps>(
  ({ chatItem, lastHeaderTitle, onHeaderCreated }) => {
    const { themedColors } = usePreferredTheme();
    return (
      <View>
        {createHeader(
          themedColors,
          chatItem,
          lastHeaderTitle,
          onHeaderCreated
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  listHeader: (themedColors: ColorPalette) => {
    return {
      paddingStart: SPACE.md + 5,
      paddingVertical: SPACE.sm,
      fontSize: FONT_SIZE.sm,
      color: themedColors.interface["600"]
    };
  }
});
