import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FONT_SIZE } from "config";
import { usePreferredTheme } from "hooks";
import {
  MyFriend,
  MyFriendsResponseModel,
  ROOMMATE_REQUEST_STATE
} from "models/api_responses/MyFriendsResponseModel";
import React, { FC, useState } from "react";
import { useApi } from "repo/Client";
import FriendsApis from "repo/friends/FriendsApis";
import { FriendsRootStackParamList } from "routes/FriendsRootStack";
import AppPopUp from "ui/components/organisms/popup/AppPopUp";
import DataGenerator from "utils/DataGenerator";
import { AppLog } from "utils/Util";
import { ConnectRequestType } from "../connect_requests/ConnectRequestsController";
import MyFriendsView from "./MyFriendsView";

type Props = {};

type FriendsNavigationProp = StackNavigationProp<
  FriendsRootStackParamList,
  "ConnectRequests"
>;

const MyFriendsController: FC<Props> = () => {
  const [showRequestAlert, setShowRequestAlert] = useState<boolean>(false);
  const [
    showNotEligibleAlert,
    setShowNotEligibleAlert
  ] = useState<boolean>(false);

  const [
    showRemoveFriendAlert,
    setShowRemoveFriendAlert
  ] = useState<boolean>(false);

  const theme = usePreferredTheme();

  const navigation = useNavigation<FriendsNavigationProp>();

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
    navigation.navigate("ConnectRequests", {
      title: "Friend Requests",
      type: ConnectRequestType.FRIEND_REQUESTS
    });
  };

  const roomateRequestAlert = () => {
    return (
      <AppPopUp
        isVisible={showRequestAlert}
        title={"Roommate Request"}
        message={
          "Are you sure you want to send roommate request to Aris Johnson?"
        }
        actions={[
          {
            title: "Yes, send request",
            onPress: () => {
              setShowRequestAlert(false);
            },
            style: {
              weight: "bold",
              style: {
                color: theme.themedColors.primary,
                textAlign: "center",
                fontSize: FONT_SIZE.lg
              }
            }
          },
          {
            title: "Cancel",
            onPress: () => {
              setShowRequestAlert(false);
            }
          }
        ]}
      />
    );
  };

  const notEligibleAlert = () => {
    return (
      <AppPopUp
        isVisible={showNotEligibleAlert}
        title={"Not eligible for roommate"}
        message={
          "You can't send roommate request to Aris Johnson because he has the maximum allowable number of roommates, and does not allow you to send a roommate request."
        }
        actions={[
          {
            title: "OK",
            onPress: () => {
              setShowNotEligibleAlert(false);
            },
            style: {
              style: {
                color: theme.themedColors.primary,
                textAlign: "center",
                fontSize: FONT_SIZE.lg
              }
            }
          }
        ]}
      />
    );
  };

  const removeFriendAlert = () => {
    return (
      <AppPopUp
        isVisible={showRemoveFriendAlert}
        title={"Remove Friend"}
        message={
          "Are you sure you want to remove Aris Johnson from your friends list?"
        }
        actions={[
          {
            title: "Yes, remove",
            onPress: () => {
              setShowRemoveFriendAlert(false);
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
              setShowRemoveFriendAlert(false);
            }
          }
        ]}
      />
    );
  };

  return (
    <>
      <MyFriendsView
        data={myFriends}
        onPressAction={(item: MyFriend) => {
          if (item.requestState === ROOMMATE_REQUEST_STATE.NONE) {
            setShowRequestAlert(true);
          } else if (
            item.requestState === ROOMMATE_REQUEST_STATE.NOT_ELIGIBLE
          ) {
            setShowNotEligibleAlert(true);
          }
        }}
        onPressChat={(item: MyFriend) => {
          AppLog.log("onPressChat: ", item);
        }}
        onPressCross={(item: MyFriend) => {
          setShowRemoveFriendAlert(true);
          AppLog.log("onPressCross: ", item);
        }}
        onPressReceivedFriendRequests={onPressReceivedFriendRequests}
      />
      {removeFriendAlert()}
      {roomateRequestAlert()}
      {notEligibleAlert()}
    </>
  );
};

export default MyFriendsController;
