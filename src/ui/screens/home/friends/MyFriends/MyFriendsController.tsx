import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import RelationModel from "models/RelationModel";
import React, { FC, useCallback, useContext } from "react";
import { AppDataContext } from "ui/screens/home/friends/AppDataProvider";
import { ConnectRequestType } from "../connect_requests/ConnectRequestsController";
import MyFriendsView from "./MyFriendsView";
import EScreen from "models/enums/EScreen";
import useFetchRelations from "../useFetchRelations";
import RelationFilterType from "models/enums/RelationFilterType";
import { STRINGS } from "config";
import { useCreateConversation } from "hooks/useCreateConversation";
import { useAuth } from "hooks";
import { AppLog } from "utils/Util";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import { HomeStackParamList } from "routes/HomeStack";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";

type Props = {};
type FriendsNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "MyFriends"
>;
type FriendsRouteProp = RouteProp<HomeStackParamList, "MyFriends">;

const MyFriendsController: FC<Props> = () => {
  const { user } = useAuth();
  const createConversation = useCreateConversation();
  const navigation = useNavigation<FriendsNavigationProp>();
  const route = useRoute<FriendsRouteProp>();

  useFocusEffect(
    useCallback(() => {
      if (route.params?.isFrom === EScreen.HOME) {
        navigation.dangerouslyGetParent()?.setOptions({
          headerTitleAlign: "center",
          headerTitle: () => <HeaderTitle text="My Friends" />,
          headerLeft: () => <Hamburger />,
          headerRight: () => null
        });
      } else {
        navigation.setOptions({
          headerTitleAlign: "center",
          headerLeft: () => (
            <HeaderLeftTextWithIcon
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          headerTitle: () => <HeaderTitle text="My Friends" />
        });
      }
    }, [navigation, route.params?.isFrom])
  );

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
      navigation.navigate("ViewProfile", {
        isFrom: EScreen.MY_FRIENDS,
        userId: _.userId
      });
    },
    [navigation]
  );

  const moveToRoommateRequests = useCallback(
    (_: RelationModel) => {
      navigation.navigate("ConnectRequest", {
        type: ConnectRequestType.ROOMMATE_REQUESTS
      });
    },
    [navigation]
  );

  const onPressReceivedFriendRequests = useCallback(() => {
    AppLog.log(() => "in onPressReceivedFriendRequests");
    navigation.navigate("ConnectRequest", {
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
      navigation.navigate("ChatThread", {
        title: [
          profileMatch.user?.getFullName() ?? STRINGS.common.not_found
        ],
        conversation: createConversationResult
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
