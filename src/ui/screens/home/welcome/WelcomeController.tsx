import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { WelcomeView } from "ui/screens/home/welcome/WelcomeView";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { usePreferredTheme } from "hooks";
import RightArrow from "assets/images/right.svg";
import { WelcomeStackParamList } from "routes/WelcomeStack";

type WelcomeNavigationProp = StackNavigationProp<
  WelcomeStackParamList,
  "Welcome"
>;

type Props = {};

const WelcomeController: FC<Props> = () => {
  const navigation = useNavigation<WelcomeNavigationProp>();
  const theme = usePreferredTheme();

  const moveToNextScreen = () => {
    navigation.navigate("Questionnaire");
  };

  navigation.setOptions({
    headerRight: () => (
      <HeaderRightTextWithIcon
        onPress={moveToNextScreen}
        text="Skip"
        textStyle={{ color: theme.themedColors.interface["700"] }}
        icon={() => {
          return (
            <RightArrow
              width={20}
              height={20}
              fill={theme.themedColors.interface["700"]}
            />
          );
        }}
      />
    ),
    headerTitleAlign: "center",
    headerTitle: () => <HeaderTitle text="Watch Video" />
  });

  return <WelcomeView />;
};

export default WelcomeController;
