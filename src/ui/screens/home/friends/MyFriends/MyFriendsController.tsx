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
  useMemo,
  useState
} from "react";
import { useApi } from "repo/Client";
import FriendsApis from "repo/friends/FriendsApis";
import { FriendsRootStackParamList } from "routes/FriendsRootStack";
import { MyFriendsContext } from "ui/screens/home/friends/FriendsController";
import { AppLog } from "utils/Util";
import { ConnectRequestType } from "../connect_requests/ConnectRequestsController";
import MyFriendsView from "./MyFriendsView";

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
    limit: 5,
    paginate: true
  });

  const navigation = useNavigation<FriendsNavigationProp>();
  const { myFriends, setMyFriends, onResetMyFriends } = useContext(
    MyFriendsContext
  );

  const [isLoading, setIsLoading] = useState(true);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>();

  const [friendsCount, setFriendsCount] = useState<number>(0);
  const [pendingFriendsCount, setPendingFriendsCount] = useState<number>(
    0
  );

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
          page: requestModel.page + 1
        });
        setCanLoadMore(data.length >= requestModel.limit);

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

  useMemo(() => {
    onResetMyFriends.current = () => {
      onPullToRefresh();
    };
  }, [onPullToRefresh, onResetMyFriends]);

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
    />
  );
};

export default MyFriendsController;
