import React, { FC } from "react";
import { UpdateProfileView } from "ui/screens/home/profile/update_profile/UpdateProfileView";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "../../../../../routes/ProfileBottomBar";
import Hamburger from "../../../../components/molecules/hamburger/Hamburger";
import { HeaderTitle } from "../../../../components/molecules/header_title/HeaderTitle";

type Props = {};
type ProfileNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "UpdateProfile"
>;

const UpdateProfileController: FC<Props> = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  navigation.setOptions({
    headerLeft: () => <Hamburger />,
    headerTitleAlign: "center",
    headerTitle: () => <HeaderTitle text="Update Profile" />
  });
  return <UpdateProfileView />;
};

export default UpdateProfileController;
