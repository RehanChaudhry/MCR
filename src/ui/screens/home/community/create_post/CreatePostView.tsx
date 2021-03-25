import Code from "assets/images/code.svg";
import InfoCircle from "assets/images/info_circle.svg";
import Link from "assets/images/link.svg";
import PlusCircle from "assets/images/plus_circle.svg";
import { COLORS, FONT_SIZE, SPACE, STRINGS } from "config";
import Strings from "config/Strings";
import { FormikValues } from "formik";
import { usePreferredTheme } from "hooks";
import React, { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "react-native-image-picker";
import { ImagePickerResponse } from "react-native-image-picker";
import SimpleToast from "react-native-simple-toast";
import { EmbedButton } from "ui/components/atoms/compact_buttons/EmbedButton";
import { LinkButton } from "ui/components/atoms/compact_buttons/LinkButton";
import { PhotosButton } from "ui/components/atoms/compact_buttons/PhotosButton";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import Screen from "ui/components/atoms/Screen";
import { AnnouncementHeader } from "ui/components/molecules/announcement_header/AnnouncementHeader";
import AppForm from "ui/components/molecules/app_form/AppForm";
import AppFormField from "ui/components/molecules/app_form/AppFormField";
import AppFormFormSubmit from "ui/components/molecules/app_form/AppFormSubmit";
import { ImageWithCross } from "ui/components/molecules/image_with_cross/ImageWithCross";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { AppLog, SvgProp } from "utils/Util";
import * as Yup from "yup";

type Props = {
  shouldShowProgressBar?: boolean;
  createPost?: (values: CreatePostFormValues) => void;
};

const validationSchema = Yup.object().shape({
  message: Yup.string().required(Strings.createPost.requiredField.message)
});

type CreatePostFormValues = {
  message: string;
  link?: string;
  embed?: string;
  images?: string[];
};

let initialValues: FormikValues = {
  message: "",
  link: "",
  embed: "",
  images: []
};

export enum POST_TYPES {
  PHOTOS = "photos",
  LINK = "link",
  EMBED = "embed",
  NONE = "none"
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CreatePostView = React.memo<Props>((props) => {
  const theme = usePreferredTheme();
  const [images, setImages] = useState<ImagePickerResponse[]>([]);
  const [postType, setPostType] = useState<POST_TYPES>(POST_TYPES.NONE);

  const onSubmit = (_value: FormikValues) => {
    initialValues = _value;
    AppLog.log("form values" + initialValues);
  };

  const linkIcon = () => {
    return (
      <Link
        width={15}
        height={15}
        fill={theme.themedColors.interface["500"]}
      />
    );
  };
  const embedIcon = () => {
    return (
      <Code
        width={15}
        height={15}
        fill={theme.themedColors.interface["500"]}
      />
    );
  };
  const listItem = useCallback(
    ({ item }: { item: ImagePickerResponse }) => (
      <ImageWithCross
        imageResponse={item}
        onImageRemoved={(imageResponse) => {
          AppLog.logForcefully(JSON.stringify(images));
          AppLog.logForcefully(
            "images length when item remove" + images.length
          );
          setImages((prevState) => {
            return [
              ...prevState.filter((filteredImage) => {
                return imageResponse.uri !== filteredImage.uri;
              })
            ];
          });
        }}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const openImageGallery = () => {
    if (images.length < 5) {
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
            AppLog.logForcefully("response" + JSON.stringify(response));
            setImages((prevState) => {
              return [
                ...(prevState === undefined ? [] : prevState),
                response
              ];
            });
            AppLog.logForcefully("images length" + images.length);
          }
        }
      );
    } else {
      SimpleToast.show("you cannot enter more than 5 images");
    }
  };

  const plusCircleIcon: SvgProp = () => {
    return (
      <PlusCircle
        width={25}
        height={25}
        fill={theme.themedColors.primary}
      />
    );
  };
  const plusCircleImage = () => {
    return (
      <AppImageBackground
        containerShape={CONTAINER_TYPES.SQUARE}
        icon={plusCircleIcon}
        onPress={openImageGallery}
        containerStyle={[
          {
            backgroundColor: theme.themedColors.interface["200"]
          },
          styles.list
        ]}
      />
    );
  };

  const dummyProfileImageUrl =
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboardAvoidingView}>
      <ScrollView
        style={styles.scrollView}
        keyboardShouldPersistTaps={"handled"}>
        <Screen style={styles.container}>
          <View style={styles.cardView}>
            <AnnouncementHeader
              title={Strings.whats_new}
              leftImageUrl={dummyProfileImageUrl}
              shouldHideSubTitle={true}
              shouldHideBottomSeparator={true}
              titleFontWeight="bold"
              titleStyle={{ fontSize: FONT_SIZE.xl }}
            />

            <AppForm
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}>
              <AppFormField
                fieldTestID="message"
                validationLabelTestID={"messageValidationLabel"}
                name="message"
                fieldInputProps={{
                  multiline: true,
                  numberOfLines: 6,
                  textAlignVertical: "top",
                  keyboardType: "default",
                  returnKeyType: "next",
                  placeholder:
                    STRINGS.createPost.placeholder.startTypingYourMessage,
                  autoCapitalize: "none",
                  placeholderTextColor: theme.themedColors.placeholder,
                  style: [
                    { color: theme.themedColors.label },
                    styles.inputFieldRow
                  ],
                  viewStyle: [
                    styles.descriptionView,
                    {
                      backgroundColor: theme.themedColors.background,
                      borderColor: theme.themedColors.secondary
                    }
                  ]
                }}
              />
              <View style={styles.buttonsContainer}>
                <PhotosButton
                  isSelected={postType === POST_TYPES.PHOTOS}
                  onPress={() => {
                    setPostType(POST_TYPES.PHOTOS);
                    AppLog.logForcefully("postType: " + postType);
                    openImageGallery();
                  }}
                />
                <LinkButton
                  isSelected={postType === POST_TYPES.LINK}
                  onPress={() => {
                    setImages([]);
                    setPostType(POST_TYPES.LINK);
                    AppLog.logForcefully("postType: " + postType);
                  }}
                />
                <EmbedButton
                  isSelected={postType === POST_TYPES.EMBED}
                  onPress={() => {
                    setImages([]);
                    setPostType(POST_TYPES.EMBED);
                    AppLog.logForcefully("postType: " + postType);
                  }}
                />
                <InfoCircle
                  width={23}
                  height={23}
                  fill={theme.themedColors.interface["500"]}
                />
              </View>

              {postType !== POST_TYPES.NONE && (
                <>
                  {postType === POST_TYPES.PHOTOS && images.length > 0 && (
                    <View style={styles.imagesListContainer}>
                      <FlatListWithPb
                        shouldShowProgressBar={false}
                        data={images}
                        style={styles.list}
                        renderItem={listItem}
                        horizontal={true}
                      />
                      {plusCircleImage()}
                    </View>
                  )}

                  {postType === POST_TYPES.LINK && (
                    <AppFormField
                      fieldTestID="link"
                      validationLabelTestID={"linkValidationLabel"}
                      name="link"
                      fieldInputProps={{
                        leftIcon: linkIcon,
                        keyboardType: "default",
                        returnKeyType: "next",
                        placeholder: STRINGS.createPost.placeholder.link,
                        autoCapitalize: "none",
                        placeholderTextColor:
                          theme.themedColors.placeholder,
                        style: [{ color: theme.themedColors.label }],
                        viewStyle: [
                          styles.list,
                          {
                            backgroundColor: theme.themedColors.background,
                            borderColor: theme.themedColors.border
                          }
                        ]
                      }}
                    />
                  )}

                  {postType === POST_TYPES.EMBED && (
                    <AppFormField
                      fieldTestID="embed"
                      validationLabelTestID={"embedValidationLabel"}
                      name="embed"
                      fieldInputProps={{
                        leftIcon: embedIcon,
                        keyboardType: "default",
                        returnKeyType: "next",
                        placeholder: STRINGS.createPost.placeholder.embed,
                        autoCapitalize: "none",
                        placeholderTextColor:
                          theme.themedColors.placeholder,
                        style: [{ color: theme.themedColors.label }],
                        viewStyle: [
                          styles.list,
                          {
                            backgroundColor: theme.themedColors.background,
                            borderColor: theme.themedColors.border
                          }
                        ]
                      }}
                    />
                  )}
                </>
              )}

              <View
                style={[
                  styles.bottomLine,
                  { backgroundColor: theme.themedColors.interface["300"] }
                ]}
              />
              <AppFormFormSubmit
                text="Create Post"
                buttonStyle={{
                  backgroundColor: theme.themedColors.primary
                }}
                textStyle={{ color: theme.themedColors.background }}
                fontWeight="bold"
              />
            </AppForm>
          </View>
        </Screen>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  scrollView: { backgroundColor: COLORS.backgroundColor },

  container: {
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: COLORS.backgroundColor,
    flex: 1
  },
  cardView: {
    padding: SPACE.lg,
    flex: 1,
    margin: SPACE.lg,
    backgroundColor: COLORS.white,
    overflow: "hidden",
    paddingVertical: SPACE.lg,

    // border
    borderStyle: "solid",
    borderColor: COLORS.white,
    borderRadius: 10,

    //shadow
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  keyboardAvoidingView: {
    width: "100%",
    height: "100%"
  },
  inputFieldRow: {
    flex: 1,
    marginTop: SPACE.lg
  },
  descriptionView: {
    height: 100
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: SPACE.lg,
    alignItems: "center",
    justifyContent: "space-between"
  },
  bottomLine: {
    width: "100%",
    height: 1,
    marginVertical: SPACE.lg
  },
  photosLinkEmbedButton: {
    marginRight: SPACE.md
  },
  list: {
    marginTop: SPACE.lg
    // flexGrow: 1,
    // flexBasis: 0
  },
  imagesListContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
});
