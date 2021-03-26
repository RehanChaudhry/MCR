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
import { SPACE } from "config";
import { usePreferredTheme } from "hooks";
import { useNavigation } from "@react-navigation/native";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import { Color, NumberProp, SvgProps } from "react-native-svg";
import { AppLog } from "utils/Util";

const Stack = createStackNavigator();

type Props = {};

type ChatListNavigationProp = StackNavigationProp<
  ChatParamsList,
  "ChatThread"
>;

export const ChatRoutes: FC<Props> = () => {
  const { themedColors } = usePreferredTheme();

  const navigation = useNavigation<ChatListNavigationProp>();

  const icon: SvgProps = (
    color?: Color,
    width?: NumberProp,
    height?: NumberProp
  ) => {
    AppLog.log("color : " + color + width + height); //just to avoid warning
    return (
      <CircularPLus
        testID="icon"
        width={width}
        height={height}
        fill={themedColors.primary}
      />
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <Hamburger />,
        headerRight: () => (
          <HeaderRightTextWithIcon
            text="create"
            icon={icon}
            onPress={() => {
              navigation.navigate("NewConversation");
            }}
          />
        ),
        headerRightContainerStyle: {
          padding: SPACE.md
        },
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
