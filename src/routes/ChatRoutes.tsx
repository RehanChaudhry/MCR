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
import { Pressable, StyleSheet } from "react-native";
import CircularPLus from "assets/images/circular_plus.svg";
import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import { useNavigation } from "@react-navigation/native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { moderateScale } from "config/Dimens";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";

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
          <Pressable
            onPress={() => {
              navigation.navigate("NewConversation");
            }}
            style={styles.container}>
            <AppLabel
              text="Create"
              weight="semi-bold"
              style={styles.headerText(themedColors)}
            />
            <CircularPLus
              width={23}
              height={23}
              fill={themedColors.primary}
              style={styles.iconRight}
            />
          </Pressable>
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
  iconRight: { marginStart: moderateScale(SPACE.xxsm) }
});
