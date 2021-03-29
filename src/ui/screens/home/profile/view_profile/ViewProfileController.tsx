import React, { FC } from "react";
import { ViewProfileView } from "ui/screens/home/profile/view_profile/ViewProfileView";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "routes/ProfileBottomBar";
import { useNavigation } from "@react-navigation/native";
import Hamburger from "../../../../components/molecules/hamburger/Hamburger";
import { HeaderTitle } from "../../../../components/molecules/header_title/HeaderTitle";

type Props = {};
type ProfileNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "ViewProfile"
>;

const ViewProfileController: FC<Props> = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  navigation.setOptions({
    headerLeft: () => <Hamburger />,
    headerTitleAlign: "center",
    headerTitle: () => <HeaderTitle text="My Profile" />
  });
  return <ViewProfileView />;
};

export default ViewProfileController;
