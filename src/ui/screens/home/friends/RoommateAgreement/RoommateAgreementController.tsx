import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import RoomAgreementApis from "repo/auth/RoomAgreementApis";
import RoommateAgreementView from "ui/screens/home/friends/RoommateAgreement/RoommateAgreementView";
import { StackNavigationProp } from "@react-navigation/stack";
import { RoommateAgreementStackParamList } from "routes/FriendsStack";
import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import { AppLog } from "utils/Util";
import InfoCircle from "assets/images/info_circle.svg";
import { useAuth, usePreferredTheme } from "hooks";
import { FriendsRootStackParamList } from "routes/FriendsRootStack";
import EScreen from "models/enums/EScreen";
import { MatchesStackParamList } from "routes/MatchesStack";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import { ProfileRootStackParamList } from "routes/ProfileRootStack";
import { useApi } from "repo/Client";
import { AgreementAnswersRequestModel } from "models/api_requests/AgreementAnswersRequestModel";
import {
  AgreementAnswerResponseModel,
  AgreementData
} from "models/api_responses/AgreementAnswerResponseModel";
import {
  AgreementField,
  GetAgreementApi
} from "models/api_requests/GetAgreementApi";
import SimpleToast from "react-native-simple-toast";
import { STRINGS } from "config";

type Props = {};

type RoommateAgreementNavigationProp = StackNavigationProp<
  RoommateAgreementStackParamList,
  "RoommateAgreement"
>;

type FriendsNavigationProp = StackNavigationProp<
  FriendsRootStackParamList,
  "AgreementDetails"
>;

type MatchesNavigationProp = StackNavigationProp<
  MatchesStackParamList,
  "AgreementDetails"
>;

type ProfileRootRouteProp = RouteProp<
  MatchesStackParamList,
  "RoommateAgreement"
>;

type ViewProfileNavigationProp = StackNavigationProp<
  ProfileRootStackParamList,
  "Profile"
>;

const RoommateAgreementController: FC<Props> = () => {
  const navigation = useNavigation<RoommateAgreementNavigationProp>();
  const friendsNavigation = useNavigation<FriendsNavigationProp>();
  const matchesNavigation = useNavigation<MatchesNavigationProp>();
  const navigationViewProfile = useNavigation<ViewProfileNavigationProp>();
  const route = useRoute<ProfileRootRouteProp>();
  const [agreementDialog, setAgreementDialog] = useState<boolean>(false);
  const { user } = useAuth();
  const { themedColors } = usePreferredTheme();
  const submitAnswerRequest = useRef<AgreementAnswersRequestModel>({});
  const [roommateData, setRoommateData] = useState<AgreementField[]>();
  const agreementPartiesData = useRef<AgreementData>({});

  const roommateUpdateApi = useApi<
    AgreementAnswersRequestModel,
    AgreementAnswerResponseModel
  >(RoomAgreementApis.updateAgreement);

  const getAgreementApi = useApi<number, GetAgreementApi>(
    RoomAgreementApis.getAgreement
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerTitle: () => <HeaderTitle text="Roommate Agreement" />,
      headerLeft: () =>
        route.params.isFrom !== EScreen.HOME ? (
          <HeaderLeftTextWithIcon
            onPress={() => {
              navigation.pop();
            }}
          />
        ) : (
          <Hamburger />
        ),
      headerRight: () => (
        <HeaderRightTextWithIcon
          text={"More"}
          onPress={() => {
            if (
              agreementPartiesData.current.roommateAgreementParties !==
                undefined &&
              agreementPartiesData.current.roommateAgreementParties!!
                .length > 0
            ) {
              matchesNavigation.navigate("AgreementDetails", {
                agreementData: agreementPartiesData.current
              });
            } else {
              SimpleToast.show(
                STRINGS.roommateAgreementDetails.no_agreement_found
              );
            }
          }}
          icon={(color, width, height) => {
            AppLog.log(() => color);
            return (
              <InfoCircle
                width={width}
                height={height}
                fill={themedColors.primary}
              />
            );
          }}
        />
      )
    });
  }, [
    roommateData,
    navigation,
    navigationViewProfile,
    friendsNavigation,
    matchesNavigation,
    route.params.isFrom,
    themedColors
  ]);

  const handleRoommateUpdateApi = useCallback(async () => {
    const {
      hasError,
      dataBody,
      errorBody
    } = await roommateUpdateApi.request([submitAnswerRequest.current!!]);
    if (hasError || dataBody === undefined) {
      AppLog.log(() => "submit agreement Response : " + errorBody);
      return;
    } else {
      AppLog.log(() => "submit agreement Response : " + dataBody.message);
    }
  }, [roommateUpdateApi]);

  const handleGetAgreementApi = useCallback(async () => {
    if (user?.profile?.agreementId !== undefined) {
      const {
        hasError,
        dataBody,
        errorBody
      } = await getAgreementApi.request([user?.profile?.agreementId]);
      if (hasError || dataBody === undefined) {
        AppLog.log(() => "Unable to find agreement answers " + errorBody);
        SimpleToast.show(
          STRINGS.roommateAgreementDetails.no_agreement_found
        );
        return;
      } else {
        agreementPartiesData.current = dataBody.data;
        setRoommateData(dataBody.data.agreementFields);
      }
    }
  }, [user, getAgreementApi]);

  const submitAgreement = (data: AgreementAnswersRequestModel) => {
    submitAnswerRequest.current = data;
    setAgreementDialog(true);

    AppLog.log(() => "submitted values " + JSON.stringify(data));
  };

  const agreementDialogCallback = async (status: string) => {
    setAgreementDialog(false);

    AppLog.log(() => "userProfile: " + JSON.stringify(user?.profile));
    submitAnswerRequest.current.agreementId = user?.profile?.agreementId!!;
    submitAnswerRequest.current.status = status;

    //call submit/update agreement api
    await handleRoommateUpdateApi();
  };

  useEffect(() => {
    handleGetAgreementApi().then().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RoommateAgreementView
      roommateData={roommateData}
      showProgressBar={getAgreementApi.loading}
      handleSaveAndContinue={submitAgreement}
      showAgreementDialog={agreementDialog}
      agreementDialogCallback={agreementDialogCallback}
      progressBarBtn={roommateUpdateApi.loading}
      shouldShowAgreementDialog={setAgreementDialog}
    />
  );
};

export default RoommateAgreementController;
