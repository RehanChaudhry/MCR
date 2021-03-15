import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth, usePreventDoubleTap } from "hooks";
import React, { FC, useLayoutEffect } from "react";
import { HomeDrawerParamList } from "routes";
import NoHeader from "ui/components/headers/NoHeader";
import { CommunityView } from "ui/screens/home/community/CommunityView";

type HomeNavigationProp = StackNavigationProp<
  HomeDrawerParamList,
  "Community"
>;

type Props = {};

const CommunityController: FC<Props> = () => {
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

  return (
    <CommunityView userProfile={userProfile} onLogoutButton={logout} />
  );
};

export default CommunityController;
