import React from "react";
import { ScrollView, View } from "react-native";
import AboutMe from "ui/components/templates/about_me/AboutMe";
import InterestsTagsList from "ui/components/templates/InterestsTagsList";
import ViewProfileDemoGraphics from "ui/components/templates/ViewProfileDemoGraphics";
import EducationalInformation from "ui/components/templates/EducationalInformation";
import MyRoommates from "ui/components/templates/my_roommates/MyRoommates";
import Screen from "ui/components/atoms/Screen";
import { ProfileData } from "models/api_responses/UpdateProfileUiResponseModel";
import { DynamicCardView } from "ui/components/templates/dynamic_card_view/DynamicCardView";
import AppForm from "ui/components/molecules/app_form/AppForm";

type Props = {
  openRoommateAgreementScreen: () => void;
  viewProfileUiData: ProfileData | undefined;
};

export const ViewProfileView: React.FC<Props> = ({
  openRoommateAgreementScreen,
  viewProfileUiData
}) => {
  //const { user } = useAuth();
  return (
    <Screen shouldAddBottomInset={false}>
      <ScrollView>
        <View>
          <DynamicCardView sectionsData={viewProfileUiData?.sections} />
          {/*<AboutMe />*/}
          {/*<ViewProfileDemoGraphics />*/}
          {/*<InterestsTagsList />*/}
          {/*<EducationalInformation />*/}
          <MyRoommates openAgreementScreen={openRoommateAgreementScreen} />
        </View>
      </ScrollView>
    </Screen>
  );
};
