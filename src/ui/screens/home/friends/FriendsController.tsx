import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { usePreferredTheme } from "hooks";
import React, { FC, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
        navigation.jumpTo("MyFriends");
      }
    },
    {
      title: "My Roommates",
      onPress: () => {
        navigation.jumpTo("MyRoommates");
      }
    },
    {
      title: "Roommate Agreement",
      onPress: () => {
        navigation.jumpTo("RoommateAgreement");
      }
    },
    {
      title: "Dismissed or Blocked",
      onPress: () => {
        navigation.jumpTo("DismissedOrBlocked");
      }
    }
  ];

  const itemsRef = useRef(_items);

  const theme = usePreferredTheme();
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <FriendsRoutes />
      <BottomBreadCrumbs data={itemsRef.current} />
      <View
        style={[
          styles.bottomSafeArea,
          {
            backgroundColor: theme.themedColors.background,
            height: safeAreaInsets.bottom
          }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1
  },
  bottomSafeArea: {
    width: "100%"
  }
});

export default FriendsController;
