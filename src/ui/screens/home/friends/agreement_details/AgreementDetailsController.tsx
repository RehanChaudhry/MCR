import React, { FC, useLayoutEffect } from "react";
import { AgreementDetailsView } from "ui/screens/home/friends/agreement_details/AgreementDetailsView";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParams } from "routes/HomeStack";
import { useNavigation, useRoute } from "@react-navigation/native";

type Props = {};

type FriendsNavigationProp = StackNavigationProp<
  HomeStackParams,
  "AgreementDetails"
>;

const AgreementDetailsController: FC<Props> = () => {
  const friendsNavigation = useNavigation<FriendsNavigationProp>();
  const route: any = useRoute();

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
    />
  );
};

export default AgreementDetailsController;
