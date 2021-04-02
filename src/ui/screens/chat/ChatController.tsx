import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { usePreferredTheme } from "hooks";
import React, { FC, useLayoutEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomBreadCrumbs, {
  Item
} from "ui/components/templates/bottom_bread_crumbs/BottomBreadCrumbs";
import { ChatBottomBarParamsList } from "routes/ChatBottomBar";
import { ChatRoutes } from "routes/ChatRoutes";
import { StackNavigationProp } from "@react-navigation/stack";
import CircularPLus from "assets/images/circular_plus.svg";
import { ChatRootStackParamList } from "routes/ChatRootStack";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import Strings from "config/Strings";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import { moderateScale } from "config/Dimens";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";

type ChatBottomTabNavProp = BottomTabNavigationProp<ChatBottomBarParamsList>;
type ChatRootNavigationProp = StackNavigationProp<ChatRootStackParamList>;

type Props = {};

const ChatController: FC<Props> = () => {
  const navigation = useNavigation<ChatBottomTabNavProp>();
  const rootNavigation = useNavigation<ChatRootNavigationProp>();

  const { themedColors } = usePreferredTheme();

  useLayoutEffect(() => {
    return rootNavigation.setOptions({
      headerLeft: () => <Hamburger />,
      headerRight: () => (
        <HeaderRightTextWithIcon
          text={Strings.chatListScreen.titleRight}
          onPress={() => {
            rootNavigation.navigate("NewConversation");
          }}
          icon={() => (
            <CircularPLus
              testID="icon"
              width={moderateScale(15)}
              height={moderateScale(15)}
              fill={themedColors.primary}
            />
          )}
        />
      ),
      headerTitleAlign: "center",
      headerTitle: () => (
        <HeaderTitle text={Strings.chatListScreen.title} />
      ),
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        shadowColor: "#00000000"
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootNavigation]);

  const _items: Item[] = [
    {
      title: "Active Conversations",
      onPress: () => {
        navigation.jumpTo("Active");
      }
    },
    {
      title: "Archived",
      onPress: () => {
        navigation.jumpTo("Archive");
      }
    }
  ];

  const itemsRef = useRef(_items);

  const theme = usePreferredTheme();
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ChatRoutes />
      <BottomBreadCrumbs data={itemsRef.current} />
      <View
        style={[
          styles.bottomSafeArea,
          {
            backgroundColor: theme.themedColors.background,
            height: safeAreaInsets.bottom
          }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1
  },
  bottomSafeArea: {
    width: "100%"
  }
});

export default ChatController;
