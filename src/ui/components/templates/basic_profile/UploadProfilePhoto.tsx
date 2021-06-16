import React, { useEffect, useState } from "react";
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
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import { AppLog } from "utils/Util";
import { FONT_SIZE_LINE_HEIGHT } from "config/Dimens";
import { useImageUpload } from "hooks/useImageUpload";
import MyImagePickerResponse from "models/api_responses/MyImagePickerResponse";
import SimpleToast from "react-native-simple-toast";
import { FormikValues, useFormikContext } from "formik";

type UpdateProfilePhotoProp = {
  name: string;
  shouldNotOptimize?: boolean;
};

export const UploadProfilePhoto = optimizedMemo<UpdateProfilePhotoProp>(
  ({ name }) => {
    const theme = usePreferredTheme();
    const imageGalleryResult = useImageUpload();

    const {
      setFieldValue,
      initialValues
    } = useFormikContext<FormikValues>();

    useEffect(() => {
      if (initialValues[name] !== undefined) {
        setFieldValue(name, {
          fileURL: JSON.parse(initialValues[name]).fileURL,
          originalName: JSON.parse(initialValues[name]).originalName
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues]);

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
    ] = useState<MyImagePickerResponse>();

    const pickImage = () => {
      imageGalleryResult((response: MyImagePickerResponse) => {
        if (response !== null && response !== undefined) {
          if (response.inProgress) {
            setImageResponse(response);
            setFieldValue(name, {
              fileURL: response.s3Url,
              originalName: response.fileName
            });
          } else if (response.isFailed) {
            SimpleToast.show("Image upload failed : " + response.fileName);
            setImageResponse(undefined);
            setFieldValue(name, {});
          }
        }
      });
    };
    initialValues[name] !== undefined &&
      AppLog.log(
        () =>
          "upload Profile Photo : " + JSON.stringify(initialValues[name])
      );
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          {!imageResponse && !initialValues[name] && (
            <AppImageBackground
              icon={profileIcon}
              containerShape={CONTAINER_TYPES.SQUARE}
              // onPress={() => {
              //   Alert.alert("Profile Icon Tapped");
              // }}
            />
          )}
          <>
            <View style={styles.imageViewStyle}>
              {(imageResponse !== undefined || initialValues[name]) && (
                <Image
                  style={styles.image}
                  source={{
                    uri:
                      imageResponse?.uri !== undefined
                        ? imageResponse.uri
                        : JSON.parse(initialValues[name]).fileURL
                  }}
                />
              )}
            </View>
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
              fontSize: FONT_SIZE.md
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
              fontSize: FONT_SIZE.md,
              color: theme.themedColors.interface["700"],
              lineHeight: FONT_SIZE_LINE_HEIGHT.sm
            }
          ]}
        />
      </View>
    );
  }
);

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
    marginStart: SPACE.md,
    flex: 1
  },
  text: {
    paddingTop: SPACE.lg
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
