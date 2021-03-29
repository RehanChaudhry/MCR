import React, { FC, useLayoutEffect, useState } from "react";
import { ChatThreadScreen } from "ui/screens/chat/thread/ChatThreadScreen";
import { ChatParamsList } from "routes/ChatStack";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import DataGenerator from "utils/DataGenerator";
import ChatItem from "models/ChatItem";
import { useApi } from "repo/Client";
import { ChatsResponseModel } from "models/api_responses/ChatsResponseModel";
import ChatApis from "repo/chat/ChatAPis";
import { AppLog } from "utils/Util";
import ProgressErrorView from "ui/components/templates/progress_error_view/ProgressErrorView";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { HomeDrawerParamList } from "routes";
import { COLORS, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import Archive from "assets/images/archive.svg";
import Close from "assets/images/close.svg";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import Strings from "config/Strings";
import { View } from "react-native";

type ChatListNavigationProp = StackNavigationProp<
  ChatParamsList,
  "ChatThread"
>;

type HomeDrawerNavigationProp = RouteProp<HomeDrawerParamList, "ChatList">;

type Props = {
  route: HomeDrawerNavigationProp;
  navigation: ChatListNavigationProp;
};

const dummyChats = DataGenerator.createChatThread();

export const ChatThreadController: FC<Props> = ({ route, navigation }) => {
  const myNavigation = useNavigation<typeof navigation>();
  const { params } = useRoute<typeof route>();
  const [chats, setChats] = useState<ChatItem[]>(dummyChats);

  const { themedColors } = usePreferredTheme();

  const getTitle = (): string => {
    // @ts-ignore
    const title = params.title;

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
          icon={(color, width, height) => (
            <Close
              testID="icon"
              width={width}
              height={height}
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
          icon={(color, width, height) => (
            <Archive
              testID="icon"
              width={width}
              height={height}
              fill={COLORS.red}
            />
          )}
        />
      )
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadConversations = useApi<any, ChatsResponseModel>(
    ChatApis.getChats
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLoadChatsApi = async (onComplete?: () => void) => {
    const {
      hasError,
      dataBody,
      errorBody
    } = await loadConversations.request([]);
    if (hasError || dataBody === undefined) {
      AppLog.logForcefully("Unable to find chats " + errorBody);
      return;
    } else {
      AppLog.logForcefully("Find chats" + errorBody);
      setChats(dataBody.data);
      onComplete?.();
    }
  };

  const sentMessage = (message: ChatItem) => {
    AppLog.log("message to sent : " + JSON.stringify(message));
  };

  function updateMessagesList(
    oldList: ChatItem[],
    message: ChatItem
  ): ChatItem[] {
    sentMessage(message);

    let newList: ChatItem[] = [];

    newList.push(message);
    newList.push(...oldList);

    return newList;
  }

  /* useEffect(() => {
    AppLog.logForcefully("inside useEffect()");
    handleLoadChatsApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);*/

  return (
    <ProgressErrorView
      data={chats}
      isLoading={loadConversations.loading}
      error={loadConversations.error}
      errorView={(message) => {
        return (
          <View>
            <AppLabel text={message} />
          </View>
        );
      }}>
      <ChatThreadScreen data={chats} sentMessageApi={updateMessagesList} />
    </ProgressErrorView>
  );
};
