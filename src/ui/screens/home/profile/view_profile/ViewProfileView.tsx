import React from "react";
import { ScrollView, View } from "react-native";
import AboutMe from "ui/components/templates/about_me/AboutMe";
import InterestsTagsList from "ui/components/templates/InterestsTagsList";
import ViewProfileDemoGraphics from "ui/components/templates/ViewProfileDemoGraphics";
import EducationalInformation from "ui/components/templates/EducationalInformation";
import MyRoommates from "ui/components/templates/my_roommates/MyRoommates";
import Screen from "ui/components/atoms/Screen";
//import { useAuth } from "hooks";

type Props = {
  openRoommateAgreementScreen: () => void;
};

export const ViewProfileView: React.FC<Props> = ({
  openRoommateAgreementScreen
}) => {
  //const { user } = useAuth();
  return (
    <Screen shouldAddBottomInset={false}>
      <ScrollView>
        <View>
          <AboutMe />
          <ViewProfileDemoGraphics />
          <InterestsTagsList />
          <EducationalInformation />
          <MyRoommates openAgreementScreen={openRoommateAgreementScreen} />
        </View>
      </ScrollView>
    </Screen>
  );
};
