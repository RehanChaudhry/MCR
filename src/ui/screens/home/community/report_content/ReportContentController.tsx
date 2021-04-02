import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { usePreferredTheme } from "hooks";
import React, { FC, useLayoutEffect } from "react";
import { CommunityStackParamList } from "routes/CommunityStack";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { ReportContentView } from "ui/screens/home/community/report_content/ReportContentView";

type CommunityNavigationProp = StackNavigationProp<
  CommunityStackParamList,
  "ReportContent"
>;

type Props = {};

const ReportContentController: FC<Props> = () => {
  const navigation = useNavigation<CommunityNavigationProp>();
  const theme = usePreferredTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftTextWithIcon
          onPress={() => {
            navigation.pop();
          }}
        />
      ),
      headerTitleAlign: "center",
      headerTitle: () => <HeaderTitle text="Report Content" />
    });
  }, [navigation, theme]);

  const closeScreen = () => {
    navigation.goBack();
  };

  return <ReportContentView closeScreen={closeScreen} />;
};

export default ReportContentController;
