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
import { PushNotificationContext } from "./usePushNotificationContextToNavigate";

type NotificationData = {
  action?: string;
  type: string;
  postId?: number;
  users?: User[];
  conversationId?: number;
  notificationId?: number;
  sender?: User;
};

type NotificationRedirectionLiteralType = {
  [key: string]: (notification: NotificationData) => void;
};

type HandleNotificationLiteralType = {
  [key: string]: (action: string) => void;
};

const useNotification = () => {
  const [data, setData] = useState<PushNotificationContext>({
    screenName: "DrawerRoutes"
  });
  const { user, uni } = useAuth();

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
      navigateToPostScreen(notification),
    [NotificationActionType.RECIEVE]: (notification: NotificationData) =>
      navigateToPostScreen(notification)
  };

  function handleNotification(
    notification: NotificationData
  ): PushNotificationContext {
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
  ): PushNotificationContext {
    AppLog.logForcefully(
      () =>
        JSON.stringify(notification) ?? "navigateToConnectRequestsScreen()"
    );
    let name: keyof HomeStackParamList = "ConnectRequest";
    let _data = {
      screenName: name,
      params: {
        type:
          notification.type === NotificationAndLogType.FRIEND_REQUEST
            ? ConnectRequestType.FRIEND_REQUESTS
            : ConnectRequestType.ROOMMATE_REQUESTS,
        isFeatureLocked: false
      }
    };
    setData(_data);
    return _data;
  }

  function navigateToChatScreen(
    notification: NotificationData
  ): PushNotificationContext {
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

    // if (uni && uni?.chatFeature === 0) {
    //   SimpleToast.show("Feature turned off.");
    // }

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
      },
      isFeatureLocked: uni && uni?.chatFeature === 1
    };
  }

  //singlePost
  function navigateToPostScreen(
    notification: NotificationData
  ): PushNotificationContext {
    AppLog.logForcefully(
      () => JSON.stringify(notification) ?? "navigateToPostScreen()"
    );
    let name: keyof HomeStackParamList = "SinglePost";
    let _data = {
      screenName: name,
      params: {
        postId: notification.postId,
        isFrom: EScreen.NOTIFICATION,
        isFeatureLocked: false
      },
      isFeatureLocked: uni && uni?.socialFeedFeature === 1
    };
    setData(_data);
    return _data;
  }

  //RoommateAgreementController
  function navigateToRoommateAgreementScreen(
    notification: NotificationData
  ): PushNotificationContext {
    AppLog.logForcefully(
      () =>
        JSON.stringify(notification) ??
        "navigateToRoommateAgreementScreen()"
    );
    let name: keyof HomeStackParamList = "RoommateAgreement";
    let _data = {
      screenName: name,
      params: { isFrom: EScreen.NOTIFICATION },
      isFeatureLocked: false
    };
    setData(_data);
    return _data;
  }

  // MyRoommatesController
  function navigateToMyRoommatesScreen(
    notification: NotificationData
  ): PushNotificationContext {
    AppLog.logForcefully(
      () => JSON.stringify(notification) ?? "navigateToMyRoommatesScreen()"
    );
    let name: keyof HomeStackParamList = "MyRoommates";
    let _data = {
      screenName: name,
      params: { isFrom: EScreen.NOTIFICATION },
      isFeatureLocked: false
    };
    setData(_data);
    return _data;
  }

  return {
    data: data,
    handleNotification: (notification: NotificationData) =>
      handleNotification(notification)
  };
};

export default useNotification;
