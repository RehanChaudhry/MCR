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
import ChatResponseModel from "models/api_responses/ChatsResponseModel";
import ChatApis from "repo/chat/ChatApis";
import { AppLog } from "utils/Util";
import { COLORS, SPACE } from "config";
import { usePreferredTheme } from "hooks";
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

  AppLog.log("remove warning " + conversationId);

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
          onPress={() => {
            navigation.goBack();
          }}
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

  const requestModel = useRef<ChatRequestModel>({
    paginate: true,
    page: 1,
    limit: 10,
    orderBy: ESortBy.UPDATED_AT,
    order: ESortOrder.DSC
  });

  const handleLoadMessagesApi = useCallback(
    async (onComplete?: () => void) => {
      setShouldShowProgressBar(true);
      isFetchingInProgress.current = true;
      const {
        hasError,
        dataBody,
        errorBody
      } = await loadMessages.request([requestModel.current]);
      if (hasError || dataBody === undefined) {
        AppLog.logForcefully("Unable to find messages " + errorBody);
        setShouldShowProgressBar(false);
        return;
      } else {
        setMessages((prevState) => {
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

        onComplete?.();
        requestModel.current.page = (requestModel?.current?.page ?? 0) + 1;

        isFetchingInProgress.current = false;
        setShouldShowProgressBar(false);
      }
    },
    [loadMessages]
  );

  const sentMessageApi = useApi<Object, ChatResponseModel>(
    ChatApis.sentMessage
  );

  const sentMessage = useCallback(
    async (message: string) => {
      AppLog.log("message to sent : " + JSON.stringify(message));

      const {
        hasError,
        dataBody,
        errorBody
      } = await sentMessageApi.request([
        {
          conversationId: conversationId,
          text: message
        }
      ]);

      if (
        hasError ||
        dataBody === undefined ||
        dataBody.data === undefined
      ) {
        AppLog.log("Unable to sent message " + errorBody);
        return;
      } else {
      }
    },
    [conversationId, sentMessageApi]
  );

  function updateMessagesList(text: string) {
    sentMessage(text).then().catch();

    let newList: Message[] | undefined = [];

    // newList.push(messages);
    // newList.push(messages);
    setMessages(newList);
  }

  useEffect(() => {
    handleLoadMessagesApi().then().catch();
  }, [handleLoadMessagesApi]);

  return (
    <ChatThreadScreen
      data={messages}
      sentMessageApi={updateMessagesList}
      shouldShowProgressBar={shouldShowProgressBar}
      error={loadMessages.error}
      isAllDataLoaded={isAllDataLoaded}
    />
  );
};
