import React from "react";
import { StyleSheet, View } from "react-native";
import { AppInputField } from "ui/components/molecules/appinputfield/AppInputField";
import { SPACE } from "config";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import PaperAirplane from "assets/images/paper_airplane.svg";
import { AppLog } from "utils/Util";

export interface TypingComponentProps {}

export const TypingComponent = React.memo<TypingComponentProps>(({}) => {
  let message = "";

  const icon1 = () => {
    return (
      <PaperAirplane
        testID="icon"
        width={25}
        height={25}
        fill={"#00694e"}
      />
    );
  };

  const sentMessage = () => {
    //sent message from this method
    AppLog.logForcefully("current message is : " + message);
  };

  return (
    <View style={[styles.container]}>
      <AppInputField
        multiline={true}
        placeholderTextColor="#4b5563"
        placeholder="Start typing your message"
        viewStyle={styles.inputField}
        onChangeText={(text: string) => {
          message = text;
        }}
      />

      <AppImageBackground
        icon={icon1}
        containerShape={CONTAINER_TYPES.SQUARE}
        onPress={sentMessage}
        containerStyle={styles.imgPaper}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACE.md,
    paddingHorizontal: SPACE.md,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 0.5,
    borderTopColor: "#d1d5db"
  },
  imgPaper: {
    marginStart: SPACE.md,
    backgroundColor: "#f3f4f6",
    elevation: 0
  },
  inputField: {
    borderColor: "#b2b7bf",
    color: "#4b5563",

    //Its for IOS
    shadowColor: "#00000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,

    // its for android
    elevation: 0,
    backgroundColor: "#00000000"
  }
});
