import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { ChatThreadScreen } from "ui/screens/chat/thread/ChatThreadScreen";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { useApi } from "repo/Client";
import ChatApis from "repo/chat/ChatApis";
import { AppLog } from "utils/Util";
import { COLORS, SPACE } from "config";
import { useAuth, usePreferredTheme } from "hooks";
import Archive from "assets/images/archive.svg";
import Close from "assets/images/close.svg";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import Strings from "config/Strings";
import { moderateScale } from "config/Dimens";
import { ChatRootStackParamList } from "routes/ChatRootStack";
import ChatRequestModel, {
  ESortBy,
  ESortOrder
} from "models/api_requests/chatRequestModel";
import MessagesResponseModel from "models/api_responses/MessagesResponseModel";
import Message from "models/Message";
import SimpleToast from "react-native-simple-toast";
import { SocketHelper } from "utils/SocketHelper";
import { Socket } from "socket.io-client";
import { ChatHelper } from "utils/ChatHelper";
import { AppDataContext } from "ui/screens/home/friends/AppDataProvider";
import _ from "lodash";
import nextId from "react-id-generator";

type ChatListNavigationProp = StackNavigationProp<
  ChatRootStackParamList,
  "ChatThread"
>;

type HomeDrawerNavigationProp = RouteProp<
  ChatRootStackParamList,
  "ChatThread"
>;

type Props = {
  route: HomeDrawerNavigationProp;
  navigation: ChatListNavigationProp;
};

export const ChatThreadController: FC<Props> = ({ route, navigation }) => {
  const myNavigation = useNavigation<typeof navigation>();
  const { params }: any = useRoute<typeof route>();
  const [messages, setMessages] = useState<Message[] | undefined>(
    undefined
  );
  const conversationId: number = params.conversation.id;
  const { themedColors } = usePreferredTheme();
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);
  const [shouldShowProgressBar, setShouldShowProgressBar] = useState(
    false
  );
  const isFetchingInProgress = useRef(false);
  const { user } = useAuth();
  const [showArchivedButton, setShowArchivedButton] = useState<boolean>(
    params?.conversation.currentUser[0].status === "active"
  );

  AppLog.logForcefully(() => "title: " + params?.title);

  const getTitle = useCallback(() => {
    const title = params?.title ?? "N/A";

    if (title.length === 1) {
      return title[0];
    } else if (title.length === 2) {
      return title[0] + " & " + title[1];
    } else {
      return title[0] + " & " + (title.length - 1) + " more ";
    }
  }, [params?.title]);

  const loadMessages = useApi<ChatRequestModel, MessagesResponseModel>(
    ChatApis.getMessages
  );

  //archive chat api
  const updateConversationApi = useApi<
    { status: string; conversationId: number },
    any
  >(ChatApis.updateConversation);

  const {
    activeConversations,
    setActiveConversations,
    inActiveConversations,
    setInActiveConversations
  } = useContext(AppDataContext);

  const handleUpdateConversationApi = useCallback(async () => {
    const {
      hasError,
      dataBody,
      errorBody
    } = await updateConversationApi.request([
      { status: "archived", conversationId: conversationId }
    ]);

    if (hasError || dataBody === undefined) {
      AppLog.log(() => "Conversation archive failed :  " + errorBody);
      SimpleToast.show(errorBody!);
      return;
    } else {
      SimpleToast.show(dataBody.message);
      ChatHelper.manipulateChatLists(
        setActiveConversations,
        inActiveConversations,
        setInActiveConversations,
        activeConversations,
        true,
        conversationId
      );
      navigation.goBack();
    }
  }, [
    activeConversations,
    conversationId,
    inActiveConversations,
    navigation,
    setActiveConversations,
    updateConversationApi,
    setInActiveConversations
  ]);

  const loadMessagesRequestModel = useRef<ChatRequestModel>({
    paginate: true,
    page: 1,
    limit: 10,
    orderBy: ESortBy.CREATED_AT,
    order: ESortOrder.DSC,
    id: conversationId
  });

  const handleLoadMessagesApi = useCallback(
    async (onComplete?: () => void) => {
      setShouldShowProgressBar(true);
      isFetchingInProgress.current = true;

      const {
        hasError,
        dataBody,
        errorBody
      } = await loadMessages.request([loadMessagesRequestModel.current]);
      if (hasError || dataBody === undefined) {
        AppLog.logForcefully(() => "Unable to find messages " + errorBody);
        SimpleToast.show(Strings.something_went_wrong);
        setShouldShowProgressBar(false);
        return;
      } else {
        setMessages((prevState) => {
          return _.uniqBy(
            [
              ...(prevState === undefined ||
              loadMessagesRequestModel.current.page === 1
                ? []
                : (prevState as Message[])),
              ...dataBody.data!!
            ],
            (item) => item.id
          );
        });

        setIsAllDataLoaded(
          dataBody.data!!.length < loadMessagesRequestModel.current.limit
        );

        onComplete?.();
        loadMessagesRequestModel.current.page =
          (loadMessagesRequestModel?.current?.page ?? 0) + 1;

        isFetchingInProgress.current = false;
        setShouldShowProgressBar(false);
      }
    },
    [loadMessages]
  );

  const onEndReached = useCallback(async () => {
    AppLog.log(() => "ChatThread => onEndReached is called");
    await handleLoadMessagesApi();
  }, [handleLoadMessagesApi]);

  function sentMessageToSocket(
    text: string,
    id?: number,
    isRetry = false
  ) {
    let generateId = nextId(
      (messages?.length ?? 0) > 0 && messages![0] !== undefined
        ? String(messages![0].id)
        : "0"
    ).split(
      (messages?.length ?? 0) > 0 && messages![0] !== undefined
        ? String(messages![0].id)
        : "0"
    );

    id = id ?? Number(generateId[0]) + Number(generateId[1]);

    let prepareMessage = ({
      id: id,
      userId: user?.profile?.id,
      firstName: user?.profile?.firstName,
      lastName: user?.profile?.lastName,
      profilePicture: user?.profile?.profilePicture,
      conversationId: conversationId,
      text: text,
      readBy: [user?.profile?.id],
      createdAt: new Date(),
      updatedAt: new Date(),
      userType: "Student",
      isLoading: false,
      isError: false
    } as unknown) as Message;

    if (socket?.current?.connected ?? false) {
      setShowArchivedButton(true);

      //remove id from message when sending to socket
      socket!!.current!!.emit("sendMessage", _.omit(prepareMessage, "id"));

      //remove chat from archive list if present, also
      //update active and inactive chats list to reflect in chat listing as well
      ChatHelper.manipulateChatLists(
        setActiveConversations,
        inActiveConversations,
        setInActiveConversations,
        activeConversations,
        false,
        conversationId,
        (prepareMessage as unknown) as Message
      );
    } else {
      //update message but with retry option
      prepareMessage.isLoading = false;
      prepareMessage.isError = true;
    }

    //update messages list after sending message
    if (!isRetry) {
      // @ts-ignore
      setMessages((prevState) => {
        return _.cloneDeep([prepareMessage, ...(prevState || [])]);
      });
    } else {
      //update message since we are retrying
      setMessages((prevState) => {
        let messagesDeepCopy = _.cloneDeep(prevState);

        let findIndex = messagesDeepCopy?.findIndex(
          (item: any) => item.id === id
        );

        if (findIndex !== -1) {
          let findItem = messagesDeepCopy?.find(
            (_item) => _item.id === id
          );

          AppLog.log(
            () => "prepare message : " + JSON.stringify(prepareMessage)
          );

          prepareMessage.createdAt = findItem?.createdAt as string;
          prepareMessage.updatedAt = findItem?.updatedAt as string;

          //remove item from index
          messagesDeepCopy?.splice(findIndex!, 1);

          //add item at index
          messagesDeepCopy?.splice(findIndex!, 0, prepareMessage);

          return messagesDeepCopy;
        } else {
          return prevState;
        }
      });
    }
  }

  useEffect(() => {
    handleLoadMessagesApi().then().catch();
    connectSocket().then().catch();

    return () => {
      // Do unmounting stuff here
      socket?.current?.off("receiveMessage", receiveMessageListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleLoadMessagesApi]);

  let socket = useRef<Socket>();

  const receiveMessageListener = useCallback(
    (data: any) => {
      if (conversationId === data?.id) {
        setMessages((prevState) => {
          return [...data.message, ...(prevState || [])];
        });

        data.message[0].readBy = [user?.profile?.id];
        ChatHelper.manipulateChatLists(
          setActiveConversations,
          inActiveConversations,
          setInActiveConversations,
          activeConversations,
          !showArchivedButton,
          conversationId,
          data.message[0] as Message
        );
      }
    },
    [
      setActiveConversations,
      setInActiveConversations,
      inActiveConversations,
      activeConversations,
      showArchivedButton,
      conversationId,
      user?.profile?.id
    ]
  );
  const connectSocket = useCallback(async () => {
    socket.current = await SocketHelper.getInstance(
      "Bearer " + user?.authentication?.accessToken
    );

    socket?.current?.on("receiveMessage", receiveMessageListener);
  }, [receiveMessageListener, user?.authentication]);

  const retry = (message: Message) => {
    if (!socket?.current?.connected) {
      socket?.current?.connect();
    }
    sentMessageToSocket(message.text, message.id, true);
  };

  useLayoutEffect(() => {
    myNavigation.setOptions({
      headerTitleAlign: "center",
      headerTitle: () => (
        <HeaderTitle
          text={getTitle()}
          labelStyle={{ paddingHorizontal: SPACE._2xl }}
        />
      ),
      headerLeft: () => (
        <HeaderLeftTextWithIcon
          text={Strings.chatThreadScreen.titleLeft}
          onPress={() => {
            navigation.goBack();
          }}
          icon={() => (
            <Close
              testID="icon"
              width={moderateScale(15)}
              height={moderateScale(15)}
              fill={themedColors.primary}
            />
          )}
        />
      ),
      headerRight: () =>
        showArchivedButton && (
          <HeaderRightTextWithIcon
            text={Strings.chatThreadScreen.titleRight}
            onPress={async () => {
              await handleUpdateConversationApi();
            }}
            shouldShowLoader={updateConversationApi.loading}
            textStyle={{ color: COLORS.red }}
            icon={() => (
              <Archive
                testID="icon"
                width={moderateScale(15)}
                height={moderateScale(15)}
                fill={COLORS.red}
              />
            )}
          />
        )
    });
  }, [
    showArchivedButton,
    handleUpdateConversationApi,
    getTitle,
    myNavigation,
    navigation,
    themedColors.primary,
    updateConversationApi.loading
  ]);

  return (
    <ChatThreadScreen
      data={messages}
      sentMessageApi={sentMessageToSocket}
      shouldShowProgressBar={shouldShowProgressBar}
      error={loadMessages.error}
      isAllDataLoaded={isAllDataLoaded}
      onEndReached={onEndReached}
      retry={retry}
      retryCallback={() => {
        loadMessagesRequestModel.current.page = 1;
        setMessages(undefined);
        handleLoadMessagesApi().then().catch();
      }}
    />
  );
};
