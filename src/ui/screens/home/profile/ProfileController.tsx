import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "config";
import React, { FC, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { ProfileRoutes } from "routes/ProfileRoutes";
import { ProfileStackParamList } from "routes/ProfileBottomBar";
import BottomBreadCrumbs, {
  Item
} from "ui/components/templates/bottom_bread_crumbs/BottomBreadCrumbs";

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

  return (
    <View style={styles.container}>
      <ProfileRoutes />
      <BottomBreadCrumbs data={itemsRef.current} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: COLORS.backgroundColor,
    flex: 1
  }
});

export default ProfileController;
