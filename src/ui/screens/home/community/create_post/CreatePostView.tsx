import Code from "assets/images/code.svg";
import InfoCircle from "assets/images/info_circle.svg";
import Link from "assets/images/link.svg";
import { COLORS, FONT_SIZE, SPACE } from "config";
import Strings from "config/Strings";
import { usePreferredTheme } from "hooks";
import React, { FC } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LikeCommentButton } from "ui/components/atoms/like_comment_button/LikeCommentButton";
import Screen from "ui/components/atoms/Screen";
import { AnnouncementHeader } from "ui/components/molecules/announcement_header/AnnouncementHeader";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import { AppInputField } from "ui/components/molecules/appinputfield/AppInputField";
import { ImageWithCross } from "ui/components/molecules/image_with_cross/ImageWithCross";
import { SvgProp } from "utils/Util";

type Props = {
  shouldShowProgressBar?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CreatePostView: FC<Props> = (props) => {
  const theme = usePreferredTheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const linkImage: SvgProp = () => {
    return (
      <Link
        width={18}
        height={18}
        fill={theme.themedColors.interface["500"]}
      />
    );
  };
  const embededCodeImage: SvgProp = () => {
    return (
      <Code
        width={18}
        height={18}
        fill={theme.themedColors.interface["500"]}
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
            <AppInputField
              style={[
                styles.inputFieldRow,
                { color: theme.themedColors.label }
              ]}
              placeholder="Start typing your message"
              viewStyle={[
                styles.descriptionView,
                {
                  backgroundColor: theme.themedColors.background,
                  borderColor: theme.themedColors.secondary
                }
              ]}
              multiline={true}
              numberOfLines={6}
              textAlignVertical={"top"}
            />
            <View style={styles.buttonsContainer}>
              <LikeCommentButton
                unSelectedText="Like"
                selectedText="Liked"
                buttonStyle={{ marginRight: SPACE.lg }}
              />
              <LikeCommentButton
                unSelectedText="Like"
                selectedText="Liked"
                buttonStyle={{ marginRight: SPACE.lg }}
              />
              <LikeCommentButton
                unSelectedText="Like"
                selectedText="Liked"
                buttonStyle={{ marginRight: SPACE.lg }}
              />
              <InfoCircle
                width={23}
                height={23}
                fill={theme.themedColors.interface["500"]}
              />
            </View>

            <ImageWithCross imageUrl={dummyProfileImageUrl} />

            {/*<AppInputField*/}
            {/*  style={{ color: theme.themedColors.label }}*/}
            {/*  placeholder="Enter link (https://..)"*/}
            {/*  leftIcon={linkImage}*/}
            {/*  viewStyle={{*/}
            {/*    backgroundColor: theme.themedColors.background,*/}
            {/*    borderColor: theme.themedColors.secondary*/}
            {/*  }}*/}
            {/*  iconStyle={{*/}
            {/*    tintColor: theme.themedColors.interface["500"]*/}
            {/*  }}*/}
            {/*/>*/}

            <AppInputField
              style={{ color: theme.themedColors.label }}
              placeholder="Enter embed code"
              leftIcon={embededCodeImage}
              viewStyle={{
                backgroundColor: theme.themedColors.background,
                borderColor: theme.themedColors.secondary
              }}
              iconStyle={{
                tintColor: theme.themedColors.interface["500"]
              }}
            />

            <View
              style={[
                styles.bottomLine,
                { backgroundColor: theme.themedColors.interface["300"] }
              ]}
            />
            <AppButton
              text="Create Post"
              buttonStyle={{
                backgroundColor: theme.themedColors.primary
              }}
              textStyle={{ color: theme.themedColors.background }}
              fontWeight="bold"
            />
          </View>
        </Screen>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollView: { backgroundColor: COLORS.backgroundColor },

  container: {
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: COLORS.backgroundColor,
    padding: 17,
    flex: 1
  },
  cardView: {
    padding: 17,
    flex: 1,
    marginTop: 25,
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
    marginVertical: SPACE.lg,
    alignItems: "center"
  },
  bottomLine: {
    width: "100%",
    height: 1,
    marginVertical: SPACE.lg
  }
});
