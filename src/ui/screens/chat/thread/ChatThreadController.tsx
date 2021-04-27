import React, { FC, useLayoutEffect, useState } from "react";
import { ChatThreadScreen } from "ui/screens/chat/thread/ChatThreadScreen";
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
import ChatApis from "repo/chat/ChatApis";
import { AppLog } from "utils/Util";
import ProgressErrorView from "ui/components/templates/progress_error_view/ProgressErrorView";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { COLORS, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import Archive from "assets/images/archive.svg";
import Close from "assets/images/close.svg";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import Strings from "config/Strings";
import { View } from "react-native";
import { moderateScale } from "config/Dimens";
import { ChatRootStackParamList } from "routes/ChatRootStack";

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

const dummyChats = DataGenerator.createChatThread();

export const ChatThreadController: FC<Props> = ({ route, navigation }) => {
  const myNavigation = useNavigation<typeof navigation>();
  const { params }: any = useRoute<typeof route>();
  const [chats, setChats] = useState<ChatItem[]>(dummyChats);

  const { themedColors } = usePreferredTheme();

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
