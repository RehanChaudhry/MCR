import React, { FC } from "react";
import { UpdateProfileView } from "ui/screens/home/profile/update_profile/UpdateProfileView";
import { Pressable } from "react-native";
import Menu from "assets/images/menu.svg";
import { SPACE } from "../../../../../config";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { HomeDrawerParamList } from "../../../../../routes";
import usePreferredTheme from "../../../../../hooks/theme/usePreferredTheme";
import { ProfileStackParamList } from "../../../../../routes/ProfileBottomBar";

type Props = {};
type ProfileNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "UpdateProfile"
>;

type ProfileNavigationDrawerProp = DrawerNavigationProp<
  HomeDrawerParamList,
  "Profile"
>;

const UpdateProfileController: FC<Props> = () => {
  const theme = usePreferredTheme();
  const navigation = useNavigation<ProfileNavigationProp>();
  const navigationDrawer = useNavigation<ProfileNavigationDrawerProp>();
  navigation.setOptions({
    headerLeft: () => (
      <Pressable
        onPress={() => {
          navigationDrawer.openDrawer();
        }}>
        <Menu width={23} height={23} fill={theme.themedColors.primary} />
      </Pressable>
    ),
    headerLeftContainerStyle: {
      padding: SPACE.md
    },
    headerTitleAlign: "center"
  });
  return <UpdateProfileView />;
};

export default UpdateProfileController;
