import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
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
import * as ImagePicker from "react-native-image-picker";
import { ImagePickerResponse } from "react-native-image-picker";
import { AppLog } from "../../../../utils/Util";

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

  const [
    imageResponse,
    setImageResponse
  ] = useState<ImagePickerResponse>();

  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200
      },
      (response) => {
        if (
          response !== null &&
          response !== undefined &&
          response.didCancel !== true
        ) {
          setImageResponse(response);
        }
      }
    );
  };

  AppLog.log("image uri" + imageResponse?.uri);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <>
          {!imageResponse && (
            <AppImageBackground
              icon={profileIcon}
              containerShape={CONTAINER_TYPES.SQUARE}
              // onPress={() => {
              //   Alert.alert("Profile Icon Tapped");
              // }}
            />
          )}

          {imageResponse && (
            <View style={styles.imageViewStyle}>
              <Image
                style={styles.image}
                source={{ uri: imageResponse?.uri }}
              />
            </View>
          )}
        </>
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
            fontSize: FONT_SIZE.xsm
          }}
          shouldShowError={false}
          fontWeight={"semi-bold"}
          onPress={pickImage}
        />
      </View>
      <AppLabel
        text={STRINGS.profile.basicProfile.uploadPhotoDescription}
        numberOfLines={0}
        style={[
          styles.text,
          {
            fontSize: FONT_SIZE._2xsm,
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
  },
  imageViewStyle: {
    height: 50,
    width: 50,
    borderRadius: 8,
    overflow: "hidden"
  },
  image: {
    height: 50,
    width: 50
  }
});
