import { useAuth } from "hooks";
import { Conversation } from "models/api_responses/ChatsResponseModel";
import EScreen from "models/enums/EScreen";
import NotificationActionType from "models/enums/NotificationActionType";
import NotificationAndLogType from "models/enums/NotificationAndActivityLogFilterType";
import { User } from "models/User";
import { useState } from "react";
import { HomeStackParamList } from "routes/HomeStack";
import { ConnectRequestType } from "ui/screens/home/friends/connect_requests/ConnectRequestsController";
import { AppLog } from "utils/Util";

type NotificationData = {
  action?: string;
  type: string;
  postId?: number;
  users?: User[];
  conversationId?: number;
  notificationId?: number;
  sender?: User;
};

type ReturnType = {
  screenName: keyof HomeStackParamList;
  params: HomeStackParamList[keyof HomeStackParamList];
};

type NotificationRedirectionLiteralType = {
  [key: string]: (notification: NotificationData) => void;
};

type HandleNotificationLiteralType = {
  [key: string]: (action: string) => void;
};

const useNotification = () => {
  const [screenName, setScreenName] = useState<keyof HomeStackParamList>(
    "DrawerRoutes"
  );
  const { user } = useAuth();

  const handleConnectRequestsRedirection: NotificationRedirectionLiteralType = {
    [NotificationActionType.RECIEVE]: (notification: NotificationData) =>
      navigateToConnectRequestScreen(notification),
    [NotificationActionType.ACCEPT]: (notification: NotificationData) =>
      navigateToConnectRequestScreen(notification),
    [NotificationActionType.RESPOND]: (notification: NotificationData) =>
      navigateToConnectRequestScreen(notification)
  };

  const handleMyRoommatesRedirection: NotificationRedirectionLiteralType = {
    [NotificationActionType.ENTER]: (notification: NotificationData) =>
      navigateToMyRoommatesScreen(notification),
    [NotificationActionType.LEAVE]: (notification: NotificationData) =>
      navigateToMyRoommatesScreen(notification),
    [NotificationActionType.UPDATE]: (notification: NotificationData) =>
      navigateToMyRoommatesScreen(notification)
  };

  const handleRoommateAgreementRedirection: NotificationRedirectionLiteralType = {
    [NotificationActionType.AGREE]: (notification: NotificationData) =>
      navigateToRoommateAgreementScreen(notification),
    [NotificationActionType.DISAGREE]: (notification: NotificationData) =>
      navigateToRoommateAgreementScreen(notification),
    [NotificationActionType.UPDATE]: (notification: NotificationData) =>
      navigateToRoommateAgreementScreen(notification)
  };

  const handleChatsRedirection: NotificationRedirectionLiteralType = {
    [NotificationActionType.CREATE]: (notification: NotificationData) =>
      navigateToChatScreen(notification),
    [NotificationActionType.RECIEVE]: (notification: NotificationData) =>
      navigateToChatScreen(notification)
  };

  const handlePostsRedirection: NotificationRedirectionLiteralType = {
    [NotificationActionType.CREATE]: (notification: NotificationData) =>
      navigateToPostScreen(notification),
    [NotificationActionType.LIKE]: (notification: NotificationData) =>
      navigateToPostScreen(notification),
    [NotificationActionType.COMMENT]: (notification: NotificationData) =>
      navigateToPostScreen(notification)
  };

  function handleNotification(notification: NotificationData): ReturnType {
    const notificationActions: HandleNotificationLiteralType = {
      [NotificationAndLogType.FRIEND_REQUEST]: (action: string) =>
        handleConnectRequestsRedirection[action]?.(notification),

      [NotificationAndLogType.ROOMMATE_REQUEST]: (action: string) =>
        handleConnectRequestsRedirection[action]?.(notification),

      [NotificationAndLogType.CHAT]: (action: string) =>
        handleChatsRedirection[action]?.(notification),

      [NotificationAndLogType.CONVERSATION]: (action: string) =>
        handleChatsRedirection[action]?.(notification),

      [NotificationAndLogType.ANNOUNCEMENT]: (action: string) =>
        handlePostsRedirection[action]?.(notification),

      [NotificationAndLogType.POST]: (action: string) =>
        handlePostsRedirection[action]?.(notification),

      [NotificationAndLogType.ROOMMATE_AGREEMENT]: (action: string) =>
        handleRoommateAgreementRedirection[action]?.(notification),

      [NotificationAndLogType.ROOMMATE_GROUP]: (action: string) =>
        handleMyRoommatesRedirection[action]?.(notification)
    };

    // @ts-ignore
    return notificationActions[notification.type]?.(
      // @ts-ignorei
      notification?.action.toString()
    );
  }

  //ConnectRequestController
  /**
   * export enum ConnectRequestType {
   * FRIEND_REQUESTS = "friend_requests",
   * ROOMMATE_REQUESTS = "roommate_requests"
   * }
   * pass this for title
   */
  function navigateToConnectRequestScreen(
    notification: NotificationData
  ): ReturnType {
    AppLog.logForcefully(
      () =>
        JSON.stringify(notification) ?? "navigateToConnectRequestsScreen()"
    );
    let name: keyof HomeStackParamList = "ConnectRequest";
    setScreenName(name);
    return {
      screenName: name,
      params: {
        type:
          notification.type === NotificationAndLogType.FRIEND_REQUEST
            ? ConnectRequestType.FRIEND_REQUESTS
            : ConnectRequestType.ROOMMATE_REQUESTS
      }
    };
  }

  function navigateToChatScreen(
    notification: NotificationData
  ): ReturnType {
    AppLog.logForcefully(() => "user: " + sender?.firstName);

    const { users, conversationId, sender } = notification;

    let createUserNames: string[] = users?.reduce(
      (newArray: string[], _item: any) => (
        _item.id !== user?.profile?.id &&
          newArray.push(_item.firstName + " " + _item.lastName),
        newArray
      ),
      []
    ) ?? ["N/A"];

    //add user who created this conversation
    createUserNames.splice(
      0,
      0,
      sender?.firstName + "" + sender?.lastName
    );

    return {
      screenName: "ChatThread",
      params: {
        title: createUserNames,
        conversation: {
          id: conversationId,
          currentUser: [
            {
              firstName: sender?.firstName,
              lastName: sender?.lastName,
              profilePicture: user?.profile?.profilePicture,
              status: users?.[0]?.status
            }
          ]
        } as Conversation
      }
    };
  }

  //singlePost
  function navigateToPostScreen(
    notification: NotificationData
  ): ReturnType {
    AppLog.logForcefully(
      () => JSON.stringify(notification) ?? "navigateToPostScreen()"
    );
    let name: keyof HomeStackParamList = "SinglePost";
    setScreenName(name);
    return {
      screenName: name,
      params: {
        postId: notification.postId,
        isFrom: EScreen.NOTIFICATION
      }
    };
  }

  //RoommateAgreementController
  function navigateToRoommateAgreementScreen(
    notification: NotificationData
  ): ReturnType {
    AppLog.logForcefully(
      () =>
        JSON.stringify(notification) ??
        "navigateToRoommateAgreementScreen()"
    );
    let name: keyof HomeStackParamList = "RoommateAgreement";
    setScreenName(name);
    return {
      screenName: name,
      params: { isFrom: EScreen.NOTIFICATION }
    };
  }

  // MyRoommatesController
  function navigateToMyRoommatesScreen(
    notification: NotificationData
  ): ReturnType {
    AppLog.logForcefully(
      () => JSON.stringify(notification) ?? "navigateToMyRoommatesScreen()"
    );
    let name: keyof HomeStackParamList = "MyRoommates";
    setScreenName(name);
    return {
      screenName: name,
      params: { isFrom: EScreen.NOTIFICATION }
    };
  }

  return {
    screenName,
    handleNotification: (notification: NotificationData) =>
      handleNotification(notification)
  };
};

export default useNotification;
