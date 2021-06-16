import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";
import RelationFilterType from "models/enums/RelationFilterType";
import RelationModel from "models/RelationModel";
import React, { FC, useCallback, useContext } from "react";
import { FriendsRootStackParamList } from "routes/FriendsRootStack";
import { AppLog } from "utils/Util";
import { AppDataContext } from "../AppDataProvider";
import { ConnectRequestType } from "../connect_requests/ConnectRequestsController";
import useFetchRelations from "../useFetchRelations";
import MyRoommatesView from "./MyRoommatesView";

type Props = {};

type FriendsNavigationProp = StackNavigationProp<
  FriendsRootStackParamList,
  "ConnectRequests"
>;

const MyRoommatesController: FC<Props> = () => {
  const navigation = useNavigation<FriendsNavigationProp>();

  const { myRoommates, setMyRoommates } = useContext(AppDataContext);
  const {
    relationsCount: roommatesCount,
    pendingRelationsCount: pendingRoommatesCount,
    isLoading,
    canLoadMore,
    onEndReached,
    errorMessage,
    onPullToRefresh
  } = useFetchRelations(
    RelationFilterType.ROOMMATE,
    myRoommates,
    setMyRoommates
  );

  const onPressReceivedRoommateRequests = () => {
    navigation.navigate("ConnectRequests", {
      title: "Roommate Requests",
      type: ConnectRequestType.ROOMMATE_REQUESTS
    });
  };

  const moveToProfileScreen = useCallback(
    (_: RelationModel) => {
      navigation.navigate("Profile", {
        isFrom: EScreen.MY_FRIENDS,
        updateProfile: false,
        userId: _.userId
      });
    },
    [navigation]
  );

  return (
    <MyRoommatesView
      roomatesCount={roommatesCount}
      pendingRoommatesCount={pendingRoommatesCount}
      data={myRoommates}
      isLoading={isLoading}
      canLoadMore={canLoadMore}
      error={errorMessage}
      onEndReached={onEndReached}
      onPullToRefresh={onPullToRefresh}
      onPressChat={(item: RelationModel) => {
        AppLog.log(() => "onPressChat: ", item);
      }}
      onPressProfile={moveToProfileScreen}
      onPressReceivedRoommateRequests={onPressReceivedRoommateRequests}
    />
  );
};

export default MyRoommatesController;
