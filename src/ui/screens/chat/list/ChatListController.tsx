import React, {
  FC,
  SetStateAction,
  useCallback,
  useContext,
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
import { MyFriendsContext } from "ui/screens/home/friends/AppDataProvider";
import { ChatHelper } from "utils/ChatHelper";

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

  const { user } = useAuth();

  const {
    activeConversations,
    setActiveConversations,
    inActiveConversations,
    setInActiveConversations
  } = useContext(MyFriendsContext);

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
      AppLog.logForComplexMessages(
        () => "ChatList => Unable to find chats " + errorBody
      );
      setShouldShowProgressBar(false);
      return;
    } else {
      setChatsData((prevState) => {
        return _.uniqBy(
          [
            ...(prevState === undefined || requestModel.current.page === 1
              ? []
              : (prevState as Conversation[])),
            ...dataBody.data!!
          ],
          (item) => item.id
        );
      });

      setIsAllDataLoaded(
        dataBody.data!!.length < requestModel.current.limit
      );

      requestModel.current.page = (requestModel?.current?.page ?? 0) + 1;

      isFetchingInProgress.current = false;
      setShouldShowProgressBar(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadChatsApi]);

  function setChatsData(
    stateData?: SetStateAction<Conversation[] | undefined>
  ) {
    if (route.params.status === "active") {
      setActiveConversations?.(stateData);
    } else {
      // @ts-ignore
      setInActiveConversations?.(stateData);
    }
  }

  const openChatThread = (item: Conversation) => {
    //check if conversation is read by current user if not fire  event to notify
    // other users you have read the message
    if (
      _.isArray(item.message) &&
      item.message.length > 0 &&
      item.message[0].readBy.find((id) => id === user?.profile?.id!!) ===
        undefined
    ) {
      if (socket?.current?.connected ?? false) {
        //emir read message event
        socket!!.current!!.emit("readByUser", {
          conversationId: item.id
        });
      }

      //update list with read status
      // @ts-ignore
      setChatsData((prevState) => {
        let chatsCopy = _.clone(prevState) as Conversation[];
        _.forEach(chatsCopy, (p) => {
          if (p.id === item.id && p.message.length > 0) {
            p.message[0].readBy.length > 0
              ? p.message[0].readBy.push(user?.profile?.id!!)
              : (p.message[0].readBy = [user?.profile?.id!!]);
          }
        });

        return _.uniqBy(chatsCopy, (_item) => _item.id);
      });
    }

    navigation.navigate("ChatThread", {
      title: item.conversationUsers!!.reduce(
        (newArray: string[], _item) => (
          newArray.push(_item.firstName + " " + _item.lastName), newArray
        ),
        []
      ),
      conversationId: item.id,
      isArchived: params?.status !== "Active"
    });
  };

  const refreshCallback = useCallback(
    async (onComplete?: () => void) => {
      requestModel.current.page = 1;
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
    AppLog.logForComplexMessages(
      () => "ChatList => onEndReached is called"
    );
    await handleLoadChatsApi();
  }, [handleLoadChatsApi]);

  let socket = useRef<Socket>();
  const connectSocket = useCallback(async () => {
    socket.current = await SocketHelper.getInstance(
      "Bearer " + user?.authentication?.accessToken
    );

    socket?.current?.on("joinedUser", (userId) => {
      ChatHelper.activeInActiveUsers(
        userId,
        true,
        setActiveConversations,
        setInActiveConversations
      );
    });

    socket?.current?.on("leftUser", (userId) => {
      ChatHelper.activeInActiveUsers(
        userId,
        false,
        setActiveConversations,
        setInActiveConversations
      );
    });

    //listen to receive message event
    socket?.current?.on("receiveMessage", (data) => {
      if (params?.status === "active") {
        let itemFoundInArchiveChats = false;
        setInActiveConversations?.((prevState: any) => {
          if (
            prevState?.find(
              (prevItem: Conversation) => prevItem.id === data.id
            ) !== undefined
          ) {
            //does not update this conversation as its present in archived chats
            itemFoundInArchiveChats = true;
          }
          return prevState;
        });
        if (itemFoundInArchiveChats) {
          //if item is already found in archive chats do not do anything
          return;
        }

        setChatsData((prevState: any) => {
          let chatsCopy = _.cloneDeep(prevState);
          if (chatsCopy?.length ?? -1 > 0) {
            let findIndex = chatsCopy?.findIndex(
              (item: any) => item.id === data.id
            );

            if (findIndex !== -1) {
              //remove item at index
              chatsCopy?.splice(findIndex!!, 1);

              //add item at index 0
              chatsCopy?.splice(0, 0, data);

              return _.uniqBy(chatsCopy, (item) => item.id);
            } else {
              return [data, ...chatsCopy!!];
            }
          } else {
            return [data];
          }
        });
      } else {
        setInActiveConversations?.((prevState: any) => {
          let chatsCopy = _.cloneDeep(prevState);
          if (chatsCopy?.length ?? -1 > 0) {
            let findIndex = chatsCopy?.findIndex(
              (item: any) => item.id === data.id
            );

            if (findIndex !== -1) {
              //remove item at index
              chatsCopy?.splice(findIndex!, 1);

              //add item at index 0
              chatsCopy?.splice(0, 0, data);

              return chatsCopy;
            } else {
              return prevState;
            }
          } else {
            return prevState;
          }
        });
      }
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
      requestModel.current.keyword = textToSearch;
      setChatsData(undefined);
      handleLoadChatsApi();
    }, 10);
  }

  return (
    <ChatListScreen
      shouldShowProgressBar={shouldShowProgressBar}
      error={loadChatsApi.error}
      isAllDataLoaded={isAllDataLoaded}
      data={
        route.params.status === "active"
          ? activeConversations
          : inActiveConversations
      }
      onItemClick={openChatThread}
      pullToRefreshCallback={refreshCallback}
      onEndReached={onEndReached}
      performSearch={performSearch}
    />
  );
};
