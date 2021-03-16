import React from "react";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { StyleSheet, View } from "react-native";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { CardView } from "../atoms/CardView";
import Screen from "../atoms/Screen";
import { UploadProfilePhoto } from "./UploadProfilePhoto";
import { COLORS } from "config";
//import * as Yup from "yup";

//form validations
// const validationSchema = Yup.object().shape({
//   firstName: Yup.string().required("Enter your first name"),
//   lastName: Yup.string().required("Enter your last name"),
//   aboutMe: Yup.string().required("Enter your profile description"),
//   facebookProfile: Yup.string().required("Enter your facebook profile"),
//   twitterProfile: Yup.string().required("Enter your twitter profile"),
//   linkedInProfile: Yup.string().required("Enter your linkedin profile"),
//   instagramProfile: Yup.string().required("Enter your instagram profile"),
//   snapChatProfile: Yup.string().required("Enter your snapchat profile"),
//   tikTokProfile: Yup.string().required("Enter your tiktok profile")
// });

export const BasicProfile = React.memo(() => {
  const theme = usePreferredTheme();
  return (
    <Screen>
      <CardView style={styles.cardStyles}>
        <HeadingWithText
          headingText={"Basic Profile"}
          text={
            "This information will be displayed publicly so be careful what you share."
          }
          headingStyle={[
            styles.headingStyle,
            { color: theme.themedColors.primaryLabelColor }
          ]}
          textStyle={[
            styles.textStyle,
            { color: theme.themedColors.primaryLabelColor }
          ]}
        />
        <View style={styles.horizontalLine} />
        <UploadProfilePhoto />
      </CardView>
    </Screen>
  );
});

const styles = StyleSheet.create({
  headingStyle: {
    paddingHorizontal: 8,
    paddingVertical: 12
  },
  textStyle: {
    paddingHorizontal: 8
  },
  horizontalLine: {
    backgroundColor: COLORS.grey,
    height: 0.3,
    marginVertical: 16
  },
  cardStyles: {
    margin: 12,
    padding: 8
  }
});
