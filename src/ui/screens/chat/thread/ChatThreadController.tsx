import React, {
  FC,
  useCallback,
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
  const conversationId: number = params.conversationId;
  const { themedColors } = usePreferredTheme();
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);
  const [shouldShowProgressBar, setShouldShowProgressBar] = useState(
    false
  );
  const isFetchingInProgress = useRef(false);

  const { user } = useAuth();

  const getTitle = (): string => {
    const title = params?.title ?? "N/A";

    if (title.length === 1) {
      return title[0];
    } else if (title.length === 2) {
      return title[0] + " & " + title[1];
    } else {
      return title[0] + " & " + (title.length - 1) + " more ";
    }
  };

  useLayoutEffect(() => {
    myNavigation.setOptions({
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
      headerRight: () => (
        <HeaderRightTextWithIcon
          text={Strings.chatThreadScreen.titleRight}
          onPress={async () => {
            await handleUpdateConversationApi();
          }}
          shouldSHowLoader={updateConversationApi.loading}
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMessages = useApi<ChatRequestModel, MessagesResponseModel>(
    ChatApis.getMessages
  );

  //archive chat api
  const updateConversationApi = useApi<
    { status: string; conversationId: number },
    any
  >(ChatApis.updateConversation);

  async function handleUpdateConversationApi() {
    const {
      hasError,
      dataBody,
      errorBody
    } = await updateConversationApi.request([
      { status: "archived", conversationId: conversationId }
    ]);

    if (hasError || dataBody === undefined) {
      AppLog.logForcefully("Chat archive failed :  " + errorBody);
      SimpleToast.show(
        "Archive failed for conversation : " + conversationId
      );
      return;
    } else {
      navigation.goBack();
    }
  }

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

      AppLog.logForcefully(
        "current limit is : " + loadMessagesRequestModel.current.limit
      );
      const {
        hasError,
        dataBody,
        errorBody
      } = await loadMessages.request([loadMessagesRequestModel.current]);
      if (hasError || dataBody === undefined) {
        AppLog.logForcefully("Unable to find messages " + errorBody);
        setShouldShowProgressBar(false);
        return;
      } else {
        setMessages((prevState) => {
          return [
            ...(prevState === undefined ||
            loadMessagesRequestModel.current.page === 1
              ? []
              : prevState),
            ...dataBody.data!!
          ];
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
    AppLog.log("ChatThread => onEndReached is called");
    await handleLoadMessagesApi();
  }, [handleLoadMessagesApi]);

  function sentMessageToSocket(text: string) {
    let prepareMessage = {
      userId: user?.profile?.id,
      firstName: user?.profile?.firstName,
      lastName: user?.profile?.lastName,
      profilePicture: user?.profile?.profilePicture,
      conversationId: conversationId,
      text: text,
      readBy: [user?.profile?.id],
      createdAt: new Date(),
      updatedAt: new Date(),
      userType: "Student"
    };

    if (socket?.current?.connected ?? false) {
      socket!!.current!!.emit("sendMessage", prepareMessage);
    }

    loadMessagesRequestModel.current.limit =
      loadMessagesRequestModel.current.limit + 1;
    // @ts-ignore
    setMessages((prevState) => {
      return [
        ...[prepareMessage],
        ...(prevState === undefined ? [] : prevState)
      ];
    });
  }

  useEffect(() => {
    handleLoadMessagesApi().then().catch();
    connectSocket().then().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleLoadMessagesApi]);

  let socket = useRef<Socket>();
  const connectSocket = useCallback(async () => {
    socket.current = await SocketHelper.startConnection(
      "Bearer " + user?.authentication?.accessToken
    );

    socket.current.on("receiveMessage", (data) => {
      loadMessagesRequestModel.current.limit =
        loadMessagesRequestModel.current.limit + 1;
      setMessages((prevState) => {
        return [
          ...data.message,
          ...(prevState === undefined ? [] : prevState)
        ];
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChatThreadScreen
      data={messages}
      sentMessageApi={sentMessageToSocket}
      shouldShowProgressBar={shouldShowProgressBar}
      error={loadMessages.error}
      isAllDataLoaded={isAllDataLoaded}
      onEndReached={onEndReached}
    />
  );
};
