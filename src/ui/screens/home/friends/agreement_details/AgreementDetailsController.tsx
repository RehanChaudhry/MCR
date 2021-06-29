import React, { FC, useContext, useLayoutEffect } from "react";
import { AgreementDetailsView } from "ui/screens/home/friends/agreement_details/AgreementDetailsView";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { STRINGS } from "config";
import { useCreateConversation } from "hooks/useCreateConversation";
import { AppDataContext } from "ui/screens/home/friends/AppDataProvider";
import useAuth from "hooks/useAuth";
import { HomeStackParamList } from "routes/HomeStack";
import { RoommateAgreementParty } from "models/api_responses/AgreementAnswerResponseModel";

type Props = {};

type FriendsNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "AgreementDetails"
>;

const AgreementDetailsController: FC<Props> = () => {
  const friendsNavigation = useNavigation<FriendsNavigationProp>();
  const route: any = useRoute();
  const createConversation = useCreateConversation();
  const { setActiveConversations, inActiveConversations } = useContext(
    AppDataContext
  );

  const { user } = useAuth();

  const moveToChatScreen = async (
    roommateAgreementParties: RoommateAgreementParty
  ) => {
    const createConversationResult = await createConversation(
      [user?.profile?.id!!, roommateAgreementParties.userId],
      setActiveConversations,
      inActiveConversations
    );

    if (createConversationResult !== undefined) {
      friendsNavigation.navigate("ChatThread", {
        title: [
          roommateAgreementParties.firstName +
            " " +
            roommateAgreementParties.lastName ?? STRINGS.common.not_found
        ],
        conversation: createConversationResult
      });
    }
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
    />
  );
};

export default AgreementDetailsController;
