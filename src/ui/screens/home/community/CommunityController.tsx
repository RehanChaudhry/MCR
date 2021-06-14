import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import PencilAlt from "assets/images/pencil_alt.svg";
import Strings from "config/Strings";
import { usePreferredTheme } from "hooks";
import {
  CommunityAnnouncement,
  CommunityAnnouncementResponseModel
} from "models/api_responses/CommunityAnnouncementResponseModel";
import EScreen from "models/enums/EScreen";
import FeedsTypeFilter, {
  getFeedsTypeFilterData
} from "models/enums/FeedsTypeFilter";
import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { CommunityStackParamList } from "routes/CommunityStack";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { CommunityView } from "ui/screens/home/community/CommunityView";
import { AppLog } from "utils/Util";
import { Alert } from "react-native";
import AnnouncementRequestModel from "models/api_requests/AnnouncementRequestModel";
import { useApi } from "repo/Client";
import CommunityAnnouncementApis from "repo/home/CommunityAnnouncementApis";

type CommunityNavigationProp = StackNavigationProp<
  CommunityStackParamList,
  "Community"
>;

type CommunityRoute = RouteProp<CommunityStackParamList, "Community">;

type Props = {};

const CommunityController: FC<Props> = () => {
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);
  const [shouldShowProgressBar, setShouldShowProgressBar] = useState(true);
  const isFetchingInProgress = useRef(false);
  const [communities, setCommunities] = useState<
    CommunityAnnouncement[] | undefined
  >(undefined);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);
  const navigation = useNavigation<CommunityNavigationProp>();
  const route = useRoute<CommunityRoute>();
  const theme = usePreferredTheme();

  useEffect(() => {
    return navigation.addListener("blur", () => {
      AppLog.log("community screen is blur");
      setShouldPlayVideo(false);
    });
  }, [navigation]);

  useEffect(() => {
    return navigation.addListener("focus", () => {
      AppLog.log("community screen is focus");
      setShouldPlayVideo(true);
    });
  }, [navigation]);

  //listen callback from create post screen
  const postCreatedSuccessfully = useCallback(() => {
    setCommunities(undefined); //to show loader in screen
    requestModel.current.page = 1;
    fetchCommunities().then().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightTextWithIcon
          onPress={() => {
            navigation.navigate("CreatePost", {
              postCreatedSuccessfully: postCreatedSuccessfully
            });
          }}
          text={Strings.createPost.title.createPost}
          icon={() => {
            return (
              <PencilAlt
                width={15}
                height={15}
                fill={theme.themedColors.primary}
              />
            );
          }}
        />
      ),
      headerLeft: () => <Hamburger />,
      headerTitleAlign: "center",
      headerTitle: () => <HeaderTitle text="Community" />
    });
  }, [postCreatedSuccessfully, navigation, theme]);

  const requestModel = useRef<AnnouncementRequestModel>({
    paginate: true,
    page: 1,
    limit: 10,
    type: "feed",
    filterBy: "recent"
  });

  const getCommunitiesApi = useApi<
    AnnouncementRequestModel,
    CommunityAnnouncementResponseModel
  >(CommunityAnnouncementApis.getCommunityAnnouncements);

  const fetchCommunities = useCallback(async () => {
    if (isFetchingInProgress.current) {
      return;
    }

    isFetchingInProgress.current = true;
    setShouldShowProgressBar(true);

    const {
      hasError,
      errorBody,
      dataBody
    } = await getCommunitiesApi.request([requestModel.current]);

    setShouldShowProgressBar(false);
    isFetchingInProgress.current = false;
    if (hasError || dataBody === undefined) {
      Alert.alert("Unable to fetch posts", errorBody);
      return;
    } else {
      setCommunities((prevState) => {
        return [
          ...(prevState === undefined || requestModel.current.page === 1
            ? []
            : prevState),
          ...dataBody.data
        ];
      });

      setIsAllDataLoaded(
        dataBody.data.length < requestModel.current.limit
      );
    }
  }, [getCommunitiesApi]);

  const onEndReached = useCallback(async () => {
    requestModel.current.page = requestModel.current.page!! + 1;
    await fetchCommunities();
  }, [fetchCommunities]);

  const refreshCallback = useCallback(
    async (onComplete: () => void) => {
      requestModel.current.page = 1;
      fetchCommunities()
        .then(() => {
          onComplete();
        })
        .catch(() => {
          onComplete();
        });
    },
    [fetchCommunities]
  );

  const filterDataBy = useCallback(
    (type: string) => {
      switch (type) {
        case FeedsTypeFilter.MOST_RECENT: {
          requestModel.current.filterBy = "recent";
          break;
        }
        case FeedsTypeFilter.MOST_POPULAR: {
          requestModel.current.filterBy = "popular";
          break;
        }
        case FeedsTypeFilter.FRIENDS_ONLY: {
          requestModel.current.filterBy = "friend";
          break;
        }
        default: {
          requestModel.current.filterBy = "own";
          break;
        }
      }

      setCommunities(undefined);
      setIsAllDataLoaded(false);
      requestModel.current.page = 1;
      fetchCommunities();
    },
    [fetchCommunities]
  );

  const getFeedsFilterList = () => {
    return getFeedsTypeFilterData();
  };

  const openCommentsScreen = (postId: number) => {
    navigation.navigate("Comments", { postId: postId });
  };

  const openReportContentScreen = (postId: number) => {
    navigation.navigate("ReportContent", { postId: postId });
  };

  const moveToProfileScreen = useCallback(() => {
    navigation.navigate("Profile", { isFrom: EScreen.COMMUNITY });
  }, [navigation]);

  useEffect(() => {
    fetchCommunities().then().catch();
  }, [fetchCommunities]);

  useEffect(() => {
    if (route.params?.postId) {
      setCommunities((prevState) => {
        const spamUserIndex =
          prevState?.findIndex(
            (value) => value.id === route.params?.postId
          ) ?? -1;
        if (spamUserIndex > -1) {
          prevState!.splice(spamUserIndex, 1);
        }
        return prevState;
      });
    }
  }, [route.params?.postId]);

  return (
    <CommunityView
      data={communities}
      shouldShowProgressBar={shouldShowProgressBar}
      onEndReached={onEndReached}
      isAllDataLoaded={isAllDataLoaded}
      error={getCommunitiesApi.error}
      pullToRefreshCallback={refreshCallback}
      feedsFilterData={getFeedsFilterList()}
      openCommentsScreen={openCommentsScreen}
      shouldPlayVideo={shouldPlayVideo}
      openReportContentScreen={openReportContentScreen}
      filterDataBy={filterDataBy}
      moveToProfileScreen={moveToProfileScreen}
    />
  );
};

export default CommunityController;
