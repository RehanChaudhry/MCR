import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RelationApiRequestModel } from "models/api_requests/RelationApiRequestModel";
import RelationApiResponseModel from "models/api_responses/RelationApiResponseModel";
import RelationFilterType from "models/enums/RelationFilterType";
import RelationModel from "models/RelationModel";
import React, { FC, useEffect, useState } from "react";
import { useApi } from "repo/Client";
import FriendsApis from "repo/friends/FriendsApis";
import { FriendsRootStackParamList } from "routes/FriendsRootStack";
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
    relationRequestModel,
    setRelationRequestModel
  ] = useState<RelationApiRequestModel>({
    type: RelationFilterType.FRIENDS,
    page: 1,
    limit: 2,
    paginate: true
  });

  const navigation = useNavigation<FriendsNavigationProp>();

  const [myFriends, setMyFriends] = useState<Array<RelationModel>>();
  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);
  const [isLoadingMyFriends, setLoadingMyFriends] = useState<boolean>(
    false
  );

  const [, setIsRefreshing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const [friendsCount, setFriendsCount] = useState<number>(0);
  const [pendingFriendsCount, setPendingFriendsCount] = useState<number>(
    0
  );

  const myFriendsApi = useApi<
    RelationApiRequestModel,
    RelationApiResponseModel
  >(FriendsApis.getMyFriends);

  useEffect(() => {
    setLoadingMyFriends(myFriendsApi.loading);
  }, [myFriendsApi.loading]);

  const handleMyFriendsResponse = async (
    isRefreshing: boolean,
    requestModel: RelationApiRequestModel,
    onComplete?: () => void
  ) => {
    const { hasError, dataBody, errorBody } = await myFriendsApi.request([
      requestModel
    ]);
    if (hasError || dataBody === undefined) {
      setErrorMessage(errorBody);
      return;
    } else {
      setErrorMessage(undefined);
      const data = dataBody.data ?? [];

      if (isRefreshing) {
        setMyFriends(data);
      } else {
        setMyFriends([...(myFriends ?? []), ...data]);
      }

      if (requestModel.page == 1) {
        setFriendsCount(dataBody.count ?? 0);
        setPendingFriendsCount(dataBody.pendingCount ?? 0);
      }

      setRelationRequestModel({
        ...requestModel,
        page: requestModel.page + 1
      });
      setCanLoadMore(data.length >= requestModel.limit);

      onComplete?.();
    }

    setIsRefreshing(false);
  };

  const onEndReached = () => {
    if (myFriendsApi.loading || !canLoadMore) {
      return;
    }

    handleMyFriendsResponse(false, relationRequestModel);
  };

  const onPullToRefresh = (onComplete?: () => void) => {
    if (isLoadingMyFriends) {
    }

    const myFriendRequestModel: RelationApiRequestModel = {
      ...relationRequestModel,
      page: 1
    };

    const refreshing: boolean = true;

    setRelationRequestModel(myFriendRequestModel);
    setIsRefreshing(refreshing);

    handleMyFriendsResponse(refreshing, myFriendRequestModel, () => {
      onComplete?.();
    });
  };

  useEffect(() => {
    handleMyFriendsResponse(false, relationRequestModel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressReceivedFriendRequests = () => {
    navigation.navigate("ConnectRequests", {
      title: "Friend Requests",
      type: ConnectRequestType.FRIEND_REQUESTS
    });
  };

  return (
    <>
      <MyFriendsView
        friendsCount={friendsCount}
        pendingFriendsCount={pendingFriendsCount}
        data={myFriends}
        isLoading={isLoadingMyFriends}
        canLoadMore={canLoadMore}
        error={errorMessage}
        onEndReached={onEndReached}
        onPullToRefresh={onPullToRefresh}
        onPressChat={(item: RelationModel) => {
          AppLog.log("onPressChat: ", item);
        }}
        onPressReceivedFriendRequests={onPressReceivedFriendRequests}
      />
    </>
  );
};

export default MyFriendsController;
