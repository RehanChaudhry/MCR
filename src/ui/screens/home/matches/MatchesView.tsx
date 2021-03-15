import { COLORS, FONT_SIZE } from "config";
import { Profile } from "models/api_responses/SignInApiResponseModel";
import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import Screen from "ui/components/atoms/Screen";

type Props = {
  userProfile: Profile;
  onLogoutButton: () => void;
};

export const MatchesView = React.memo<Props>(() => {
  return (
    <ScrollView style={styles.scrollView}>
      <Screen style={styles.container}>
        <AppLabel text="Matches" />
      </Screen>
    </ScrollView>
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

  waterMarkId: {
    fontSize: FONT_SIZE._2xl,
    color: COLORS.textColor2,
    alignSelf: "center",
    marginTop: 20
  },

  waterMarkIdInstructions: {
    width: "80%",
    fontSize: FONT_SIZE.md,
    color: COLORS.textColor1,
    alignSelf: "center",
    textAlign: "center",
    marginTop: 15
  },

  qrCodeContainer: {
    width: "70%",
    aspectRatio: 1,
    padding: 20,
    marginTop: 15,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: COLORS.white,

    // border
    borderStyle: "solid",
    borderColor: COLORS.white,
    borderRadius: 10,

    // shadow
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});
