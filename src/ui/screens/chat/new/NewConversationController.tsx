import React, { FC, useLayoutEffect } from "react";
import { ChatParamsList } from "routes/ChatStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { NewConversationScreen } from "ui/screens/chat/new/NewConversationScreen";
import { ConversationItem } from "models/ConversationItem";
import Strings from "config/Strings";
import { Pressable, StyleSheet } from "react-native";
import CircularTick from "assets/images/circular_tick.svg";
import Close from "assets/images/close.svg";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
import { FONT_SIZE, SPACE } from "config";
import { moderateScale } from "config/Dimens";
import { usePreferredTheme } from "hooks";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";

type conversationNavigationProp = StackNavigationProp<
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
  const navigation = useNavigation<conversationNavigationProp>();

  const { themedColors } = usePreferredTheme();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <HeaderTitle text={Strings.newConversation.title} />
      ),
      headerLeft: () => (
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.container}>
          <Close width={23} height={23} fill={themedColors.primary} />
          <AppLabel
            text="Close"
            weight="semi-bold"
            style={styles.headerTextGrey(themedColors)}
          />
        </Pressable>
      ),
      headerRight: () => (
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.container}>
          <AppLabel
            text="Done"
            weight="semi-bold"
            style={styles.headerText(themedColors)}
          />
          <CircularTick
            width={23}
            height={23}
            fill={themedColors.primary}
            style={styles.iconRight}
          />
        </Pressable>
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: (theme: ColorPalette) => {
    return {
      color: theme.primary,
      fontSize: FONT_SIZE.sm
    };
  },
  headerTextGrey: (theme: ColorPalette) => {
    return {
      marginStart: SPACE.xxsm,
      color: theme.label,
      fontSize: FONT_SIZE.sm
    };
  },
  iconRight: { marginStart: moderateScale(SPACE.xxsm) }
});
