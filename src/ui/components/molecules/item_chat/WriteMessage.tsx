import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppInputField } from "ui/components/molecules/appinputfield/AppInputField";
import { SPACE } from "config";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import PaperAirplane from "assets/images/paper_airplane.svg";
import { AppLog, SvgProp } from "utils/Util";
import { usePreferredTheme } from "hooks";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
import DataGenerator from "utils/DataGenerator";
import ChatItem, { SenderType } from "models/ChatItem";
import { Color, NumberProp } from "react-native-svg";

export interface TypingComponentProps {
  updateMessagesList: (message: ChatItem) => void;
}

export const WriteMessage = React.memo<TypingComponentProps>(
  ({ updateMessagesList }) => {
    const [initialText, setInitialText] = useState<string | undefined>("");
    const { themedColors } = usePreferredTheme();

    const icon: SvgProp = (
      color?: Color,
      width?: NumberProp,
      height?: NumberProp
    ) => {
      AppLog.log("color : " + color + width + height); //just to avoid warning
      return (
        <PaperAirplane
          testID="icon"
          width={25}
          height={25}
          fill={themedColors.primary}
        />
      );
    };

    const sentMessage = () => {
      let chatMessage = DataGenerator.createChat(
        1009,
        ["Nikki Engelin"],
        false,
        SenderType.STUDENTS,
        1,
        require("assets/images/d_user_pic.png"),
        initialText
      );
      updateMessagesList(chatMessage);
      setInitialText("");
    };

    return (
      <View style={[styles.container(themedColors)]}>
        <AppInputField
          multiline={true}
          placeholderTextColor="#4b5563"
          placeholder="Start typing your message"
          viewStyle={styles.inputField(themedColors)}
          onChangeText={(text: string) => {
            setInitialText(text);
          }}
          valueToShowAtStart={initialText}
        />

        <AppImageBackground
          icon={icon}
          containerShape={CONTAINER_TYPES.SQUARE}
          onPress={sentMessage}
          containerStyle={styles.imgPaper(themedColors)}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: (themedColors: ColorPalette) => {
    return {
      paddingVertical: SPACE.md,
      paddingHorizontal: SPACE.md,
      flexDirection: "row",
      backgroundColor: themedColors.background,
      borderTopWidth: 0.5,
      borderTopColor: themedColors.interface["300"]
    };
  },
  imgPaper: (themedColors: ColorPalette) => {
    return {
      marginStart: SPACE.md,
      backgroundColor: themedColors.primaryShade,
      elevation: 0
    };
  },
  inputField: (themedColors: ColorPalette) => {
    return {
      borderColor: themedColors.border,
      color: themedColors.interface["600"],

      //Its for IOS
      shadowColor: themedColors.transparent,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,

      // its for android
      elevation: 0,
      backgroundColor: themedColors.transparent
    };
  }
});
