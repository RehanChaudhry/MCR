import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import InfoCircle from "assets/images/info_circle.svg";
import { STRINGS } from "config";
import { useAuth, usePreferredTheme } from "hooks";
import { PaginationParamsModel } from "models/api_requests/PaginationParamsModel";
import { UpdateRelationApiRequestModel } from "models/api_requests/UpdateRelationApiRequestModel";
import ApiSuccessResponseModel from "models/api_responses/ApiSuccessResponseModel";
import RelationApiResponseModel from "models/api_responses/RelationApiResponseModel";
import { UpdateRelationApiResponseModel } from "models/api_responses/UpdateRelationApiResponseModel";
import EGender from "models/enums/EGender";
import EIntBoolean from "models/enums/EIntBoolean";
import EScreen from "models/enums/EScreen";
import MatchesTypeFilter from "models/enums/MatchesTypeFilter";
import RelationActionType from "models/enums/RelationActionType";
import RelationFilterType from "models/enums/RelationFilterType";
import RelationModel, { Status } from "models/RelationModel";
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { Alert } from "react-native";
import { useApi } from "repo/Client";
import RelationApis from "repo/home/RelationApis";
import { MatchesStackParamList } from "routes/MatchesStack";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import { AppDataContext } from "ui/screens/home/friends/AppDataProvider";
import { MatchesView } from "ui/screens/home/matches/MatchesView";
import { AppLog } from "utils/Util";
import { ConnectRequestType } from "ui/screens/home/friends/connect_requests/ConnectRequestsController";
import { useCreateConversation } from "hooks/useCreateConversation";

type MatchesNavigationProp = StackNavigationProp<
  MatchesStackParamList,
  "Matches"
>;

type Props = {};

const MatchesController: FC<Props> = () => {
  AppLog.log(() => "Opening MatchesController");
  const { themedColors } = usePreferredTheme();
  const navigation = useNavigation<MatchesNavigationProp>();

  const createConversation = useCreateConversation();
  const { user } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
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
      navigation.navigate("Chat", {
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
    navigation.navigate("Profile", {
      isFrom: EScreen.MATCH_INFO,
      updateProfile: false,
      userId: profileMatch.user!.id!
    });
  };

  const moveToRoommateRequests = useCallback(
    (_: RelationModel) => {
      navigation.navigate("ConnectRequests", {
        title: "Roommate Requests",
        type: ConnectRequestType.ROOMMATE_REQUESTS
      });
    },
    [navigation]
  );

  const moveToFriendRequests = useCallback(
    (_: RelationModel) => {
      navigation.navigate("ConnectRequests", {
        title: "Friend Requests",
        type: ConnectRequestType.FRIEND_REQUESTS
      });
    },
    [navigation]
  );

  // Matches API
  const relationsApi = useApi<
    PaginationParamsModel,
    RelationApiResponseModel
  >(RelationApis.relations);

  const requestModel = useRef<PaginationParamsModel>({
    type: RelationFilterType.MATCHES,
    gender: undefined,
    keyword: "",
    paginate: true,
    page: 1,
    limit: 10,
    filterBy: MatchesTypeFilter.MATCHES
  });
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);
  const isFetchingInProgress = useRef(false);

  const refreshCallback = useCallback((onComplete?: () => void) => {
    if (isFetchingInProgress.current) {
      return;
    }
    requestModel.current.page = 1;
    setIsAllDataLoaded(false);
    getProfileMatches()
      .then(() => {
        onComplete?.();
      })
      .catch((reason) => {
        AppLog.log(() => "refreshCallback > catch(), reason:" + reason);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    addListenerOnResetData,
    removeListenerOnResetData,
    matches: profileMatches,
    setMatches: setProfileMatches,
    setActiveConversations,
    inActiveConversations
  } = useContext(AppDataContext);
  useEffect(() => {
    let listener = () => {
      refreshCallback();
    };

    addListenerOnResetData(listener);

    return () => {
      removeListenerOnResetData(listener);
    };
  }, [refreshCallback, addListenerOnResetData, removeListenerOnResetData]);

  const [totalCount, setTotalCount] = useState<number>(0);

  const getProfileMatches = useCallback(async () => {
    AppLog.logForcefully(() => "in getProfileMatches()...");
    if (isFetchingInProgress.current) {
      return;
    }
    isFetchingInProgress.current = true;

    const { hasError, errorBody, dataBody } = await relationsApi.request([
      requestModel.current
    ]);

    if (hasError || dataBody === undefined) {
      Alert.alert("Unable to fetch matches", errorBody);
    } else {
      setProfileMatches?.([
        ...(profileMatches ?? []),
        ...(dataBody.data ?? [])
      ]);

      // setMyFriends?.((prevState) => [
      //   ...(prevState === undefined || requestModel.current.page === 1
      //     ? []
      //     : prevState),
      //   ...(dataBody.data ?? [])
      // ]);

      setTotalCount(dataBody.count ?? 0);
      if (dataBody!.data?.length === 10) {
        requestModel.current.page = requestModel.current.page! + 1;
      } else {
        setIsAllDataLoaded(true);
      }
    }

    isFetchingInProgress.current = false;
  }, [relationsApi, profileMatches, setProfileMatches]);

  const onTypeChange = useCallback(
    (value?: MatchesTypeFilter) => {
      setProfileMatches?.(undefined);
      setTotalCount(0);
      requestModel.current.filterBy =
        value !== MatchesTypeFilter.MATCHES ? value : undefined;
      refreshCallback();
    },
    [refreshCallback, setProfileMatches]
  );

  const onFilterChange = useCallback(
    (keyword?: string, gender?: EGender) => {
      setProfileMatches?.(undefined);
      requestModel.current.keyword = keyword;
      requestModel.current.gender = gender;
      refreshCallback();
    },
    [setProfileMatches, refreshCallback]
  );

  const onEndReached = () => {
    getProfileMatches();
  };

  // Friend , Roommate , cancel Request API
  const requestApi = useApi<
    UpdateRelationApiRequestModel,
    UpdateRelationApiResponseModel
  >(RelationApis.sendFriendOrRoommateRequest);

  const postRequest = useCallback(
    async (userId: number, type: RelationActionType) => {
      const { hasError, errorBody, dataBody } = await requestApi.request([
        {
          receiverId: userId
        }
      ]);

      if (!hasError) {
        setProfileMatches?.((prevState) => {
          let requestedUserPosition =
            prevState?.findIndex((value) => value.userId === userId) ?? -1;
          if (requestedUserPosition !== -1) {
            const updatedUser = new RelationModel(
              prevState![requestedUserPosition]
            );
            if (type === RelationActionType.ROOMMATE_REQUEST) {
              updatedUser.isFriend = EIntBoolean.TRUE;
            } else {
              updatedUser.isFriend = EIntBoolean.FALSE;
            }
            updatedUser.isRoommate = EIntBoolean.FALSE;
            updatedUser.status = Status.PENDING;
            prevState![requestedUserPosition] = updatedUser;
          }
          return Object.assign([], prevState);
        });
        if (type === RelationActionType.FRIEND_REQUEST) {
          Alert.alert("Friend Request Sent", dataBody!.message);
        }
        if (type === RelationActionType.ROOMMATE_REQUEST) {
          Alert.alert("Roommate Request Sent", dataBody!.message);
        }
      } else {
        if (type === RelationActionType.FRIEND_REQUEST) {
          Alert.alert("Unable to send friend request", errorBody);
        }
        if (type === RelationActionType.ROOMMATE_REQUEST) {
          Alert.alert("Unable to send roommate request", errorBody);
        }
      }
    },
    [requestApi, setProfileMatches]
  );

  // Match Dismiss API
  const relationDismissRestoreApi = useApi<
    UpdateRelationApiRequestModel,
    ApiSuccessResponseModel
  >(RelationApis.relationDismissRestore);

  const requestRelationDismissRestoreApi = async (
    request: UpdateRelationApiRequestModel
  ) => {
    const {
      hasError,
      errorBody,
      dataBody
    } = await relationDismissRestoreApi.request([request]);

    if (!hasError) {
      setProfileMatches?.((prevState) => {
        const dismissedUserIndex =
          prevState?.findIndex(
            (value) => value.userId === request.receiverId
          ) ?? -1;
        if (dismissedUserIndex > -1) {
          prevState!.splice(dismissedUserIndex, 1);
        }
        return prevState;
      });
      Alert.alert("Match Dismissed", dataBody!.message);
    } else {
      Alert.alert("Unable to dismiss match", errorBody);
    }
  };

  // Update Relation API
  const updateRelationApi = useApi<
    UpdateRelationApiRequestModel,
    UpdateRelationApiResponseModel
  >(RelationApis.updateRelation);

  const requestUpdateRelationApi = async (
    request: UpdateRelationApiRequestModel,
    type: RelationActionType
  ) => {
    AppLog.log(() => "type: " + type);
    const {
      hasError,
      errorBody,
      dataBody
    } = await updateRelationApi.request([request]);

    if (!hasError) {
      if (type === RelationActionType.BLOCKED) {
        Alert.alert("User Blocked", dataBody!.message);
        setProfileMatches?.((prevState) => {
          const dismissedUserIndex =
            prevState?.findIndex(
              (value) => value.userId === request.receiverId
            ) ?? -1;
          if (dismissedUserIndex > -1) {
            prevState!.splice(dismissedUserIndex, 1);
          }
          return prevState;
        });
      }
      if (
        type === RelationActionType.CANCEL_ROOMMATE_REQUEST ||
        type === RelationActionType.CANCEL_FRIEND_REQUEST
      ) {
        Alert.alert("Request Cancelled", dataBody!.message);
        setProfileMatches?.((prevState) => {
          let requestedUserPosition =
            prevState?.findIndex(
              (value) => value.userId === request.receiverId
            ) ?? -1;
          if (requestedUserPosition !== -1) {
            const updatedUser = new RelationModel(
              prevState![requestedUserPosition]
            );
            if (type === RelationActionType.CANCEL_FRIEND_REQUEST) {
              updatedUser.isFriend = EIntBoolean.FALSE;
              updatedUser.isRoommate = EIntBoolean.FALSE;
              updatedUser.status = undefined;
            } else {
              updatedUser.isFriend = EIntBoolean.TRUE;
              updatedUser.isRoommate = EIntBoolean.FALSE;
              updatedUser.status = Status.ACCEPTED;
              updatedUser.criteria = { eligible: true };
            }
            prevState![requestedUserPosition] = updatedUser;
          }
          return Object.assign([], prevState);
        });
      }
    } else {
      if (
        type === RelationActionType.CANCEL_ROOMMATE_REQUEST ||
        RelationActionType.CANCEL_FRIEND_REQUEST
      ) {
        Alert.alert("Unable to cancel request", errorBody);
      }
      if (type === RelationActionType.BLOCKED) {
        Alert.alert("Unable to blocked match", errorBody);
      }
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
      selectedTotalCount={totalCount}
      matches={profileMatches}
      onTypeChange={onTypeChange}
      onFilterChange={onFilterChange}
      pullToRefreshCallback={refreshCallback}
      onEndReached={onEndReached}
      isAllDataLoaded={isAllDataLoaded}
      isRequestApiLoading={requestApi.loading}
      postRequest={postRequest}
      postMatchDismiss={requestRelationDismissRestoreApi}
      postMatchBlocked={requestUpdateRelationApi}
      moveToChatScreen={moveToChatScreen}
      moveToProfileScreen={moveToProfileScreen}
      moveToRoommateRequests={moveToRoommateRequests}
      moveToFriendRequests={moveToFriendRequests}
    />
  );
};

export default MatchesController;
