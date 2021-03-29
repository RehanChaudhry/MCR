import { useNavigation } from "@react-navigation/native";
import {
  MyFriend,
  MyFriendsResponseModel
} from "models/api_responses/MyFriendsResponseModel";
import React, { FC, useState } from "react";
import { useApi } from "repo/Client";
import FriendsApis from "repo/friends/FriendsApis";
import DataGenerator from "utils/DataGenerator";
import { AppLog } from "utils/Util";
import MyFriendsView from "./MyFriendsView";

type Props = {};

const MyFriendsController: FC<Props> = () => {
  const navigation = useNavigation();

  const [myFriends, setMyFriends] = useState<Array<MyFriend>>(
    DataGenerator.getMyFriends().data
  );

  const myFriendsApi = useApi<any, MyFriendsResponseModel>(
    FriendsApis.getMyFriends
  );

  const handleMyFriendsResponse = async (onComplete?: () => void) => {
    const { hasError, dataBody, errorBody } = await myFriendsApi.request(
      []
    );
    if (hasError || dataBody === undefined) {
      AppLog.log("Unable to find unis " + errorBody);
      return;
    } else {
      setMyFriends(dataBody.data);
      onComplete?.();
    }
  };

  AppLog.log("handlemyfriendresponse: ", handleMyFriendsResponse);

  const onPressReceivedFriendRequests = () => {
    navigation.navigate("FriendRequests");
  };

  return (
    <MyFriendsView
      data={myFriends}
      onPressAction={(item: MyFriend) => {
        AppLog.log("items: ", item);
      }}
      onPressChat={(item: MyFriend) => {
        AppLog.log("items: ", item);
      }}
      onPressCross={(item: MyFriend) => {
        AppLog.log("items: ", item);
      }}
      onPressReceivedFriendRequests={onPressReceivedFriendRequests}
    />
  );
};

export default MyFriendsController;
