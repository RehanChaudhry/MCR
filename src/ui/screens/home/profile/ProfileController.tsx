import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useLayoutEffect } from "react";
import { HomeDrawerParamList } from "routes";
import { ProfileRoutes } from "routes/ProfileRoutes";
import NoHeader from "ui/components/headers/NoHeader";

type HomeNavigationProp = StackNavigationProp<
  HomeDrawerParamList,
  "Profile"
>;

type Props = {};

const ProfileController: FC<Props> = () => {
  const navigation = useNavigation<HomeNavigationProp>();

  // Add no toolbar
  useLayoutEffect(() => {
    navigation.setOptions(NoHeader.create());
  }, [navigation]);

  return <ProfileRoutes />;
};

export default ProfileController;
