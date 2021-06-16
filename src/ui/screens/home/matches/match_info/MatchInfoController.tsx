import React, {
  FC,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import ProgressErrorView from "ui/components/templates/progress_error_view/ProgressErrorView";
import { View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { AppLog } from "utils/Util";
import { MatchesStackParamList } from "routes/MatchesStack";
import { MatchInfoView } from "ui/screens/home/matches/match_info/MatchInfoView";
import { STRINGS } from "config";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import RelationModel from "models/RelationModel";
import EScreen from "models/enums/EScreen";
import { useAuth } from "hooks";
import { useApi } from "repo/Client";
import ProfileApis from "repo/auth/ProfileApis";
import { MatchInfoApiResponseModel } from "models/api_responses/MatchInfoApiResponseModel";
import RelationApiResponseModel from "models/api_responses/RelationApiResponseModel";
import { PaginationParamsModel } from "models/api_requests/PaginationParamsModel";
import RelationApis from "repo/home/RelationApis";

type MatchesNavigationProp = StackNavigationProp<
  MatchesStackParamList,
  "MatchInfo"
>;

type Props = {};

const MatchInfoController: FC<Props> = () => {
  AppLog.log(() => "Opening MatchesController");

  const navigation = useNavigation<MatchesNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftTextWithIcon
          onPress={() => {
            navigation.pop();
          }}
        />
      )
    });
  }, [navigation]);

  const { user } = useAuth();

  // Match Info API
  const matchInfoApi = useApi<any, MatchInfoApiResponseModel>(
    ProfileApis.getMatchInfo
  );
  // MyRoommates API
  const roommatesApi = useApi<
    PaginationParamsModel,
    RelationApiResponseModel
  >(RelationApis.relations);

  const [matchInfo, setMatchInfo] = useState<MatchInfoApiResponseModel>();
  const [roommate, setRoommate] = useState<RelationApiResponseModel>();

  const moveToChatScreen = (profileMatch: RelationModel) => {
    AppLog.logForcefully(
      () => "moveToChatScreen(), profile: " + JSON.stringify(profileMatch)
    );

    navigation.push("Chat", {
      title: [
        `${profileMatch.user?.firstName} ${profileMatch.user?.lastName}` ??
          STRINGS.common.not_found
      ]
    });
  };

  const moveToProfileScreen = (profileMatch: RelationModel) => {
    AppLog.log(
      () =>
        "moveToProfileScreen(), profile: " + JSON.stringify(profileMatch)
    );
    navigation.navigate("Profile", {
      isFrom: EScreen.MATCH_INFO,
      updateProfile: true
    });
  };

  const moveToRoommateAgreementScreen = () => {
    navigation.navigate("RoommateAgreement", {
      isFrom: EScreen.MATCH_INFO
    });
  };

  const moveToUpdateProfileScreen = () => {
    navigation.navigate("UpdateProfile", { isFrom: EScreen.MATCH_INFO });
  };

  const moveToQuestionnaireScreen = () => {
    navigation.navigate("Questionnaire", { isFrom: EScreen.MATCH_INFO });
  };

  const handleGetMatchInfoApi = async () => {
    const { hasError, dataBody, errorBody } = await matchInfoApi.request(
      []
    );
    if (hasError || dataBody === undefined) {
      // Alert.alert("Unable to find questions " + errorBody);
      AppLog.log(() => "Unable to find MatchInfo " + errorBody);
      return;
    } else {
      setMatchInfo(dataBody);
      AppLog.log(() => "MatchInfoData" + JSON.stringify(dataBody.data));
    }
  };

  const requestModel = useRef<PaginationParamsModel>({
    type: "roommates"
  });

  const handleGetRoommatesApi = async () => {
    const { hasError, dataBody, errorBody } = await roommatesApi.request([
      requestModel.current
    ]);
    if (hasError || dataBody === undefined) {
      // Alert.alert("Unable to find questions " + errorBody);
      AppLog.log(() => "Unable to find MatchInfo " + errorBody);
      return;
    } else {
      setRoommate(dataBody);
      AppLog.log(() => "MyRoommatesData" + JSON.stringify(dataBody.data));
    }
  };

  useEffect(() => {
    handleGetMatchInfoApi();
    handleGetRoommatesApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProgressErrorView
      isLoading={matchInfoApi.loading || roommatesApi.loading}
      error={matchInfoApi.error || roommatesApi.error}
      errorView={(message) => {
        return (
          <View>
            <AppLabel text={message} />
          </View>
        );
      }}
      data={matchInfo && roommate}>
      <MatchInfoView
        userProfile={user?.profile!}
        matchInfo={matchInfo?.data!!}
        moveToChatScreen={moveToChatScreen}
        moveToProfileScreen={moveToProfileScreen}
        moveToRoommateAgreementScreen={moveToRoommateAgreementScreen}
        moveToUpdateProfileScreen={moveToUpdateProfileScreen}
        moveToQuestionnaireScreen={moveToQuestionnaireScreen}
        roommates={roommate?.data}
      />
    </ProgressErrorView>
  );
};

export default MatchInfoController;
