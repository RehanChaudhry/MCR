import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Close from "assets/images/close.svg";
import Strings from "config/Strings";
import { usePreferredTheme } from "hooks";
import { ChatsResponseModel } from "models/api_responses/ChatsResponseModel";
import ChatItem from "models/ChatItem";
import React, { FC, useLayoutEffect, useState } from "react";
import { View } from "react-native";
import ChatApis from "repo/chat/ChatAPis";
import { useApi } from "repo/Client";
import { CommunityStackParamList } from "routes/CommunityStack";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import ProgressErrorView from "ui/components/templates/progress_error_view/ProgressErrorView";
import { CommentsView } from "ui/screens/home/comments/CommentsView";
import DataGenerator from "utils/DataGenerator";
import { AppLog } from "utils/Util";

type CommunityNavigationProp = StackNavigationProp<
  CommunityStackParamList,
  "Comments"
>;

type Props = {};

const dummyComments = DataGenerator.createComments();

export const CommentsController: FC<Props> = () => {
  const navigation = useNavigation<CommunityNavigationProp>();
  const [comments, setComments] = useState<ChatItem[]>(dummyComments);

  const { themedColors } = usePreferredTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerTitle: () => <HeaderTitle text={"Comments"} />,
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
      )
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadConversations = useApi<any, ChatsResponseModel>(
    ChatApis.getChats
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLoadCommentsApi = async (onComplete?: () => void) => {
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
      setComments(dataBody.data);
      onComplete?.();
    }
  };

  const sentMessage = (message: ChatItem) => {
    AppLog.log("message to sent : " + JSON.stringify(message));
  };

  function updateCommentsList(
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
      data={comments}
      isLoading={loadConversations.loading}
      error={loadConversations.error}
      errorView={(message) => {
        return (
          <View>
            <AppLabel text={message} />
          </View>
        );
      }}>
      <CommentsView data={comments} sentMessageApi={updateCommentsList} />
    </ProgressErrorView>
  );
};
