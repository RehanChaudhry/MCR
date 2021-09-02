import React, { FC, useContext, useLayoutEffect } from "react";
import { AgreementDetailsView } from "ui/screens/home/friends/agreement_details/AgreementDetailsView";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppDataContext } from "ui/screens/home/friends/AppDataProvider";
import { HomeStackParamList } from "routes/HomeStack";
import { RoommateAgreementParty } from "models/api_responses/AgreementAnswerResponseModel";
import useCreateConversation from "hooks/useCreateConversation";
import { User } from "models/User";

type Props = {};

type FriendsNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "AgreementDetails"
>;

const AgreementDetailsController: FC<Props> = () => {
  const friendsNavigation = useNavigation<FriendsNavigationProp>();
  const route: any = useRoute();
  const { createConversationAndNavigate } = useCreateConversation();

  const { setActiveConversations, setInActiveConversations } = useContext(
    AppDataContext
  );

  const moveToChatScreen = async (
    roommateAgreementParties: RoommateAgreementParty
  ) => {
    createConversationAndNavigate(
      {
        id: roommateAgreementParties.userId,
        firstName: roommateAgreementParties.firstName,
        lastName: roommateAgreementParties.lastName
      } as User,
      setActiveConversations,
      setInActiveConversations
    );
  };

  useLayoutEffect(() =>
    friendsNavigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <HeaderLeftTextWithIcon
          onPress={() => friendsNavigation.goBack()}
        />
      ),

      headerTitleAlign: "center",
      headerTitle: () => <HeaderTitle text="Agreement Details" />
    })
  );

  return (
    <AgreementDetailsView
      agreementDetailsData={route.params.agreementData}
      moveToChatScreen={moveToChatScreen}
      viewShotRef={route.params.viewShotRef}
    />
  );
};

export default AgreementDetailsController;
