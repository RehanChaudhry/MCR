import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SPACE } from "config";
import AboutMe from "ui/components/templates/about_me/AboutMe";
import Interests from "ui/components/templates/Interest";
import ViewProfileDemoGraphics from "ui/components/templates/ViewProfileDemoGraphics";
import EducationalInformation from "ui/components/templates/EducationalInformation";
import MyRoommates from "../../../../components/templates/my_roommates/MyRoommates";

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
