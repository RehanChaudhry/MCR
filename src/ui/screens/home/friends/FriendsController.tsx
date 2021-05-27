import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { usePreferredTheme } from "hooks";
import RelationModel from "models/RelationModel";
import React, { FC, MutableRefObject, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FriendsStackParamList } from "routes/FriendsBottomBar";
import { FriendsRoutes } from "routes/FriendsRoutes";
import BottomBreadCrumbs, {
  Item
} from "ui/components/templates/bottom_bread_crumbs/BottomBreadCrumbs";

type FriendsNavigationProp = BottomTabNavigationProp<FriendsStackParamList>;

type Props = {};

type MyFriendsContextType = {
  myFriends?: RelationModel[];
  setMyFriends?: (myFriends: RelationModel[] | undefined) => void;
  onResetMyFriends: MutableRefObject<(() => void) | undefined>;
  resetMyFriends?: () => void;
};

export const MyFriendsContext = React.createContext<MyFriendsContextType>(
  // @ts-ignore
  {}
);

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

  const [myFriends, setMyFriends] = useState<RelationModel[]>();
  const onResetMyFriends = useRef<(() => void) | undefined>();

  return (
    <View style={styles.container}>
      <MyFriendsContext.Provider
        value={{
          myFriends: myFriends,
          setMyFriends: setMyFriends,
          onResetMyFriends: onResetMyFriends,
          resetMyFriends: () => {
            onResetMyFriends?.current?.();
          }
        }}>
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
      </MyFriendsContext.Provider>
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
