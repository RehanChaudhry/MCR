import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  AppButton,
  BUTTON_TYPES
} from "ui/components/molecules/app_button/AppButton";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
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
      if (initialValues[name]) {
        setFieldValue(name, {
          fileURL: JSON.parse(initialValues[name])?.fileURL,
          originalName: JSON.parse(initialValues[name])?.originalName
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues]);

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

    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.imageViewStyle}>
            <Image
              style={styles.image}
              source={
                imageResponse
                  ? { uri: imageResponse.uri }
                  : initialValues[name]
                  ? { uri: JSON.parse(initialValues[name])?.fileURL }
                  : require("assets/images/profile_avatar.png")
              }
            />
          </View>
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
            shouldNotOptimize={true}
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
    alignItems: "center",
    justifyContent: "space-between",
    flexShrink: 1,
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
    height: 45,
    width: 45
  },
  image: {
    height: 45,
    width: 45,
    borderRadius: 7
  }
});
