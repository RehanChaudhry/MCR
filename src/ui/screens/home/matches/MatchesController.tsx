import React, { FC, useEffect, useRef, useState } from "react";
import { MatchesView } from "ui/screens/home/matches/MatchesView";
import ProgressErrorView from "ui/components/templates/progress_error_view/ProgressErrorView";
import { Alert, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeDrawerParamList } from "routes";
import { useNavigation } from "@react-navigation/native";
import { AppLog } from "utils/Util";
import DataGenerator from "utils/DataGenerator";
import MatchesApiRequestModel from "models/api_requests/MatchesApiRequestModel";
import MatchesTypeFilter, {
  getMatchesTypeFilterData
} from "models/enums/MatchesTypeFilter";
import { useApi } from "repo/Client";
import MatchesApiResponseModel from "models/api_responses/MatchesApiResponseModel";
import MatchesApis from "repo/home/MatchesApis";
import ApiSuccessResponseModel from "models/api_responses/ApiSuccessResponseModel";
import MatchesFilterApiResponseModel, {
  FilterCount
} from "models/api_responses/MatchesFilterApiResponseModel";

type MatchesNavigationProp = StackNavigationProp<
  HomeDrawerParamList,
  "Matches"
>;

type Props = {};

const MatchesController: FC<Props> = () => {
  AppLog.log("Opening MatchesController");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation = useNavigation<MatchesNavigationProp>();

  // Matches API
  const matchesApi = useApi<
    MatchesApiRequestModel,
    MatchesApiResponseModel
  >(MatchesApis.matches);

  const requestModel = useRef<MatchesApiRequestModel>({
    gender: undefined,
    keyword: "",
    limit: 5,
    pageNo: 1,
    type: MatchesTypeFilter.MATCHES
  });
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);
  const isFetchingInProgress = useRef(false);
  const [
    profileMatches,
    setProfileMatches
  ] = useState<MatchesApiResponseModel>();

  const refreshCallback = async (onComplete: () => void) => {
    requestModel.current.pageNo = 1;
    setIsAllDataLoaded(false);
    getProfileMatches().then(() => {
      onComplete();
    });
  };

  const getProfileMatches = async () => {
    if (isFetchingInProgress.current) {
      return;
    }
    isFetchingInProgress.current = true;
    if (requestModel.current.pageNo === 0) {
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
      errorBody,
      dataBody
    } = await DataGenerator.getProfileMatches(requestModel.current);

    // const { hasError, errorBody, dataBody } = await matchesApi.request([
    //   requestModel.current
    // ]);

    if (!hasError) {
      if (requestModel.current.pageNo === 1) {
        setProfileMatches({ message: "", data: [] });
      }
      setProfileMatches((prevState) => ({
        message: dataBody!.message,
        data: [
          ...(prevState === undefined || requestModel.current.pageNo === 1
            ? []
            : prevState.data),
          ...dataBody!.data
        ],
        pagination: dataBody!.pagination
      }));
      requestModel.current.pageNo = dataBody!.pagination?.next ?? 0;
    } else {
      Alert.alert("Unable to fetch matches", errorBody);
    }

    isFetchingInProgress.current = false;
  };

  const onEndReached = () => {
    getProfileMatches();
  };

  // Friend Request API
  const friendRequestApi = useApi<number, ApiSuccessResponseModel>(
    MatchesApis.friendRequest
  );

  const postFriendRequest = async (userId: number) => {
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
          pagination: prevState?.pagination
        };
      });
      Alert.alert("Fried Request Sent", dataBody!.message);
    } else {
      Alert.alert("Unable to send friend request", errorBody);
    }
  };

  // Match Dismiss API
  const matchDismissApi = useApi<number, ApiSuccessResponseModel>(
    MatchesApis.matchDismiss
  );

  const postMatchDismiss = async (userId: number) => {
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
          pagination: prevState?.pagination
        };
      });
      Alert.alert("Match Dismissed", dataBody!.message);
    } else {
      Alert.alert("Unable to dismiss match", errorBody);
    }
  };

  // Matches filter count API
  const [filterCounts, setFilterCounts] = useState<FilterCount[]>(
    getMatchesTypeFilterData()
  );
  const matchesFilterCountApi = useApi<any, MatchesFilterApiResponseModel>(
    MatchesApis.filterCount
  );

  const getFilterCount = async () => {
    const {
      hasError,
      errorBody,
      dataBody
    } = await matchesFilterCountApi.request([]);

    if (!hasError) {
      setFilterCounts(dataBody!.data);
    } else {
      AppLog.log("getFilterCount() > failed, error: " + errorBody);
    }
  };

  useEffect(() => {
    getFilterCount();
    getProfileMatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProgressErrorView
      isLoading={matchesApi.loading}
      error={matchesApi.error}
      errorView={(message) => {
        return (
          <View>
            <AppLabel text={message} />
          </View>
        );
      }}
      data={profileMatches?.data}>
      <MatchesView
        filterCounts={filterCounts}
        matches={profileMatches?.data}
        pullToRefreshCallback={refreshCallback}
        onEndReached={onEndReached}
        isAllDataLoaded={isAllDataLoaded}
        postFriendRequest={postFriendRequest}
        postMatchDismiss={postMatchDismiss}
      />
    </ProgressErrorView>
  );
};

export default MatchesController;
