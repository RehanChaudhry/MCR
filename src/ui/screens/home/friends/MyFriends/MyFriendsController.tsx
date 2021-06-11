import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import RelationModel from "models/RelationModel";
import React, { FC, useCallback, useContext } from "react";
import { AppDataContext } from "ui/screens/home/friends/AppDataProvider";
import { FriendsRootStackParamList } from "routes/FriendsRootStack";
import { AppLog } from "utils/Util";
import { ConnectRequestType } from "../connect_requests/ConnectRequestsController";
import MyFriendsView from "./MyFriendsView";
import EScreen from "models/enums/EScreen";
import useFetchRelations from "../useFetchRelations";
import RelationFilterType from "models/enums/RelationFilterType";

type Props = {};
type FriendsNavigationProp = StackNavigationProp<
  FriendsRootStackParamList,
  "ConnectRequests"
>;

const MyFriendsController: FC<Props> = () => {
  const navigation = useNavigation<FriendsNavigationProp>();
  const { myFriends, setMyFriends } = useContext(AppDataContext);
  const {
    relationsCount: friendsCount,
    pendingRelationsCount: pendingFriendsCount,
    isLoading,
    canLoadMore,
    onEndReached,
    errorMessage,
    onPullToRefresh
  } = useFetchRelations(
    RelationFilterType.FRIENDS,
    myFriends,
    setMyFriends
  );

  const moveToProfileScreen = useCallback(
    (_: RelationModel) => {
      navigation.navigate("Profile", { isFrom: EScreen.MY_FRIENDS });
    },
    [navigation]
  );

  const moveToRoommateRequests = useCallback(
    (_: RelationModel) => {
      navigation.navigate("ConnectRequests", {
        title: "Roommate Requests",
        type: ConnectRequestType.ROOMMATE_REQUESTS
      });
    },
    [navigation]
  );

  const onPressReceivedFriendRequests = useCallback(() => {
    navigation.navigate("ConnectRequests", {
      title: "Friend Requests",
      type: ConnectRequestType.FRIEND_REQUESTS
    });
  }, [navigation]);

  return (
    <MyFriendsView
      friendsCount={friendsCount}
      pendingFriendsCount={pendingFriendsCount}
      data={myFriends}
      isLoading={isLoading}
      canLoadMore={canLoadMore}
      error={errorMessage}
      onEndReached={onEndReached}
      onPullToRefresh={onPullToRefresh}
      onPressChat={(item: RelationModel) => {
        AppLog.log("onPressChat: ", item);
      }}
      onPressReceivedFriendRequests={onPressReceivedFriendRequests}
      moveToProfileScreen={moveToProfileScreen}
      moveToRoommateRequests={moveToRoommateRequests}
    />
  );
};

export default MyFriendsController;
