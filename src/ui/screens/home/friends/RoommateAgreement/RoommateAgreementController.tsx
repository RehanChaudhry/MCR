import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState
} from "react";
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
import { usePreferredTheme } from "hooks";
import { FriendsRootStackParamList } from "routes/FriendsRootStack";
import EScreen from "models/enums/EScreen";
import { MatchesStackParamList } from "routes/MatchesStack";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import { ProfileRootStackParamList } from "routes/ProfileRootStack";
import { useApi } from "repo/Client";
import { RoommateAgreementResponseModel } from "models/api_responses/RoommateAgreementResponseModel";
import RoomAgreementApis from "repo/auth/RoomAgreementApis";
import { RoommateAgreementRequestModel } from "models/api_requests/RoommateAgreementRequestModel";
import {
  AgreementAnswersRequestModel,
  Roommate
} from "models/api_requests/AgreementAnswersRequestModel";

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
  const { themedColors } = usePreferredTheme();
  const roommateApi = useApi<
    RoommateAgreementRequestModel,
    RoommateAgreementResponseModel
  >(RoomAgreementApis.fetchRoomAgreementFileds);
  const [
    roommateData,
    setRoommateData
  ] = useState<RoommateAgreementResponseModel>();

  useLayoutEffect(() => {
    if (route.params.isFrom === EScreen.MATCH_INFO) {
      navigation.setOptions({
        headerTitleAlign: "center",
        headerTitle: () => <HeaderTitle text="Roommate Agreement" />,
        headerLeft: () => (
          <HeaderLeftTextWithIcon
            onPress={() => {
              navigation.pop();
            }}
          />
        ),
        headerRight: () => (
          <HeaderRightTextWithIcon
            text={"More"}
            onPress={() => matchesNavigation.navigate("AgreementDetails")}
            icon={(color, width, height) => {
              AppLog.log(color);
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
    } else if (route.params.isFrom === EScreen.HOME) {
      navigation.setOptions({
        headerTitleAlign: "center",
        headerTitle: () => <HeaderTitle text="Roommate Agreement" />,
        headerLeft: () => <Hamburger />,
        headerRight: () => (
          <HeaderRightTextWithIcon
            text={"More"}
            onPress={() => friendsNavigation.navigate("AgreementDetails")}
            icon={(color, width, height) => {
              AppLog.log(color);
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
    } else if (route.params.isFrom === EScreen.MY_PROFILE) {
      navigation.setOptions({
        headerTitleAlign: "center",
        headerTitle: () => <HeaderTitle text="Roommate Agreement" />,
        headerLeft: () => (
          <HeaderLeftTextWithIcon
            onPress={() => {
              navigation.pop();
            }}
          />
        ),
        headerRight: () => (
          <HeaderRightTextWithIcon
            text={"More"}
            onPress={() =>
              navigationViewProfile.navigate("AgreementDetails")
            }
            icon={(color, width, height) => {
              AppLog.log(color);
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
    }
  }, [
    navigation,
    navigationViewProfile,
    friendsNavigation,
    matchesNavigation,
    route.params.isFrom,
    themedColors
  ]);

  const roommateAgreementApi = useCallback(async () => {
    const { hasError, dataBody, errorBody } = await roommateApi.request([
      {}
    ]);
    if (hasError || dataBody === undefined) {
      // Alert.alert("Unable to find questions " + errorBody);
      AppLog.log("Unable to find Fields " + errorBody);
      return;
    } else {
      setRoommateData(dataBody);
    }
  }, [roommateApi]);

  useEffect(() => {
    roommateAgreementApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitAgreement = (data: AgreementAnswersRequestModel) => {
    data.roommates = roommateData?.data.reduce(
      (newArray: Roommate[], _item) => (
        newArray.push({
          userId: 1, //needs to be dynamic
          status: "agreed" //needs to be dynamic
        }),
        newArray
      ),
      []
    );

    data.agreementAccepted = false; //needs to be dynamic

    AppLog.logForcefully("resuled values " + JSON.stringify(data));
  };

  return (
    <RoommateAgreementView
      roommateData={roommateData?.data}
      showProgressBar={roommateApi.loading}
      handleSaveAndContinue={submitAgreement}
    />
  );
};

export default RoommateAgreementController;
