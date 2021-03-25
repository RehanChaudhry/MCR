import React, { FC } from "react";
import ProgressErrorView from "ui/components/templates/progress_error_view/ProgressErrorView";
import { View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { AppLog } from "utils/Util";
import { MatchesStackParamList } from "routes/MatchesStack";
import { MatchInfoView } from "ui/screens/home/matches/match_info/MatchInfoView";

type MatchesNavigationProp = StackNavigationProp<
  MatchesStackParamList,
  "MatchInfo"
>;

type Props = {};

const MatchInfoController: FC<Props> = () => {
  AppLog.log("Opening MatchesController");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation = useNavigation<MatchesNavigationProp>();

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
      data={[]}>
      <MatchInfoView />
    </ProgressErrorView>
  );
};

export default MatchInfoController;
