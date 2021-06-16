import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import RelationModel from "models/RelationModel";
import React, { FC, useCallback, useContext } from "react";
import { AppDataContext } from "ui/screens/home/friends/AppDataProvider";
import { FriendsRootStackParamList } from "routes/FriendsRootStack";
import { ConnectRequestType } from "../connect_requests/ConnectRequestsController";
import MyFriendsView from "./MyFriendsView";
import EScreen from "models/enums/EScreen";
import useFetchRelations from "../useFetchRelations";
import RelationFilterType from "models/enums/RelationFilterType";
import { STRINGS } from "config";
import { useCreateConversation } from "hooks/useCreateConversation";
import { useAuth } from "hooks";
import { AppLog } from "utils/Util";

type Props = {};
type FriendsNavigationProp = StackNavigationProp<
  FriendsRootStackParamList,
  "ConnectRequests"
>;

const MyFriendsController: FC<Props> = () => {
  const { user } = useAuth();
  const createConversation = useCreateConversation();
  const navigation = useNavigation<FriendsNavigationProp>();
  const {
    myFriends,
    setMyFriends,
    setActiveConversations,
    inActiveConversations
  } = useContext(AppDataContext);
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
      navigation.navigate("Profile", {
        isFrom: EScreen.MY_FRIENDS,
        updateProfile: false,
        userId: _.userId
      });
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
    AppLog.log(() => "in onPressReceivedFriendRequests");
    navigation.navigate("ConnectRequests", {
      title: "Friend Requests",
      type: ConnectRequestType.FRIEND_REQUESTS
    });
  }, [navigation]);

  const moveToChatScreen = async (profileMatch: RelationModel) => {
    const createConversationResult = await createConversation(
      [user?.profile?.id!!, profileMatch.user?.id!],
      setActiveConversations,
      inActiveConversations
    );

    if (createConversationResult !== undefined) {
      navigation.navigate("Chat", {
        title: [
          profileMatch.user?.getFullName() ?? STRINGS.common.not_found
        ],
        conversationId: createConversationResult?.id!
      });
    }
  };

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
      onPressChat={moveToChatScreen}
      onPressReceivedFriendRequests={onPressReceivedFriendRequests}
      moveToProfileScreen={moveToProfileScreen}
      moveToRoommateRequests={moveToRoommateRequests}
    />
  );
};

export default MyFriendsController;
