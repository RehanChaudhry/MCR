import React from "react";
import { ScrollView, View } from "react-native";
import AboutMe from "ui/components/templates/about_me/AboutMe";
import InterestsTagsList from "ui/components/templates/InterestsTagsList";
import ViewProfileDemoGraphics from "ui/components/templates/ViewProfileDemoGraphics";
import EducationalInformation from "ui/components/templates/EducationalInformation";
import MyRoommates from "ui/components/templates/my_roommates/MyRoommates";
import Screen from "ui/components/atoms/Screen";

type Props = {};

export const ViewProfileView: React.FC<Props> = () => {
  return (
    <Screen shouldAddBottomInset={false}>
      <ScrollView>
        <View>
          <AboutMe />
          <ViewProfileDemoGraphics />
          <InterestsTagsList />
          <EducationalInformation />
          <MyRoommates />
        </View>
      </ScrollView>
    </Screen>
  );
};
