import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth, usePreventDoubleTap } from "hooks";
import React, { FC, useLayoutEffect } from "react";
import { HomeDrawerParamList } from "routes";
import NoHeader from "ui/components/headers/NoHeader";
import { MatchesView } from "ui/screens/home/matches/MatchesView";

type HomeNavigationProp = StackNavigationProp<
  HomeDrawerParamList,
  "Matches"
>;

type Props = {};

const MatchesController: FC<Props> = () => {
  const auth = useAuth();

  const navigation = useNavigation<HomeNavigationProp>();

  // Add no toolbar
  useLayoutEffect(() => {
    navigation.setOptions(NoHeader.create());
  }, [navigation]);

  const logout = usePreventDoubleTap(() => {
    auth.logOut();
  });

  const userProfile = auth.user?.data?.profile!;
  if (userProfile === undefined) {
    return null;
  }

  return <MatchesView userProfile={userProfile} onLogoutButton={logout} />;
};

export default MatchesController;
