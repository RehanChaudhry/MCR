import React, { FC } from "react";
import { ViewProfileView } from "ui/screens/home/profile/view_profile/ViewProfileView";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "routes/ProfileBottomBar";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { HomeDrawerParamList } from "routes";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import Menu from "assets/images/menu.svg";
import { SPACE } from "config";

type Props = {};
type ProfileNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "ViewProfile"
>;

type ProfileNavigationDrawerProp = DrawerNavigationProp<
  HomeDrawerParamList,
  "Profile"
>;

const ViewProfileController: FC<Props> = () => {
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
  return <ViewProfileView />;
};

export default ViewProfileController;
