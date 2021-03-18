import { StyleSheet, View } from "react-native";
import React from "react";
import { FONT_SIZE, SPACE } from "config";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { usePreferredTheme } from "hooks";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
import ChatItem, { SenderType } from "models/ChatItem";
import { AppLog } from "utils/Util";

export interface ChatHeaderProps {
  chatItem: ChatItem;
  lastHeaderTitle: string;
  onHeaderCreated: (title: string) => void;
}

const createHeader = (
  theme: ColorPalette,
  item: ChatItem,
  lastHeaderTitle: string,
  headerCreated: any
) => {
  AppLog.logForcefully(
    "last header title " + lastHeaderTitle + " type " + item.type
  );
  if (!item.isMessageRead && lastHeaderTitle !== "NEW MESSAGES") {
    lastHeaderTitle = SenderType.NEW_MESSAGES;
    headerCreated(lastHeaderTitle);
    return (
      <AppLabel
        text={lastHeaderTitle}
        style={styles.listHeader(theme)}
        weight="semi-bold"
      />
    );
  } else if (
    item.type === SenderType.STAFF &&
    lastHeaderTitle !== SenderType.STAFF &&
    item.isMessageRead
  ) {
    lastHeaderTitle = SenderType.STAFF;
    headerCreated(lastHeaderTitle);
    return (
      <AppLabel
        text={lastHeaderTitle}
        style={styles.listHeader(theme)}
        weight="semi-bold"
      />
    );
  } else if (
    item.type === SenderType.STUDENTS &&
    lastHeaderTitle !== SenderType.STUDENTS &&
    item.isMessageRead
  ) {
    lastHeaderTitle = SenderType.STUDENTS;
    headerCreated(lastHeaderTitle);
    return (
      <AppLabel
        text={lastHeaderTitle}
        style={styles.listHeader(theme)}
        weight="semi-bold"
      />
    );
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
      color: themedColors.interface["700"]
    };
  }
});
