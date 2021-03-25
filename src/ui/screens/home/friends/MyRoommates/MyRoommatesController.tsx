import { MyRoommatesResponseModel } from "models/api_responses/MyRoommatesResponseModel";
import { MyRoomate } from "models/api_responses/MyRoommatesResponseModel";
import React, { FC, useState } from "react";
import { useApi } from "repo/Client";
import FriendsApis from "repo/friends/FriendsApis";
import DataGenerator from "utils/DataGenerator";
import { AppLog } from "utils/Util";
import MyRoommatesView from "./MyRoommatesView";

type Props = {};

const MyRoommatesController: FC<Props> = () => {
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
    />
  );
};

export default MyRoommatesController;
