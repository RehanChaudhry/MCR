import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  MyRoomate,
  MyRoommatesResponseModel
} from "models/api_responses/MyRoommatesResponseModel";
import React, { FC, useState } from "react";
import { useApi } from "repo/Client";
import FriendsApis from "repo/friends/FriendsApis";
import { FriendsRootStackParamList } from "routes/FriendsRootStack";
import DataGenerator from "utils/DataGenerator";
import { AppLog } from "utils/Util";
import { ConnectRequestType } from "../connect_requests/ConnectRequestsController";
import MyRoommatesView from "./MyRoommatesView";

type Props = {};

type FriendsNavigationProp = StackNavigationProp<
  FriendsRootStackParamList,
  "ConnectRequests"
>;

const MyRoommatesController: FC<Props> = () => {
  const navigation = useNavigation<FriendsNavigationProp>();
  const [myRoommates, setMyRoommates] = useState<Array<MyRoomate>>(
    DataGenerator.getMyRoommates().data
  );

  const myRoommatesApi = useApi<any, MyRoommatesResponseModel>(
    FriendsApis.getMyRoommates
  );

  const handleMyRoommatesResponse = async (onComplete?: () => void) => {
    const { hasError, dataBody, errorBody } = await myRoommatesApi.request(
      []
    );
    if (hasError || dataBody === undefined) {
      AppLog.log("Unable to find roommates " + errorBody);
      return;
    } else {
      setMyRoommates(dataBody.data);
      onComplete?.();
    }
  };

  AppLog.log("handlemyroommatesresponse: ", handleMyRoommatesResponse);

  const onPressReceivedRoommateRequests = () => {
    navigation.navigate("ConnectRequests", {
      title: "Roommate Requests",
      type: ConnectRequestType.ROOMMATE_REQUESTS
    });
  };

  return (
    <MyRoommatesView
      data={myRoommates}
      onPressAction={(item: MyRoomate) => {
        AppLog.log("items: ", item);
      }}
      onPressChat={(item: MyRoomate) => {
        AppLog.log("items: ", item);
      }}
      onPressCross={(item: MyRoomate) => {
        AppLog.log("items: ", item);
      }}
      onPressReceivedRoommateRequests={onPressReceivedRoommateRequests}
    />
  );
};

export default MyRoommatesController;
