import React, { FC } from "react";
import { UpdateProfileView } from "ui/screens/home/profile/update_profile/UpdateProfileView";
import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "../../../../../routes/ProfileBottomBar";
import Hamburger from "../../../../components/molecules/hamburger/Hamburger";
import { HeaderTitle } from "../../../../components/molecules/header_title/HeaderTitle";
import { UpdateProfileStackParamList } from "../../../../../routes/ProfileStack";

type Props = {};
type ProfileNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "UpdateProfile"
>;

type UpdateProfileRouteProp = RouteProp<
  UpdateProfileStackParamList,
  "UpdateProfile"
>;

const UpdateProfileController: FC<Props> = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  const route = useRoute<UpdateProfileRouteProp>();

  navigation.setOptions({
    headerLeft: () => <Hamburger />,
    headerTitleAlign: "center",
    headerTitle: () => <HeaderTitle text="Update Profile" />
  });
  return <UpdateProfileView isUpdating={route.params.isUpdating} />;
};

export default UpdateProfileController;
