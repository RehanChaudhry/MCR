import React, { FC, useLayoutEffect, useState } from "react";
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
import { SPACE, STRINGS } from "config";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import ProfileMatch from "models/ProfileMatch";
import EScreen from "models/enums/EScreen";

type MatchesNavigationProp = StackNavigationProp<
  MatchesStackParamList,
  "MatchInfo"
>;

type Props = {};

const matchInfoData = DataGenerator.getMatchInfo();

const MatchInfoController: FC<Props> = () => {
  AppLog.log("Opening MatchesController");

  const navigation = useNavigation<MatchesNavigationProp>();

  useLayoutEffect(() => {
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
  }, [navigation]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [matchInfo, setMatchInfo] = useState<MatchInfo>(matchInfoData);

  const moveToChatScreen = (profileMatch: ProfileMatch) => {
    // AppLog.log(
    //   "moveToChatScreen(), profile: " + JSON.stringify(profileMatch)
    // );
    navigation.navigate("Chat", {
      title: [profileMatch.userName ?? STRINGS.common.not_found]
    });
  };

  const moveToProfileScreen = (profileMatch: ProfileMatch) => {
    AppLog.log(
      "moveToProfileScreen(), profile: " + JSON.stringify(profileMatch)
    );
    navigation.navigate("Profile");
  };

  const moveToRoommateAgreementScreen = () => {
    // AppLog.log(
    //   "moveToRoommateAgreementScreen(), profile: " + JSON.stringify(profileMatch)
    // );
    navigation.navigate("RoommateAgreement");
  };

  const moveToUpdateProfileScreen = () => {
    // AppLog.log(
    //   "moveToUpdateProfileScreen(), profile: " + JSON.stringify(profileMatch)
    // );
    navigation.navigate("UpdateProfile", { isFrom: EScreen.MATCH_INFO });
  };

  const moveToQuestionnaireScreen = () => {
    // AppLog.log(
    //   "moveToQuestionnaireScreen(), profile: " + JSON.stringify(profileMatch)
    // );
    navigation.navigate("Questionnaire", { isFrom: EScreen.MATCH_INFO });
  };

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
      <MatchInfoView
        matchInfo={matchInfo}
        moveToChatScreen={moveToChatScreen}
        moveToProfileScreen={moveToProfileScreen}
        moveToRoommateAgreementScreen={moveToRoommateAgreementScreen}
        moveToUpdateProfileScreen={moveToUpdateProfileScreen}
        moveToQuestionnaireScreen={moveToQuestionnaireScreen}
      />
    </ProgressErrorView>
  );
};

export default MatchInfoController;
