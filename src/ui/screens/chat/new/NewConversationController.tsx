import React, { FC, useLayoutEffect } from "react";
import { ChatParamsList } from "routes/ChatStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { NewConversationScreen } from "ui/screens/chat/new/NewConversationScreen";
import { ConversationItem } from "models/ConversationItem";
import Strings from "config/Strings";
import CircularTick from "assets/images/circular_tick.svg";
import Close from "assets/images/close.svg";
import { SPACE } from "config";
import { usePreferredTheme } from "hooks";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";

type ConversationNavigationProp = StackNavigationProp<
  ChatParamsList,
  "NewConversation"
>;

type Props = {};

const dummyData: ConversationItem[] = [
  {
    id: 1,
    name: "Rose King",
    userId: 1
  },
  {
    id: 2,
    name: "Lian Oneill",
    userId: 2
  }
];

export const NewConversationController: FC<Props> = () => {
  const navigation = useNavigation<ConversationNavigationProp>();

  const { themedColors } = usePreferredTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <HeaderTitle text={Strings.newConversation.title} />
      ),
      headerLeft: () => (
        <HeaderLeftTextWithIcon
          text={Strings.newConversation.titleLeft}
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
          text={Strings.newConversation.titleRight}
          onPress={() => {
            navigation.goBack();
          }}
          icon={(color, width, height) => (
            <CircularTick
              testID="icon"
              width={width}
              height={height}
              fill={themedColors.primary}
            />
          )}
        />
      ),
      headerLeftContainerStyle: {
        padding: SPACE.md
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  //const loadChatsApi = useApi<any, ChatsResponseModel>(ChatApis.getChats);

  /*  const handleLoadChatsApi = async (onComplete?: () => void) => {
    const { hasError, dataBody, errorBody } = await loadChatsApi.request(
      []
    );
    if (hasError || dataBody === undefined) {
      AppLog.logForcefully("Unable to find chats " + errorBody);
      return;
    } else {
      AppLog.logForcefully("Find chats" + errorBody);
      onComplete?.();
    }
  };*/

  const removeItemFromList = (
    items: ConversationItem[],
    itemToDelete: ConversationItem
  ) => {
    return items.filter((item) => item.id !== itemToDelete.id);
  };

  return (
    <NewConversationScreen
      data={dummyData}
      removeItem={removeItemFromList}
    />
  );
};
