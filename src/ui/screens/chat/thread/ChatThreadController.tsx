import React, { FC } from "react";
import { ChatThreadScreen } from "ui/screens/chat/thread/ChatThreadScreen";

/*type DemoNavigationProp = StackNavigationProp<
  DemoStackParamList,
  "Switch"
>;*/

type Props = {};

export const ChatThreadController: FC<Props> = () => {
  // const navigation = useNavigation<DemoNavigationProp>();

  /*  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      title: "Switch Variations"
    });
  }, [navigation]);*/

  return <ChatThreadScreen />;
};
