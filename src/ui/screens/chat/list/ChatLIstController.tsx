import React, { FC } from "react";
import { ChatListScreen } from "ui/screens/chat/list/ChatListScreen";

/*type DemoNavigationProp = StackNavigationProp<
  DemoStackParamList,
  "Switch"
>;*/

type Props = {};

export const ChatListController: FC<Props> = () => {
  // const navigation = useNavigation<DemoNavigationProp>();

  /*  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      title: "Switch Variations"
    });
  }, [navigation]);*/

  return <ChatListScreen />;
};
