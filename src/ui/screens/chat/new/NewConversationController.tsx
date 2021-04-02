import React, { FC, useLayoutEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { NewConversationScreen } from "ui/screens/chat/new/NewConversationScreen";
import { ConversationItem } from "models/ConversationItem";
import Strings from "config/Strings";
import CircularTick from "assets/images/circular_tick.svg";
import Close from "assets/images/close.svg";
import { usePreferredTheme } from "hooks";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import { moderateScale } from "config/Dimens";
import { ChatRootStackParamList } from "routes/ChatRootStack";

type ConversationNavigationProp = StackNavigationProp<
  ChatRootStackParamList,
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

  const goBack = () => {
    const users: string[] = dummyData.reduce(
      (newArray: string[], item) => (newArray.push(item.name), newArray),
      []
    );

    navigation.goBack();
    navigation.navigate("ChatThread", { title: users });
  };

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
          text={Strings.newConversation.titleRight}
          onPress={() => {
            goBack();
          }}
          icon={() => (
            <CircularTick
              testID="icon"
              width={moderateScale(15)}
              height={moderateScale(15)}
              fill={themedColors.primary}
            />
          )}
        />
      ),
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        shadowColor: "#00000000"
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
