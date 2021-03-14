import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth, usePreventDoubleTap } from "hooks";
import React, { FC, useLayoutEffect } from "react";
import { HomeStackParamList } from "routes";
import NoHeader from "ui/components/headers/NoHeader";
import { HomeView } from "ui/screens/home/HomeView";

type HomeNavigationProp = StackNavigationProp<HomeStackParamList, "Home">;

type Props = {};

const HomeController: FC<Props> = () => {
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

  return <HomeView userProfile={userProfile} onLogoutButton={logout} />;
};

export default HomeController;
