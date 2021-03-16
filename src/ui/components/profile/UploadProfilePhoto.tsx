import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import ProfileAvatar from "assets/images/profile_avatar.svg";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import {
  AppButton,
  BUTTON_TYPES
} from "../molecules/app_button/AppButton";
import { AppLabel } from "../atoms/app_label/AppLabel";
import { FONT_SIZE, SPACE } from "../../../config";

export const UploadProfilePhoto = React.memo(() => {
  const profileIcon = () => {
    return (
      <ProfileAvatar
        //testID="icon"
        width={50}
        height={50}
        //fill={color}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <AppImageBackground
          icon={profileIcon}
          containerShape={CONTAINER_TYPES.SQUARE}
          onPress={() => {
            Alert.alert("Profile Icon Tapped");
          }}
        />
        <AppButton
          text="Upload Profile Photo"
          buttonStyle={[styles.uploadButton]}
          buttonType={BUTTON_TYPES.BORDER}
          textStyle={{ fontWeight: "bold" }}
        />
      </View>
      <AppLabel
        text={
          "You are encouraged to upload a photo of yourself to encourage others to interact with you. Pictures should be of you, the owner of the user account, only, and should be appropriate to all audiences. You may not use pictures of others or any photography that is provocative or lewd. Abuse of this system is a violation of the terms of use and can result in disciplinary action."
        }
        numberOfLines={0}
        style={[styles.text, { fontSize: FONT_SIZE.sm }]}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "column"
  },
  subContainer: {
    flexDirection: "row",
    flex: 1
  },
  uploadButton: {
    height: 44,
    width: "82%",
    marginHorizontal: SPACE.md
  },
  text: {
    paddingVertical: SPACE.xl
  }
});
