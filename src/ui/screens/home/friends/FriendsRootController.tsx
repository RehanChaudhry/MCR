import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useAuth, usePreferredTheme } from "hooks";
import React, { FC } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FriendsStackParamList } from "routes/FriendsBottomBar";
import { FriendsRoutes } from "routes/FriendsRoutes";
import BottomBreadCrumbs, {
  Item
} from "ui/components/templates/bottom_bread_crumbs/BottomBreadCrumbs";
import { AppLog } from "utils/Util";

type FriendsNavigationProp = BottomTabNavigationProp<FriendsStackParamList>;

type Props = {};

const FriendsRootController: FC<Props> = () => {
  const navigation = useNavigation<FriendsNavigationProp>();
  const { user } = useAuth();
  const isAgreementId = user?.profile?.agreementId !== null;

  const [breadCrumbsItems, setBreadCrumbsItems] = useState(() =>
    createItems(navigation, isAgreementId)
  );

  useEffect(() => {
    AppLog.logForcefully(() => "Friends controller: " + isAgreementId);
    setBreadCrumbsItems(createItems(navigation, isAgreementId));
  }, [isAgreementId, navigation]);

  const theme = usePreferredTheme();
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <FriendsRoutes />

      <BottomBreadCrumbs data={breadCrumbsItems} />

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

export default FriendsRootController;

function createItems(
  navigation: FriendsNavigationProp,
  isAgreementId: boolean
): Item[] {
  return [
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
      isDisable: !isAgreementId,
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
}
