import { StyleSheet, View } from "react-native";
import React from "react";
import { FONT_SIZE, SPACE } from "config";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { usePreferredTheme } from "hooks";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
import { SenderType } from "models/ChatItem";
import { Conversation } from "models/api_responses/ChatsResponseModel";

export interface ChatHeaderProps {
  chatItem: Conversation;
  lastHeaderTitle: string;
  onHeaderCreated: (title: string) => void;
}

const createHeader = (
  theme: ColorPalette,
  item: Conversation,
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

  if (
    !item.isMessageComesToday() &&
    lastHeaderTitle !== SenderType.NEW_MESSAGES
  ) {
    lastHeaderTitle = SenderType.NEW_MESSAGES;
    callback(lastHeaderTitle);
    return label(lastHeaderTitle);
  } else if (
    item.userType === SenderType.STAFF &&
    lastHeaderTitle !== SenderType.STAFF &&
    item.isMessageComesToday()
  ) {
    lastHeaderTitle = /*SenderType.STAFF*/ "STAFF";
    callback(lastHeaderTitle);
    return label(lastHeaderTitle);
  } else if (
    item.userType === SenderType.STUDENTS &&
    lastHeaderTitle !== "STUDENTS" &&
    item.isMessageComesToday()
  ) {
    lastHeaderTitle = /*SenderType.STUDENTS*/ "STUDENTS";
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
      paddingStart: SPACE.lg,
      fontSize: FONT_SIZE.xs,
      color: themedColors.interface["600"],
      marginBottom: SPACE.md
    };
  }
});
