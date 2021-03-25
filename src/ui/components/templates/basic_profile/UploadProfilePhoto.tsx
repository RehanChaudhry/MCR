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
} from "ui/components/molecules/app_button/AppButton";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import usePreferredTheme from "hooks/theme/usePreferredTheme";

export const UploadProfilePhoto = React.memo(() => {
  const theme = usePreferredTheme();
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
          text={STRINGS.profile.buttonText.uploadProfilePhoto}
          buttonStyle={[
            styles.uploadButton,
            { borderColor: theme.themedColors.interface["700"] }
          ]}
          buttonType={BUTTON_TYPES.BORDER}
          textStyle={{
            color: theme.themedColors.label,
            borderColor: theme.themedColors.interface["700"],
            fontSize: FONT_SIZE.md
          }}
          shouldShowError={false}
          fontWeight={"semi-bold"}
        />
      </View>
      <AppLabel
        text={STRINGS.profile.basicProfile.uploadPhotoDescription}
        numberOfLines={0}
        style={[
          styles.text,
          {
            fontSize: FONT_SIZE.sm,
            color: theme.themedColors.interface["700"]
          }
        ]}
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
