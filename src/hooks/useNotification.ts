import { useAuth } from "hooks";
import { Conversation } from "models/api_responses/ChatsResponseModel";
import EScreen from "models/enums/EScreen";
import NotificationActionType from "models/enums/NotificationActionType";
import NotificationAndLogType from "models/enums/NotificationAndActivityLogFilterType";
import { User } from "models/User";
import { useCallback, useState } from "react";
import { HomeStackParamList } from "routes/HomeStack";
import { ConnectRequestType } from "ui/screens/home/friends/connect_requests/ConnectRequestsController";
import { AppLog } from "utils/Util";
import { PushNotificationContext } from "./usePushNotificationContextToNavigate";
import { useApi } from "repo/Client";
import ChatApis from "repo/chat/ChatApis";
import ConversationByIdResponseModel from "models/api_responses/ConversationByIdResponseModel";

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
    let name: keyof HomeStackParamList = "ConnectRequest";
    let _data = {
      screenName: name,
      params: {
        type:
          notification.type === NotificationAndLogType.FRIEND_REQUEST
            ? ConnectRequestType.FRIEND_REQUESTS
            : ConnectRequestType.ROOMMATE_REQUESTS
      },
      isFeatureLocked: true
    };
    setData(_data);
    return _data;
  }

  async function navigateToChatScreen(
    notification: NotificationData
  ): Promise<PushNotificationContext> {
    let name: keyof HomeStackParamList = "ChatThread";
    const { users, conversationId, sender } = notification;

    if (!users) {
      let conversation:
        | Conversation
        | undefined = await handleConversation(
        notification.conversationId!
      );

      let createUserNames: string[] =
        conversation?.conversationUsers!!.reduce(
          (newArray: string[], _item) => (
            newArray.push(_item.firstName + " " + _item.lastName), newArray
          ),
          []
        ) ?? [];

      let _data = {
        screenName: name,
        params: {
          title: createUserNames,
          conversation: {
            id: notification.conversationId!,
            currentUser: conversation?.currentUser
          } as Conversation
        },
        isFeatureLocked: uni && uni?.chatFeature === 1
      };

      setData(_data);

      return _data;
    } else {
      // if (uni && uni?.chatFeature === 1) {
      //   SimpleToast.show("Feature turned off.");
      // } else if (uni && uni.socialFeedFeature === 1) {
      //   SimpleToast.show("Feature turned off.");
      // }

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
        screenName: name,
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
  }

  const conversationApi = useApi<any, ConversationByIdResponseModel>(
    ChatApis.getChatById
  );

  const handleConversation = useCallback(
    async (conversationId: number) => {
      AppLog.log(() => "handleConversation: ");

      const {
        hasError,
        errorBody,
        dataBody
      } = await conversationApi.request([conversationId]);

      if (hasError) {
        AppLog.log(() => "Unable to get response: " + errorBody);
        return undefined;
      } else {
        AppLog.log(() => JSON.stringify(dataBody));
        return dataBody!.data!;
      }
    },
    [conversationApi]
  );

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
        isFrom: EScreen.NOTIFICATION
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
      isFeatureLocked: true
    };
    setData(_data);
    return _data;
  }

  // MyRoommatesController
  function navigateToMyRoommatesScreen(
    notification: NotificationData
  ): PushNotificationContext {
    AppLog.log(
      () => JSON.stringify(notification) ?? "navigateToMyRoommatesScreen()"
    );
    let name: keyof HomeStackParamList = "MyRoommates";
    let _data = {
      screenName: name,
      params: { isFrom: EScreen.NOTIFICATION },
      isFeatureLocked: true
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
