import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  FriendRequest,
  FriendRequestsResponseModel
} from "models/api_responses/FriendRequestsResponseModel";
import React, { FC, useEffect, useState } from "react";
import { useApi } from "repo/Client";
import FriendsApis from "repo/friends/FriendsApis";
import { ConnectionRequestStackParamList } from "routes/ConnectionRequestStack";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import DataGenerator from "utils/DataGenerator";
import { AppLog } from "utils/Util";
import ConnectRequestsView from "./ConnectRequestsView";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";

type Props = {};

type ConnectRequestRouteProp = RouteProp<
  ConnectionRequestStackParamList,
  "FriendRequests"
>;

type ConnectRequestsNavigationProp = StackNavigationProp<
  ConnectionRequestStackParamList,
  "FriendRequests"
>;

export enum ConnectRequestType {
  FRIEND_REQUESTS = "friend_requests",
  ROOMMATE_REQUESTS = "roommate_requests"
}

const ConnectRequestsController: FC<Props> = () => {
  const route = useRoute<ConnectRequestRouteProp>();
  const { title, type } = route.params;

  AppLog.log("showing connect for types: ", type);

  const [connectRequests, setConnectRequests] = useState<
    Array<FriendRequest>
  >(DataGenerator.getFriendRequests().data);

  const connectRequestsApi = useApi<any, FriendRequestsResponseModel>(
    FriendsApis.getFriendRequests
  );

  const handleConnectRequestsResponse = async (
    onComplete?: () => void
  ) => {
    const {
      hasError,
      dataBody,
      errorBody
    } = await connectRequestsApi.request([]);
    if (hasError || dataBody === undefined) {
      AppLog.log("Unable to find friend requests " + errorBody);
      return;
    } else {
      setConnectRequests(dataBody.data);
      onComplete?.();
    }
  };

  AppLog.log(
    "handlefriendrequestsresponse: ",
    handleConnectRequestsResponse
  );

  const onPressApproved = (item: FriendRequest) => {
    AppLog.log("friend request item:", item);
  };

  const onPressDeclined = (item: FriendRequest) => {
    AppLog.log("friend request item:", item);
  };

  const navigation = useNavigation<ConnectRequestsNavigationProp>();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftTextWithIcon
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerTitle: () => <HeaderTitle text={title} />
    });
  }, [navigation, title]);

  return (
    <ConnectRequestsView
      data={connectRequests}
      onPressApproved={onPressApproved}
      onPressDeclined={onPressDeclined}
    />
  );
};

export default ConnectRequestsController;
