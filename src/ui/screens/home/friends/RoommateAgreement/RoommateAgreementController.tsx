import React, { FC } from "react";
import RoommateAgreementView from "ui/screens/home/friends/RoommateAgreement/RoommateAgreementView";
import { StackNavigationProp } from "@react-navigation/stack";
import { RoommateAgreementStackParamList } from "routes/FriendsStack";
import { useNavigation } from "@react-navigation/native";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import { AppLog } from "utils/Util";
import InfoCircle from "assets/images/info_circle.svg";
import { usePreferredTheme } from "hooks";
import { FriendsRootStackParamList } from "routes/FriendsRootStack";

type Props = {};

type RoommateAgreementNavigationProp = StackNavigationProp<
  RoommateAgreementStackParamList,
  "RoommateAgreement"
>;

type FriendsNavigationProp = StackNavigationProp<
  FriendsRootStackParamList,
  "AgreementDetails"
>;

const RoommateAgreementController: FC<Props> = () => {
  const navigation = useNavigation<RoommateAgreementNavigationProp>();
  const friendsNavigation = useNavigation<FriendsNavigationProp>();
  const { themedColors } = usePreferredTheme();

  navigation.setOptions({
    headerTitleAlign: "center",
    headerTitle: () => <HeaderTitle text="Roommate Agreement" />,
    headerLeft: () => <Hamburger />,
    headerRight: () => (
      <HeaderRightTextWithIcon
        text={"More"}
        onPress={() => friendsNavigation.navigate("AgreementDetails")}
        icon={(color, width, height) => {
          AppLog.log(color);
          return (
            <InfoCircle
              width={width}
              height={height}
              fill={themedColors.primary}
            />
          );
        }}
      />
    )
  });

  return <RoommateAgreementView />;
};

export default RoommateAgreementController;
