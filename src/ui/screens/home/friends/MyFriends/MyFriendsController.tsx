import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FONT_SIZE } from "config";
import { usePreferredTheme } from "hooks";
import { RelationApiRequestModel } from "models/api_requests/RelationApiRequestModel";
import {
  MyFriend,
  MyFriendsResponseModel,
  RELATION_REQUEST_STATUS
} from "models/api_responses/MyFriendsResponseModel";
import RelationFilterType from "models/enums/RelationFilterType";
import React, { FC, useEffect, useState } from "react";
import { useApi } from "repo/Client";
import FriendsApis from "repo/friends/FriendsApis";
import { FriendsRootStackParamList } from "routes/FriendsRootStack";
import AppPopUp from "ui/components/organisms/popup/AppPopUp";
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

  const [
    relationRequestModel,
    setRelationRequestModel
  ] = useState<RelationApiRequestModel>({
    type: RelationFilterType.FRIENDS,
    page: 1,
    limit: 2,
    paginate: true
  });

  const theme = usePreferredTheme();

  const navigation = useNavigation<FriendsNavigationProp>();

  const [myFriends, setMyFriends] = useState<Array<MyFriend>>();
  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);
  const [isLoadingMyFriends, setLoadingMyFriends] = useState<boolean>(
    false
  );
  const [, setIsRefreshing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const myFriendsApi = useApi<
    RelationApiRequestModel,
    MyFriendsResponseModel
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
      if (isRefreshing) {
        setMyFriends([...dataBody.data]);
      } else {
        setMyFriends([...(myFriends ?? []), ...dataBody.data]);
      }

      setRelationRequestModel({
        ...requestModel,
        page: requestModel.page + 1
      });
      setCanLoadMore(
        dataBody.data && dataBody.data.length >= requestModel.limit
      );
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

  // useEffect(() => {
  //   if (isRefreshing) {
  //     handleMyFriendsResponse(() => {
  //       onComplete?.();
  //     });
  //   }
  // }, [isRefreshing]);

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
        isLoading={isLoadingMyFriends}
        canLoadMore={canLoadMore}
        error={errorMessage}
        onEndReached={onEndReached}
        onPullToRefresh={onPullToRefresh}
        onPressAction={(item: MyFriend) => {
          if (item.criteria.eligible) {
            if (item.status === RELATION_REQUEST_STATUS.ACCEPTED) {
              setShowRequestAlert(true);
            }
          } else {
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
