import React, { FC, useState } from "react";
import ProgressErrorView from "ui/components/templates/progress_error_view/ProgressErrorView";
import { View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { AppLog } from "utils/Util";
import { MatchesStackParamList } from "routes/MatchesStack";
import { MatchInfoView } from "ui/screens/home/matches/match_info/MatchInfoView";
import DataGenerator from "utils/DataGenerator";
import MatchInfo from "models/MatchInfo";
import { SPACE } from "config";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";

type MatchesNavigationProp = StackNavigationProp<
  MatchesStackParamList,
  "MatchInfo"
>;

type Props = {};

const matchInfoData = DataGenerator.getMatchInfo();

const MatchInfoController: FC<Props> = () => {
  AppLog.log("Opening MatchesController");

  const navigation = useNavigation<MatchesNavigationProp>();
  navigation.setOptions({
    headerLeft: () => (
      <HeaderLeftTextWithIcon
        onPress={() => {
          navigation.pop();
        }}
      />
    ),
    headerLeftContainerStyle: {
      padding: SPACE.md
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [matchInfo, setMatchInfo] = useState<MatchInfo>(matchInfoData);

  return (
    <ProgressErrorView
      isLoading={false}
      error={undefined}
      errorView={(message) => {
        return (
          <View>
            <AppLabel text={message} />
          </View>
        );
      }}
      data={matchInfo}>
      <MatchInfoView matchInfo={matchInfo} />
    </ProgressErrorView>
  );
};

export default MatchInfoController;
