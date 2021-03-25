import {
  FriendRequest,
  FriendRequestsResponseModel
} from "models/api_responses/FriendRequestsResponseModel";
import React, { FC, useState } from "react";
import { useApi } from "repo/Client";
import FriendsApis from "repo/friends/FriendsApis";
import DataGenerator from "utils/DataGenerator";
import { AppLog } from "utils/Util";
import FriendRequestsView from "./FriendRequestsView";

type Props = {};

const FriendRequestsController: FC<Props> = () => {
  const [friendRequests, setFriendRequests] = useState<
    Array<FriendRequest>
  >(DataGenerator.getFriendRequests().data);

  const friendRequestsApi = useApi<any, FriendRequestsResponseModel>(
    FriendsApis.getFriendRequests
  );

  const handleFriendRequestsResponse = async (onComplete?: () => void) => {
    const {
      hasError,
      dataBody,
      errorBody
    } = await friendRequestsApi.request([]);
    if (hasError || dataBody === undefined) {
      AppLog.log("Unable to find friend requests " + errorBody);
      return;
    } else {
      setFriendRequests(dataBody.data);
      onComplete?.();
    }
  };

  AppLog.log(
    "handlefriendrequestsresponse: ",
    handleFriendRequestsResponse
  );

  const onPressApproved = (item: FriendRequest) => {
    AppLog.log("friend request item:", item);
  };

  const onPressDeclined = (item: FriendRequest) => {
    AppLog.log("friend request item:", item);
  };

  return (
    <FriendRequestsView
      data={friendRequests}
      onPressApproved={onPressApproved}
      onPressDeclined={onPressDeclined}
    />
  );
};

export default FriendRequestsController;
