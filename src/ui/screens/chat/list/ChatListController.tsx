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
import AnnouncementRequestModel from "models/api_requests/AnnouncementRequestModel";

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

  const loadChatsApi = useApi<any, ChatResponseModel>(ChatApis.getChats);

  const requestModel = useRef<AnnouncementRequestModel>({
    paginate: true,
    page: 1,
    limit: 10
  });

  const handleLoadChatsApi = useCallback(async () => {
    setShouldShowProgressBar(true);
    isFetchingInProgress.current = true;

    const { hasError, dataBody, errorBody } = await loadChatsApi.request(
      []
    );

    setShouldShowProgressBar(false);
    isFetchingInProgress.current = true;

    if (hasError || dataBody === undefined) {
      AppLog.log("Unable to find chats " + errorBody);
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

      /*  setIsAllDataLoaded(
        dataBody.pagination.current === dataBody.pagination.last
      );*/
    }
  }, [loadChatsApi]);

  /* useEffect(() => {
    AppLog.logForcefully("inside useEffect()");
    handleLoadChatsApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);*/

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
      /*pageToReload.current = 1;*/
      setTimeout(() => {
        // setChats(dummyChats);
        setIsAllDataLoaded(false);
        onComplete?.();
        /* handleLoadChatsApi()
          .then(() => {
            onComplete?.();
          })
          .catch();*/
      }, 2000);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      /*pageToReload*/
    ]
  );

  const onEndReached = useCallback(() => {
    AppLog.log("onEndReached()=> ");
    //  handleLoadChatsApi().then().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleLoadChatsApi]);

  useEffect(() => {
    handleLoadChatsApi();
  }, [handleLoadChatsApi]);
  return (
    <ChatListScreen
      isLoading={loadChatsApi.loading}
      error={loadChatsApi.error}
      data={chats}
      onItemClick={openChatThread}
      pullToRefreshCallback={refreshCallback}
      onEndReached={onEndReached}
      isAllDataLoaded={isAllDataLoaded}
    />
  );
};
