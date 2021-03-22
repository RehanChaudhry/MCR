import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "config";
import React, { FC, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { FriendsStackParamList } from "routes/FriendsBottomBar";
import { FriendsRoutes } from "routes/FriendsRoutes";
import BottomBreadCrumbs, {
  Item
} from "ui/components/templates/bottom_bread_crumbs/BottomBreadCrumbs";

type FriendsNavigationProp = BottomTabNavigationProp<FriendsStackParamList>;

type Props = {};

const FriendsController: FC<Props> = () => {
  const navigation = useNavigation<FriendsNavigationProp>();

  const _items: Item[] = [
    {
      title: "My Friends",
      onPress: () => {
        navigation.navigate("MyFriends");
      }
    },
    {
      title: "My Roommates",
      onPress: () => {
        navigation.navigate("MyRoommates");
      }
    },
    {
      title: "Roommate Agreement",
      onPress: () => {
        navigation.navigate("RoommateAgreement");
      }
    },
    {
      title: "Dismissed or Blocked",
      onPress: () => {
        navigation.navigate("DismissedOrBlocked");
      }
    }
  ];

  const itemsRef = useRef(_items);

  return (
    <View style={styles.container}>
      <FriendsRoutes />
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

export default FriendsController;
