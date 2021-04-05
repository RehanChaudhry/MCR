import React from "react";
import { CardView } from "ui/components/atoms/CardView";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { StyleSheet, View } from "react-native";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { SPACE, STRINGS } from "config";
import AppFormField from "ui/components/molecules/app_form/AppFormField";
import YoutubeIcon from "assets/images/youtube_icon.svg";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import { grayShades } from "hooks/theme/ColorPaletteContainer";

export const VideoIntroduction = optimizedMemo(() => {
  const theme = usePreferredTheme();
  const youtubeIcon = () => <YoutubeIcon width={20} height={20} />;

  return (
    <>
      <CardView style={styles.cardStyles}>
        <View style={styles.innerCardStyles}>
          <HeadingWithText
            headingText={STRINGS.profile.videoIntroduction.heading}
            text={STRINGS.profile.videoIntroduction.title}
            headingFontWeight={"semi-bold"}
            headingStyle={[
              styles.headingStyle,
              { color: theme.themedColors.label }
            ]}
            textStyle={[{ color: theme.themedColors.labelSecondary }]}
          />
        </View>
        <View style={[styles.horizontalLine]} />
        <View style={styles.innerCardStyles}>
          <AppFormField
            fieldTestID="youtubeVideoUrl"
            validationLabelTestID={"youtubeVideoUrlValidationLabel"}
            name="youtubeVideoUrl"
            labelProps={{
              text: STRINGS.profile.formTitle.youTubeVideoUrl,
              weight: "semi-bold"
            }}
            fieldInputProps={{
              textContentType: "name",
              keyboardType: "default",
              returnKeyType: "next",
              placeholder: STRINGS.profile.placeHolder.youTubeVideoUrl,
              autoCapitalize: "none",
              placeholderTextColor: theme.themedColors.placeholder,
              style: { color: theme.themedColors.label },
              leftIcon: youtubeIcon,
              viewStyle: [
                styles.textFieldStyle,
                {
                  backgroundColor: theme.themedColors.background,
                  borderColor: theme.themedColors.border
                }
              ]
            }}
          />
        </View>
      </CardView>
    </>
  );
});

const styles = StyleSheet.create({
  cardStyles: {
    marginTop: SPACE.lg,
    marginHorizontal: SPACE.lg
  },
  innerCardStyles: {
    padding: SPACE.lg
  },
  headingStyle: {
    // paddingHorizontal: SPACE.sm,
    paddingBottom: SPACE.sm
  },
  horizontalLine: {
    height: 0.5,
    backgroundColor: grayShades.warmGray["300"]
  },
  viewFieldStyle: {
    borderWidth: 1
  },
  textFieldStyle: {
    borderWidth: 1
  },
  spacer: {
    paddingBottom: SPACE.lg
  }
});
