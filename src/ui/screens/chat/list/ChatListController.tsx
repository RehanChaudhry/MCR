import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { ChatListScreen } from "ui/screens/chat/list/ChatListScreen";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
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

type ChatRootNavigationProp = StackNavigationProp<ChatRootStackParamList>;

type Props = {};

export const ChatListController: FC<Props> = () => {
  const navigation = useNavigation<ChatRootNavigationProp>();
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(true);
  const [shouldShowProgressBar, setShouldShowProgressBar] = useState(
    false
  );
  const isFetchingInProgress = useRef(false);
  const [chats, setChats] = useState<Conversation[] | undefined>(
    undefined
  );

  const loadChatsApi = useApi<ChatRequestModel, ChatResponseModel>(
    ChatApis.getChats
  );

  const requestModel = useRef<ChatRequestModel>({
    paginate: true,
    page: 1,
    limit: 10,
    orderBy: ESortBy.UPDATED_AT,
    order: ESortOrder.DSC
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
      onComplete?.();
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
    AppLog.logForcefully("ChatList => onEndReached is called");
    await handleLoadChatsApi();
  }, [handleLoadChatsApi]);

  useEffect(() => {
    handleLoadChatsApi().then().catch();
  }, [handleLoadChatsApi]);

  function performSearch(textToSearch: string) {
    setChats(
      chats!!.filter((obj: Conversation) => {
        return Object.values(obj).some((v) =>
          `${v}`.toLowerCase().includes(`${textToSearch}`.toLowerCase())
        );
      })
    );
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
