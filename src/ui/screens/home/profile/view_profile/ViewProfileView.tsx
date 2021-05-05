import React from "react";
import { ScrollView, View } from "react-native";
import AboutMe from "ui/components/templates/about_me/AboutMe";
import InterestsTagsList from "ui/components/templates/InterestsTagsList";
import ViewProfileDemoGraphics from "ui/components/templates/ViewProfileDemoGraphics";
import EducationalInformation from "ui/components/templates/EducationalInformation";
import MyRoommates from "ui/components/templates/my_roommates/MyRoommates";
import Screen from "ui/components/atoms/Screen";
import { UserModel } from "models/api_responses/UserModel";
//import { useAuth } from "hooks";

type Props = {
  openRoommateAgreementScreen: () => void;
  user: UserModel | undefined;
};

export const ViewProfileView: React.FC<Props> = ({
  openRoommateAgreementScreen,
  user
}) => {
  //const { user } = useAuth();
  return (
    <Screen shouldAddBottomInset={false}>
      <ScrollView>
        <View>
          <AboutMe section={user?.profile?.sections[0]} />
          <ViewProfileDemoGraphics />
          <InterestsTagsList />
          <EducationalInformation />
          <MyRoommates openAgreementScreen={openRoommateAgreementScreen} />
        </View>
      </ScrollView>
    </Screen>
  );
};
