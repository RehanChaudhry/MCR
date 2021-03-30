import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FONT_SIZE } from "config";
import { usePreferredTheme } from "hooks";
import {
  MyRoomate,
  MyRoommatesResponseModel
} from "models/api_responses/MyRoommatesResponseModel";
import React, { FC, useState } from "react";
import { useApi } from "repo/Client";
import FriendsApis from "repo/friends/FriendsApis";
import { FriendsRootStackParamList } from "routes/FriendsRootStack";
import AppPopUp from "ui/components/organisms/popup/AppPopUp";
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
  const [
    showRemoveRoommateAlert,
    setShowRemoveRoommateAlert
  ] = useState<boolean>(false);

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

  const theme = usePreferredTheme();

  const removeRoommateAlert = () => {
    return (
      <AppPopUp
        isVisible={showRemoveRoommateAlert}
        title={"Remove Roommate"}
        message={
          "Are you sure you want to remove Aris Johnson from your roommates list?"
        }
        actions={[
          {
            title: "Yes, remove",
            onPress: () => {
              setShowRemoveRoommateAlert(false);
            },
            style: {
              weight: "bold",
              style: {
                color: theme.themedColors.danger,
                textAlign: "center",
                fontSize: FONT_SIZE.lg
              }
            }
          },
          {
            title: "Cancel",
            onPress: () => {
              setShowRemoveRoommateAlert(false);
            }
          }
        ]}
      />
    );
  };

  return (
    <>
      <MyRoommatesView
        data={myRoommates}
        onPressAction={(item: MyRoomate) => {
          setShowRemoveRoommateAlert(true);
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
      {removeRoommateAlert()}
    </>
  );
};

export default MyRoommatesController;
