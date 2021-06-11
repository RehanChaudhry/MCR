import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PaginationParamsModel } from "models/api_requests/PaginationParamsModel";
import RelationApiResponseModel from "models/api_responses/RelationApiResponseModel";
import RelationFilterType from "models/enums/RelationFilterType";
import RelationModel from "models/RelationModel";
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import { useApi } from "repo/Client";
import FriendsApis from "repo/friends/FriendsApis";
import { MyFriendsContext } from "ui/screens/home/friends/AppDataProvider";
import { FriendsRootStackParamList } from "routes/FriendsRootStack";
import { ConnectRequestType } from "../connect_requests/ConnectRequestsController";
import MyFriendsView from "./MyFriendsView";
import EScreen from "models/enums/EScreen";
import { STRINGS } from "config";
import { useCreateConversation } from "hooks/useCreateConversation";
import { useAuth } from "hooks";

type Props = {};
type FriendsNavigationProp = StackNavigationProp<
  FriendsRootStackParamList,
  "ConnectRequests"
>;

const MyFriendsController: FC<Props> = () => {
  const [
    paginationRequestModel,
    setPaginationRequestModel
  ] = useState<PaginationParamsModel>({
    type: RelationFilterType.FRIENDS,
    page: 1,
    limit: 9,
    paginate: true
  });

  const { user } = useAuth();
  const createConversation = useCreateConversation();

  const navigation = useNavigation<FriendsNavigationProp>();

  const [isLoading, setIsLoading] = useState(true);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>();

  const [friendsCount, setFriendsCount] = useState<number>(0);
  const [pendingFriendsCount, setPendingFriendsCount] = useState<number>(
    0
  );

  const {
    myFriends,
    setMyFriends,
    addListenerOnResetData,
    removeListenerOnResetData,
    setActiveConversations,
    inActiveConversations
  } = useContext(MyFriendsContext);

  const myFriendsApi = useApi<
    PaginationParamsModel,
    RelationApiResponseModel
  >(FriendsApis.getMyFriends);

  const handleMyFriendsResponse = useCallback(
    async (
      isFromPullToRefresh: boolean,
      requestModel: PaginationParamsModel,
      onComplete?: () => void
    ) => {
      const {
        hasError,
        dataBody,
        errorBody
      } = await myFriendsApi.request([requestModel]);
      if (hasError || dataBody === undefined) {
        setErrorMessage(errorBody);
        setIsLoading(false);
        return;
      } else {
        setErrorMessage(undefined);
        setIsLoading(false);
        const data = dataBody.data ?? [];

        if (isFromPullToRefresh) {
          setMyFriends?.(data);
        } else {
          setMyFriends?.([...(myFriends ?? []), ...data]);
        }

        if (requestModel.page === 1) {
          setFriendsCount(dataBody.count ?? 0);
          setPendingFriendsCount(dataBody.pendingCount ?? 0);
        }

        setPaginationRequestModel({
          ...requestModel,
          page: requestModel.page! + 1
        });
        setCanLoadMore(data.length >= requestModel.limit!);

        onComplete?.();
      }
    },
    [myFriends, myFriendsApi, setMyFriends]
  );

  const onEndReached = useCallback(() => {
    if (myFriendsApi.loading) {
      return;
    }

    handleMyFriendsResponse(false, paginationRequestModel);
  }, [
    handleMyFriendsResponse,
    myFriendsApi.loading,
    paginationRequestModel
  ]);

  const onPullToRefresh = useCallback(
    (onComplete?: () => void) => {
      if (myFriendsApi.loading) {
        onComplete?.();
        return;
      }

      const myFriendRequestModel: PaginationParamsModel = {
        ...paginationRequestModel,
        page: 1
      };

      setPaginationRequestModel(myFriendRequestModel);

      handleMyFriendsResponse(true, myFriendRequestModel, () => {
        onComplete?.();
      });
    },
    [handleMyFriendsResponse, myFriendsApi, paginationRequestModel]
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

  useEffect(() => {
    handleMyFriendsResponse(false, paginationRequestModel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressReceivedFriendRequests = useCallback(() => {
    navigation.navigate("ConnectRequests", {
      title: "Friend Requests",
      type: ConnectRequestType.FRIEND_REQUESTS
    });
  }, [navigation]);

  useEffect(() => {
    let listener = () => {
      onPullToRefresh();
    };
    addListenerOnResetData(listener);
    return () => {
      removeListenerOnResetData(listener);
    };
  }, [onPullToRefresh, addListenerOnResetData, removeListenerOnResetData]);

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
        conversationId: createConversationResult?.id!,
        isArchived: createConversationResult.status === "active"
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
