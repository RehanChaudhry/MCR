import React, { FC } from "react";
import SettingsView from "./SettingsView";
import { useNavigation } from "@react-navigation/native";
import Hamburger from "../../../components/molecules/hamburger/Hamburger";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeDrawerParamList } from "routes";

type Props = {};
type SettingNavigationProp = StackNavigationProp<
  HomeDrawerParamList,
  "Settings"
>;

const SettingsController: FC<Props> = () => {
  const navigation = useNavigation<SettingNavigationProp>();
  navigation.setOptions({
    headerLeft: () => <Hamburger />,
    headerTitleAlign: "center",
    headerTitle: () => <HeaderTitle text="Settings" />
  });
  return <SettingsView />;
};

export default SettingsController;
