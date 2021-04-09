import React, { FC, useLayoutEffect } from "react";
import RoommateAgreementView from "ui/screens/home/friends/RoommateAgreement/RoommateAgreementView";
import { StackNavigationProp } from "@react-navigation/stack";
import { RoommateAgreementStackParamList } from "routes/FriendsStack";
import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import { AppLog } from "utils/Util";
import InfoCircle from "assets/images/info_circle.svg";
import { usePreferredTheme } from "hooks";
import { FriendsRootStackParamList } from "routes/FriendsRootStack";
import EScreen from "models/enums/EScreen";
import { MatchesStackParamList } from "routes/MatchesStack";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";

type Props = {};

type RoommateAgreementNavigationProp = StackNavigationProp<
  RoommateAgreementStackParamList,
  "RoommateAgreement"
>;

type FriendsNavigationProp = StackNavigationProp<
  FriendsRootStackParamList,
  "AgreementDetails"
>;

type MatchesNavigationProp = StackNavigationProp<
  MatchesStackParamList,
  "AgreementDetails"
>;

type ProfileRootRouteProp = RouteProp<
  MatchesStackParamList,
  "RoommateAgreement"
>;

const RoommateAgreementController: FC<Props> = () => {
  const navigation = useNavigation<RoommateAgreementNavigationProp>();
  const friendsNavigation = useNavigation<FriendsNavigationProp>();
  const matchesNavigation = useNavigation<MatchesNavigationProp>();
  const route = useRoute<ProfileRootRouteProp>();
  const { themedColors } = usePreferredTheme();
  useLayoutEffect(() => {
    if (route.params.isFrom === EScreen.MATCH_INFO) {
      navigation.setOptions({
        headerTitleAlign: "center",
        headerTitle: () => <HeaderTitle text="Roommate Agreement" />,
        headerLeft: () => (
          <HeaderLeftTextWithIcon
            onPress={() => {
              navigation.pop();
            }}
          />
        ),
        headerRight: () => (
          <HeaderRightTextWithIcon
            text={"More"}
            onPress={() => matchesNavigation.navigate("AgreementDetails")}
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
    } else if (route.params.isFrom === EScreen.HOME) {
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
    } else if (route.params.isFrom === EScreen.MY_PROFILE) {
      navigation.setOptions({
        headerTitleAlign: "center",
        headerTitle: () => <HeaderTitle text="Roommate Agreement" />,
        headerLeft: () => (
          <HeaderLeftTextWithIcon
            onPress={() => {
              navigation.pop();
            }}
          />
        ),
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
    }
  }, [
    navigation,
    friendsNavigation,
    matchesNavigation,
    route.params.isFrom,
    themedColors
  ]);

  return <RoommateAgreementView />;
};

export default RoommateAgreementController;
