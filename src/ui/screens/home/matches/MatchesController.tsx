import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { MatchesView } from "ui/screens/home/matches/MatchesView";
import { Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { AppLog } from "utils/Util";
import DataGenerator from "utils/DataGenerator";
import MatchesTypeFilter from "models/enums/MatchesTypeFilter";
import { useApi } from "repo/Client";
import RelationApiResponseModel from "models/api_responses/RelationApiResponseModel";
import RelationApis from "repo/home/RelationApis";
import ApiSuccessResponseModel from "models/api_responses/ApiSuccessResponseModel";
import { MatchesStackParamList } from "routes/MatchesStack";
import InfoCircle from "assets/images/info_circle.svg";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import RelationModel from "models/RelationModel";
import { STRINGS } from "config";
import { usePreferredTheme } from "hooks";
import EScreen from "models/enums/EScreen";
import EGender from "models/enums/EGender";
import { RelationApiRequestModel } from "../../../../models/api_requests/RelationApiRequestModel";
import RelationFilterType from "models/enums/RelationFilterType";

type MatchesNavigationProp = StackNavigationProp<
  MatchesStackParamList,
  "Matches"
>;

type Props = {};

const MatchesController: FC<Props> = () => {
  AppLog.log("Opening MatchesController");
  const { themedColors } = usePreferredTheme();
  const navigation = useNavigation<MatchesNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightTextWithIcon
          text={"More"}
          onPress={() => navigation.navigate("MatchInfo")}
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
  }, [navigation, themedColors]);

  const moveToChatScreen = (profileMatch: RelationModel) => {
    // AppLog.log(
    //   "moveToChatScreen(), profile: " + JSON.stringify(profileMatch)
    // );
    navigation.navigate("Chat", {
      title: [profileMatch.userName ?? STRINGS.common.not_found]
    });
  };

  const moveToProfileScreen = (profileMatch: RelationModel) => {
    AppLog.log(
      "moveToProfileScreen(), profile: " + JSON.stringify(profileMatch)
    );
    navigation.navigate("Profile", { isFrom: EScreen.MATCH_INFO });
  };

  // Matches API
  const relationsApi = useApi<
    RelationApiRequestModel,
    RelationApiResponseModel
  >(RelationApis.relations);

  const requestModel = useRef<RelationApiRequestModel>({
    type: RelationFilterType.MATCHES,
    gender: undefined,
    keyword: "",
    paginate: true,
    page: 1,
    filterBy: MatchesTypeFilter.MATCHES
  });
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);
  const isFetchingInProgress = useRef(false);
  const [
    profileMatches,
    setProfileMatches
  ] = useState<RelationApiResponseModel>();

  const getProfileMatches = useCallback(async () => {
    if (isFetchingInProgress.current) {
      return;
    }
    isFetchingInProgress.current = true;
    if (requestModel.current.page === 0) {
      isFetchingInProgress.current = false;
      setIsAllDataLoaded(true);
      return;
    }

    // AppLog.log(
    //   "in getProfileMatches(), fetching page: " +
    //     JSON.stringify(requestModel.current)
    // );

    const {
      hasError,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      errorBody,
      dataBody
    } = await DataGenerator.getProfileMatches(requestModel.current);

    // const { hasError, errorBody, dataBody } = await matchesApi.request([
    //   requestModel.current
    // ]);

    if (!hasError) {
      setProfileMatches((prevState) => ({
        message: dataBody!.message,
        data: [
          ...(prevState === undefined || requestModel.current.page === 1
            ? []
            : prevState.data),
          ...dataBody!.data
        ],
        count: dataBody!.count
      }));
      requestModel.current.page =
        dataBody!.data?.length === 10 ? requestModel.current.page + 1 : 0;
    } else {
      // Alert.alert("Unable to fetch matches", errorBody);
    }

    isFetchingInProgress.current = false;
  }, []);

  const refreshCallback = useCallback(
    async (onComplete?: () => void) => {
      requestModel.current.page = 1;
      setIsAllDataLoaded(false);
      getProfileMatches()
        .then(() => {
          onComplete?.();
        })
        .catch((reason) => {
          AppLog.log("refreshCallback > catch(), reason:" + reason);
        });
    },
    [getProfileMatches]
  );

  const onTypeChange = useCallback(
    (value: MatchesTypeFilter) => {
      requestModel.current.type = value;
      refreshCallback();
    },
    [refreshCallback]
  );

  const onFilterChange = useCallback(
    (keyword?: string, gender?: EGender) => {
      AppLog.log(keyword);
      requestModel.current.keyword = keyword;
      requestModel.current.gender = gender;
      refreshCallback();
    },
    [refreshCallback]
  );

  const onEndReached = () => {
    getProfileMatches();
  };

  // Friend Request API
  const friendRequestApi = useApi<number, ApiSuccessResponseModel>(
    RelationApis.friendRequest
  );

  const postFriendRequest = async (userId: number) => {
    // For UI build
    if (true) {
      setProfileMatches((prevState) => {
        const requestedUser = prevState?.data.find(
          (value) => value.userId === userId
        );
        if (requestedUser) {
          requestedUser.isFriendRequested = true;
        }
        return {
          message: prevState?.message ?? "",
          data: prevState?.data ?? [],
          count: prevState?.count
        };
      });
      return;
    }
    const {
      hasError,
      errorBody,
      dataBody
    } = await friendRequestApi.request([userId]);

    if (!hasError) {
      setProfileMatches((prevState) => {
        const requestedUser = prevState?.data.find(
          (value) => value.userId === userId
        );
        if (requestedUser) {
          requestedUser.isFriendRequested = true;
        }
        return {
          message: prevState?.message ?? "",
          data: prevState?.data ?? [],
          count: prevState?.count
        };
      });
      Alert.alert("Fried Request Sent", dataBody!.message);
    } else {
      Alert.alert("Unable to send friend request", errorBody);
    }
  };

  // Match Dismiss API
  const matchDismissApi = useApi<number, ApiSuccessResponseModel>(
    RelationApis.matchDismiss
  );

  const postMatchDismiss = async (userId: number) => {
    // For UI build
    if (true) {
      setProfileMatches((prevState) => {
        const dismissedUserIndex =
          prevState?.data.findIndex((value) => value.userId === userId) ??
          -1;
        if (dismissedUserIndex > -1) {
          prevState!.data.splice(dismissedUserIndex, 1);
        }
        return {
          message: prevState?.message ?? "",
          data: prevState?.data ?? [],
          count: prevState?.count
        };
      });
      return;
    }
    const {
      hasError,
      errorBody,
      dataBody
    } = await matchDismissApi.request([userId]);

    if (!hasError) {
      setProfileMatches((prevState) => {
        const dismissedUserIndex =
          prevState?.data.findIndex((value) => value.userId === userId) ??
          -1;
        if (dismissedUserIndex > -1) {
          prevState!.data.splice(dismissedUserIndex, 1);
        }
        return {
          message: prevState?.message ?? "",
          data: prevState?.data ?? [],
          count: prevState?.count
        };
      });
      Alert.alert("Match Dismissed", dataBody!.message);
    } else {
      Alert.alert("Unable to dismiss match", errorBody);
    }
  };

  useEffect(() => {
    getProfileMatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MatchesView
      isLoading={relationsApi.loading}
      error={relationsApi.error}
      selectedTotalCount={profileMatches?.count ?? 0}
      matches={profileMatches?.data}
      onTypeChange={onTypeChange}
      onFilterChange={onFilterChange}
      pullToRefreshCallback={refreshCallback}
      onEndReached={onEndReached}
      isAllDataLoaded={isAllDataLoaded}
      postFriendRequest={postFriendRequest}
      postMatchDismiss={postMatchDismiss}
      moveToChatScreen={moveToChatScreen}
      moveToProfileScreen={moveToProfileScreen}
    />
  );
};

export default MatchesController;
