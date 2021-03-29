import React, { FC } from "react";
import {
  createStackNavigator,
  StackNavigationProp
} from "@react-navigation/stack";
import { HomeDrawer } from "routes/HomeDrawer";
import { ChatParamsList, ChatStack } from "routes/ChatStack";
import { ChatListController } from "ui/screens/chat/list/ChatListController";
import { ChatThreadController } from "ui/screens/chat/thread/ChatThreadController";
import { NewConversationController } from "ui/screens/chat/new/NewConversationController";
import CircularPLus from "assets/images/circular_plus.svg";
import { usePreferredTheme } from "hooks";
import { useNavigation } from "@react-navigation/native";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import Strings from "config/Strings";

const Stack = createStackNavigator();

type Props = {};

type ChatListNavigationProp = StackNavigationProp<
  ChatParamsList,
  "ChatThread"
>;

export const ChatRoutes: FC<Props> = () => {
  const { themedColors } = usePreferredTheme();

  const navigation = useNavigation<ChatListNavigationProp>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <Hamburger />,
        headerRight: () => (
          <HeaderRightTextWithIcon
            text={Strings.chatListScreen.titleRight}
            onPress={() => {
              navigation.navigate("NewConversation");
            }}
            icon={(color, width, height) => (
              <CircularPLus
                testID="icon"
                width={width}
                height={height}
                fill={themedColors.primary}
              />
            )}
          />
        ),
        headerTitleAlign: "center"
      }}>
      <HomeDrawer.Screen name="ChatList" component={ChatListController} />
      <ChatStack.Screen
        name="ChatThread"
        component={ChatThreadController}
      />
      <ChatStack.Screen
        name="NewConversation"
        component={NewConversationController}
      />
    </Stack.Navigator>
  );
};
