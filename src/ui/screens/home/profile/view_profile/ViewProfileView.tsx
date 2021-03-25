import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SPACE } from "config";
import AboutMe from "ui/components/profile/view_profile/about_me/AboutMe";
import Interests from "ui/components/profile/view_profile/Interest";
import ViewProfileDemoGraphics from "ui/components/profile/view_profile/ViewProfileDemoGraphics";
import EducationalInformation from "ui/components/profile/view_profile/EducationalInformation";
import MyRoommates from "../../../../components/profile/view_profile/my_roommates/MyRoommates";

type Props = {};

export const ViewProfileView: React.FC<Props> = () => {
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <AboutMe />
        <ViewProfileDemoGraphics />
        <Interests />
        <EducationalInformation />
        <MyRoommates />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: SPACE.lg
  }
});
