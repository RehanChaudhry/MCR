import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { FC, useRef } from "react";
import { StyleSheet } from "react-native";
import { ProfileRoutes } from "routes/ProfileRoutes";
import { ProfileStackParamList } from "routes/ProfileBottomBar";
import BottomBreadCrumbs, {
  Item
} from "ui/components/templates/bottom_bread_crumbs/BottomBreadCrumbs";
import Screen from "ui/components/atoms/Screen";
import { usePreferredTheme } from "hooks";

type ProfileNavigationProp = BottomTabNavigationProp<ProfileStackParamList>;

type Props = {};

const ProfileController: FC<Props> = () => {
  const navigation = useNavigation<ProfileNavigationProp>();

  const _items: Item[] = [
    {
      title: "View Profile",
      onPress: () => {
        navigation.navigate("ViewProfile");
      }
    },
    {
      title: "Update Profile",
      onPress: () => {
        navigation.navigate("UpdateProfile");
      }
    },
    {
      title: "Update Questionnaire",
      onPress: () => {
        navigation.navigate("UpdateQuestionnaire");
      }
    }
  ];

  const itemsRef = useRef(_items);

  const theme = usePreferredTheme();

  return (
    <Screen
      style={[
        styles.container,
        { backgroundColor: theme.themedColors.backgroundSecondary }
      ]}>
      <ProfileRoutes />
      <BottomBreadCrumbs data={itemsRef.current} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1
  }
});

export default ProfileController;
