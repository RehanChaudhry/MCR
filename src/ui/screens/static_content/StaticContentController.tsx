import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useLayoutEffect } from "react";
import { ProfileRootStackParamList } from "routes/ProfileRootStack";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { STRINGS } from "config";
import { capitalizeWords } from "utils/Util";
import { StaticContentView } from "ui/screens/static_content/StaticContentView";

type ProfileRootNavigationProp = StackNavigationProp<
  ProfileRootStackParamList,
  "StaticContent"
>;

type ProfileRootRouteProp = RouteProp<
  ProfileRootStackParamList,
  "StaticContent"
>;

type Props = {};

const StaticContentController: FC<Props> = () => {
  const profileRootNavigation = useNavigation<ProfileRootNavigationProp>();
  const profileRootRoute = useRoute<ProfileRootRouteProp>();

  useLayoutEffect(() => {
    profileRootNavigation.setOptions({
      headerLeft: () => (
        <HeaderLeftTextWithIcon
          onPress={() => profileRootNavigation.pop()}
        />
      ),
      headerTitle: () => (
        <HeaderTitle
          text={`${capitalizeWords(
            profileRootRoute.params.staticContent.type
          )} - ${
            profileRootRoute.params.staticContent.title ??
            STRINGS.common.not_found
          }`}
        />
      )
    });
  }, [profileRootNavigation, profileRootRoute]);

  return (
    <StaticContentView
      staticContent={profileRootRoute.params.staticContent}
    />
  );
};

export default StaticContentController;
