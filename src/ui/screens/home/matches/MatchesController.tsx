import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import InfoCircle from "assets/images/info_circle.svg";
import { STRINGS } from "config";
import { useAuth, usePreferredTheme } from "hooks";
import EGender from "models/enums/EGender";
import EScreen from "models/enums/EScreen";
import MatchesTypeFilter from "models/enums/MatchesTypeFilter";
import RelationModel from "models/RelationModel";
import React, {
  FC,
  useCallback,
  useContext,
  useLayoutEffect
} from "react";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import { AppDataContext } from "ui/screens/home/friends/AppDataProvider";
import { MatchesView } from "ui/screens/home/matches/MatchesView";
import { AppLog } from "utils/Util";
import { ConnectRequestType } from "ui/screens/home/friends/connect_requests/ConnectRequestsController";
import { useCreateConversation } from "hooks/useCreateConversation";
import { HomeStackParamList } from "routes/HomeStack";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import RelationFilterType from "models/enums/RelationFilterType";
import useFetchRelations from "../friends/useFetchRelations";

type MatchesNavigationProp = StackNavigationProp<HomeStackParamList>;

type Props = {};

const MatchesController: FC<Props> = () => {
  AppLog.log(() => "Opening MatchesController");
  const { themedColors } = usePreferredTheme();
  const navigation = useNavigation<MatchesNavigationProp>();

  const createConversation = useCreateConversation();
  const { user } = useAuth();

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
    const createConversationResult = await createConversation(
      [user?.profile?.id!!, profileMatch.user?.id!],
      setActiveConversations,
      inActiveConversations
    );

    if (createConversationResult !== undefined) {
      navigation.navigate("ChatThread", {
        title: [
          profileMatch.user?.getFullName() ?? STRINGS.common.not_found
        ],
        conversation: createConversationResult
      });
    }
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

  const {
    matches: profileMatches,
    setMatches: setProfileMatches,
    setActiveConversations,
    inActiveConversations
  } = useContext(AppDataContext);
  const {
    relationsCount: totalCount,
    isLoading,
    isLoggedInUserAModerator,
    canLoadMore,
    onEndReached,
    errorMessage,
    onPullToRefresh,
    setOverriddenRequestModel
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
      setProfileMatches?.(undefined);
      setOverriddenRequestModel((requestModel) => {
        const updatedModel = {
          ...requestModel,
          filterBy: value
        };
        onPullToRefresh(undefined, updatedModel);
        return updatedModel;
      });
    },
    [onPullToRefresh, setProfileMatches, setOverriddenRequestModel]
  );

  const onKeywordAndGenderChange = useCallback(
    (keyword?: string, gender?: EGender) => {
      AppLog.logForcefully(() => "in onKeywordAndGenderChange()...");
      setProfileMatches?.(undefined);
      setOverriddenRequestModel((requestModel) => {
        const updatedModel = {
          ...requestModel,
          keyword: keyword,
          gender: gender
        };
        onPullToRefresh(undefined, updatedModel);
        return updatedModel;
      });
    },
    [onPullToRefresh, setProfileMatches, setOverriddenRequestModel]
  );

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
    />
  );
};

export default MatchesController;
