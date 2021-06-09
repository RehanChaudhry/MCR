import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { ChatListScreen } from "ui/screens/chat/list/ChatListScreen";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { useApi } from "repo/Client";
import ChatApis from "repo/chat/ChatApis";
import { AppLog } from "utils/Util";
import { ChatRootStackParamList } from "routes/ChatRootStack";
import ChatResponseModel, {
  Conversation
} from "models/api_responses/ChatsResponseModel";
import ChatRequestModel, {
  ESortBy,
  ESortOrder
} from "models/api_requests/chatRequestModel";
import { ChatBottomBarParamsList } from "routes/ChatBottomBar";
import { Socket } from "socket.io-client";
import { SocketHelper } from "utils/SocketHelper";
import { useAuth } from "hooks";
import _ from "lodash";

type ChatRootNavigationProp = StackNavigationProp<ChatRootStackParamList>;

type ChatBottomBarNavigationProp = RouteProp<
  ChatBottomBarParamsList,
  "Active" | "Archive"
>;

type Props = {
  route: ChatBottomBarNavigationProp;
  chatRootNavigation: ChatRootNavigationProp;
};

export const ChatListController: FC<Props> = ({
  route,
  chatRootNavigation
}) => {
  const navigation = useNavigation<typeof chatRootNavigation>();
  const { params }: any = useRoute<typeof route>();
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(true);
  const [shouldShowProgressBar, setShouldShowProgressBar] = useState(
    false
  );
  const isFetchingInProgress = useRef(false);
  const [chats, setChats] = useState<Conversation[] | undefined>(
    undefined
  );

  const { user } = useAuth();
  const loadChatsApi = useApi<ChatRequestModel, ChatResponseModel>(
    ChatApis.getChats
  );

  const requestModel = useRef<ChatRequestModel>({
    paginate: true,
    page: 1,
    limit: 10,
    orderBy: ESortBy.UPDATED_AT,
    order: ESortOrder.DSC,
    status: params.status
  });

  const handleLoadChatsApi = useCallback(async () => {
    setShouldShowProgressBar(true);
    isFetchingInProgress.current = true;

    const { hasError, dataBody, errorBody } = await loadChatsApi.request([
      requestModel.current
    ]);

    if (
      hasError ||
      dataBody === undefined ||
      dataBody.data === undefined
    ) {
      AppLog.log("ChatList => Unable to find chats " + errorBody);
      return;
    } else {
      setChats((prevState) => {
        return [
          ...(prevState === undefined || requestModel.current.page === 1
            ? []
            : prevState),
          ...dataBody.data!!
        ];
      });

      setIsAllDataLoaded(
        dataBody.data!!.length < requestModel.current.limit
      );

      requestModel.current.page = (requestModel?.current?.page ?? 0) + 1;

      isFetchingInProgress.current = false;
      setShouldShowProgressBar(false);
    }
  }, [loadChatsApi]);

  const openChatThread = (item: Conversation) => {
    if (
      item.message.length > 0 &&
      item.message[0].readBy.find((id) => id === user?.profile?.id!!) ===
        undefined
    ) {
      if (socket?.current?.connected ?? false) {
        AppLog.logForcefully("inside socket");
        socket!!.current!!.emit("readByUser", {
          conversationId: item.id
        });
      }

      // @ts-ignore
      setChats((prevState) => {
        let chatsCopy = _.clone(prevState);

        _.each(chatsCopy, (p) => {
          if (p.message.length > 0) {
            p.message[0].readBy.length > 0
              ? p.message[0].readBy.push(user?.profile?.id!!)
              : (p.message[0].readBy = [user?.profile?.id!!]);
          }
        });

        return chatsCopy;
      });
    }

    navigation.navigate("ChatThread", {
      title: item.conversationUsers!!.reduce(
        (newArray: string[], _item) => (
          newArray.push(_item.firstName + " " + _item.lastName), newArray
        ),
        []
      ),
      conversationId: item.id
    });
  };

  const refreshCallback = useCallback(
    async (onComplete?: () => void) => {
      requestModel.current.page = 1;
      requestModel.current.limit = 10;
      handleLoadChatsApi()
        .then(() => {
          onComplete?.();
        })
        .catch(() => {
          onComplete?.();
        });
    },
    [handleLoadChatsApi]
  );

  const onEndReached = useCallback(async () => {
    AppLog.log("ChatList => onEndReached is called");
    await handleLoadChatsApi();
  }, [handleLoadChatsApi]);

  let socket = useRef<Socket>();
  const connectSocket = useCallback(async () => {
    socket.current = await SocketHelper.startConnection(
      "Bearer " + user?.authentication?.accessToken
    );

    socket.current.on("receiveMessage", (data) => {
      setChats((prevState) => {
        let chatsCopy = _.cloneDeep(prevState);
        if (chatsCopy?.length ?? -1 > 0) {
          let findIndex = chatsCopy?.findIndex(
            (item) => item.id === data.id
          );

          if (findIndex !== -1) {
            //remove item at index
            chatsCopy?.splice(findIndex!!, 1);

            //add item at index 0
            chatsCopy?.splice(0, 0, data);

            return chatsCopy;
          } else {
            requestModel.current.limit = requestModel.current.limit + 1;
            return [data, ...chatsCopy!!];
          }
        } else {
          requestModel.current.limit = requestModel.current.limit + 1;
          return [data];
        }
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleLoadChatsApi().then().catch();
    connectSocket().then().catch();
  }, [handleLoadChatsApi, connectSocket]);

  // eslint-disable-next-line no-undef
  let timeOutId: NodeJS.Timeout;
  async function performSearch(textToSearch: string) {
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      requestModel.current.page = 1;
      requestModel.current.limit = 10;
      requestModel.current.keyword = textToSearch;
      setChats(undefined);
      handleLoadChatsApi();
    }, 10);
  }

  return (
    <ChatListScreen
      shouldShowProgressBar={shouldShowProgressBar}
      error={loadChatsApi.error}
      isAllDataLoaded={isAllDataLoaded}
      data={chats}
      onItemClick={openChatThread}
      pullToRefreshCallback={refreshCallback}
      onEndReached={onEndReached}
      performSearch={performSearch}
    />
  );
};
