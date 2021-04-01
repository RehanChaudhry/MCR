import React, {
  FC,
  useCallback,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { ChatListScreen } from "ui/screens/chat/list/ChatListScreen";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { ChatsResponseModel } from "models/api_responses/ChatsResponseModel";
import { useApi } from "repo/Client";
import ChatApis from "repo/chat/ChatAPis";
import { AppLog } from "utils/Util";
import ChatItem from "models/ChatItem";
import DataGenerator from "utils/DataGenerator";
import { ChatParamsList } from "routes/ChatStack";
import ProgressErrorView from "ui/components/templates/progress_error_view/ProgressErrorView";
import { View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import Strings from "config/Strings";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";

type ChatListNavigationProp = StackNavigationProp<
  ChatParamsList,
  "ChatThread"
>;

type Props = {};

const dummyChats = DataGenerator.getChats();

export const ChatListController: FC<Props> = () => {
  const navigation = useNavigation<ChatListNavigationProp>();
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);
  const pageToReload = useRef<number>(1);
  const isFetchingInProgress = useRef(false);
  const [chats, setChats] = useState<ChatItem[]>(dummyChats);

  AppLog.log(
    "ChatListController() => " + pageToReload + isFetchingInProgress
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerTitle: () => (
        <HeaderTitle text={Strings.chatListScreen.title} />
      ),
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        shadowColor: "#00000000"
      }
    });
  }, [navigation]);

  const loadChatsApi = useApi<any, ChatsResponseModel>(ChatApis.getChats);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLoadChatsApi = async (onComplete?: () => void) => {
    const { hasError, dataBody, errorBody } = await loadChatsApi.request(
      []
    );
    if (hasError || dataBody === undefined) {
      AppLog.log("Unable to find chats " + errorBody);
      return;
    } else {
      AppLog.log("Find chats" + errorBody);
      setChats(dataBody.data);
      onComplete?.();
    }
  };

  /* useEffect(() => {
    AppLog.logForcefully("inside useEffect()");
    handleLoadChatsApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);*/

  const openChatThread = (item: ChatItem) => {
    navigation.navigate("ChatThread", { title: item.name });
  };

  const refreshCallback = useCallback(
    async (onComplete: () => void) => {
      /*pageToReload.current = 1;
        fetchCommunities().then(() => {
          onComplete();
        });*/

      setTimeout(() => {
        setChats(dummyChats);
        setIsAllDataLoaded(true);
        onComplete();
      }, 2000);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      /*pageToReload*/
    ]
  );

  const onEndReached = useCallback(
    () => {
      /* fetchCommunities();*/
    },
    [
      /*fetchCommunities*/
    ]
  );

  return (
    <ProgressErrorView
      data={chats}
      isLoading={loadChatsApi.loading}
      error={loadChatsApi.error}
      errorView={(message) => {
        return (
          <View>
            <AppLabel text={message} />
          </View>
        );
      }}>
      <ChatListScreen
        data={chats}
        onItemClick={openChatThread}
        pullToRefreshCallback={refreshCallback}
        onEndReached={onEndReached}
        isAllDataLoaded={isAllDataLoaded}
      />
    </ProgressErrorView>
  );
};
