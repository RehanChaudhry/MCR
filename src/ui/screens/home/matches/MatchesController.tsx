import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import InfoCircle from "assets/images/info_circle.svg";
import { usePreferredTheme } from "hooks";
import EScreen from "models/enums/EScreen";
import MatchesTypeFilter from "models/enums/MatchesTypeFilter";
import RelationModel from "models/RelationModel";
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState
} from "react";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import { AppDataContext } from "ui/screens/home/friends/AppDataProvider";
import { MatchesView } from "ui/screens/home/matches/MatchesView";
import { AppLog } from "utils/Util";
import { ConnectRequestType } from "ui/screens/home/friends/connect_requests/ConnectRequestsController";
import { HomeStackParamList } from "routes/HomeStack";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import RelationFilterType from "models/enums/RelationFilterType";
import useFetchRelations from "../friends/useFetchRelations";
import useCreateConversation from "hooks/useCreateConversation";
import { User } from "models/User";
import { Alert } from "react-native";
import { useApi } from "repo/Client";
import { MatchesGenderResponseModel } from "models/api_responses/MatchesGenderResponseModel";
import OtherApis from "repo/home/OtherApis";

type MatchesNavigationProp = StackNavigationProp<HomeStackParamList>;

type Props = {};

const MatchesController: FC<Props> = () => {
  AppLog.log(() => "Opening MatchesController");
  const { themedColors } = usePreferredTheme();
  const navigation = useNavigation<MatchesNavigationProp>();

  const { createConversationAndNavigate } = useCreateConversation();
  const getGenderApi = useApi<any, MatchesGenderResponseModel>(
    OtherApis.genders
  );

  const [gender, setGender] = useState<MatchesGenderResponseModel>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Hamburger />,
      headerRight: () => (
        <HeaderRightTextWithIcon
          text={"More"}
          onPress={() => navigation.navigate("MatchInfo")}
          icon={(color, width, height) => {
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

  const moveToChatScreen = async (profileMatch: RelationModel) => {
    createConversationAndNavigate(
      (profileMatch.user as unknown) as User,
      setActiveConversations,
      setInActiveConversations
    );
  };

  const moveToProfileScreen = (profileMatch: RelationModel) => {
    AppLog.log(
      () =>
        "moveToProfileScreen(), profile: " + JSON.stringify(profileMatch)
    );
    navigation.navigate("ViewProfile", {
      isFrom: EScreen.MATCH_INFO,
      userId: profileMatch.user!.id!,
      userName:
        profileMatch.user?.firstName + " " + profileMatch.user?.lastName
    });
  };

  const moveToRoommateRequests = useCallback(
    (_: RelationModel) => {
      navigation.navigate("ConnectRequest", {
        type: ConnectRequestType.ROOMMATE_REQUESTS
      });
    },
    [navigation]
  );

  const moveToFriendRequests = useCallback(
    (_: RelationModel) => {
      navigation.navigate("ConnectRequest", {
        type: ConnectRequestType.FRIEND_REQUESTS
      });
    },
    [navigation]
  );

  const fetchGender = useCallback(async () => {
    const { hasError, errorBody, dataBody } = await getGenderApi.request(
      []
    );

    if (hasError || dataBody === undefined) {
      Alert.alert("Unable to fetch posts", errorBody);
      return;
    } else {
      AppLog.logForcefully(
        () => "Genders: " + JSON.stringify(dataBody.data)
      );
      setGender(dataBody);
    }
  }, [getGenderApi]);

  const {
    matches: profileMatches,
    setMatches: setProfileMatches,
    setActiveConversations,
    setInActiveConversations
  } = useContext(AppDataContext);
  const {
    relationsCount: totalCount,
    isLoading,
    isLoggedInUserAModerator,
    canLoadMore,
    onEndReached,
    errorMessage,
    onPullToRefresh,
    refetchRelationsFromStart
  } = useFetchRelations(
    RelationFilterType.MATCHES,
    profileMatches,
    setProfileMatches,
    {
      filterBy: MatchesTypeFilter.MATCHES
    }
  );

  const onFilterByChange = useCallback(
    (value?: MatchesTypeFilter) => {
      AppLog.logForcefully(() => "in onFilterByChange()...");
      refetchRelationsFromStart({
        filterBy: value
      });
    },
    [refetchRelationsFromStart]
  );

  const onKeywordAndGenderChange = useCallback(
    (keyword?: string, _gender?: string) => {
      AppLog.logForcefully(() => "in onKeywordAndGenderChange()...");
      refetchRelationsFromStart({
        keyword: keyword,
        gender: _gender
      });
    },
    [refetchRelationsFromStart]
  );

  useEffect(() => {
    fetchGender();
  }, [fetchGender]);

  return (
    <MatchesView
      isLoading={isLoading}
      error={errorMessage}
      selectedTotalCount={totalCount}
      matches={profileMatches}
      onFilterByChange={onFilterByChange}
      onKeywordAndGenderChange={onKeywordAndGenderChange}
      pullToRefreshCallback={onPullToRefresh}
      onEndReached={onEndReached}
      isAllDataLoaded={!canLoadMore}
      isLoggedInUserAModerator={isLoggedInUserAModerator}
      moveToChatScreen={moveToChatScreen}
      moveToProfileScreen={moveToProfileScreen}
      moveToRoommateRequests={moveToRoommateRequests}
      moveToFriendRequests={moveToFriendRequests}
      matchesGenderFilter={gender!}
    />
  );
};

export default MatchesController;
