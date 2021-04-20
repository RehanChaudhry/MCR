import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Strings from "config/Strings";
import {
  CommunityAnnouncement,
  CommunityAnnouncementResponseModel
} from "models/api_responses/CommunityAnnouncementResponseModel";
import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { AnnouncementStackParamList } from "routes/AnnouncementStack";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { AnnouncementView } from "ui/screens/home/announcement/AnnouncementView";
import { AppLog } from "utils/Util";
import AnnouncementRequestModel from "models/api_requests/AnnouncementRequestModel";
import { useApi } from "repo/Client";
import CommunityAnnouncementApis from "repo/home/CommunityAnnouncementApis";
import { Alert } from "react-native";
import { LikeDislikeResponseModel } from "models/api_responses/LikeDislikeResponseModel";

type AnnouncementNavigationProp = StackNavigationProp<
  AnnouncementStackParamList,
  "Announcement"
>;

type Props = {};

const AnnouncementController: FC<Props> = () => {
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);
  const [shouldShowProgressBar, setShouldShowProgressBar] = useState(
    false
  );
  const isFetchingInProgress = useRef(false);
  const [announcements, _announcements] = useState<
    CommunityAnnouncement[]
  >([]);
  const navigation = useNavigation<AnnouncementNavigationProp>();
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);

  useEffect(() => {
    return navigation.addListener("blur", () => {
      AppLog.log("announcements screen is blur");
      setShouldPlayVideo(false);
    });
  }, [navigation]);

  useEffect(() => {
    return navigation.addListener("focus", () => {
      AppLog.log("announcements screen is focus");
      setShouldPlayVideo(true);
    });
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Hamburger />,
      headerTitleAlign: "center",
      headerTitle: () => (
        <HeaderTitle text={Strings.announcement.announcementTitle} />
      )
    });
  }, [navigation]);

  const requestModel = useRef<AnnouncementRequestModel>({
    paginate: true,
    page: 1,
    limit: 10,
    type: "announcements"
  });

  const getAnnouncementsApi = useApi<
    AnnouncementRequestModel,
    CommunityAnnouncementResponseModel
  >(CommunityAnnouncementApis.getCommunityAnnouncements);

  const likeDislikeApi = useApi<number, LikeDislikeResponseModel>(
    CommunityAnnouncementApis.likeDislike
  );

  const fetchAnnouncements = useCallback(async () => {
    if (isFetchingInProgress.current) {
      return;
    }

    isFetchingInProgress.current = true;
    setShouldShowProgressBar(true);

    const {
      hasError,
      errorBody,
      dataBody
    } = await getAnnouncementsApi.request([requestModel.current]);

    setShouldShowProgressBar(false);

    isFetchingInProgress.current = false;
    if (hasError || dataBody === undefined) {
      Alert.alert("Unable to Sign In", errorBody);
      return;
    } else {
      // to handle pull to refresh
      if (requestModel.current.page === 1) {
        _announcements([]);
      }

      _announcements((prevState) => {
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

      requestModel.current.page =
        announcements.length / requestModel.current.limit + 1;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const likeDislikeApiCall = async (postId: number): Promise<boolean> => {
    AppLog.logForcefully("like dislike api : " + postId);

    const {
      hasError,
      errorBody,
      dataBody
    } = await likeDislikeApi.request([postId]);

    if (hasError || dataBody === undefined) {
      Alert.alert("Unable to Sign In", errorBody);
      return false; //return to announcements footer
    } else {
      return true; //return to announcements footer
    }
  };

  const onEndReached = useCallback(async () => {
    requestModel.current.page = requestModel.current.page!! + 1;
    await fetchAnnouncements();
  }, [fetchAnnouncements]);

  const refreshCallback = useCallback(
    async (onComplete?: () => void) => {
      requestModel.current.page = 1;
      fetchAnnouncements().then(() => {
        onComplete?.();
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const openCommentsScreen = (postId: number) => {
    navigation.navigate("Comments", { postId: postId });
  };

  useEffect(() => {
    fetchAnnouncements().then().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnnouncementView
      data={announcements}
      shouldShowProgressBar={shouldShowProgressBar}
      onEndReached={onEndReached}
      error={getAnnouncementsApi.error}
      isAllDataLoaded={isAllDataLoaded}
      pullToRefreshCallback={refreshCallback}
      openCommentsScreen={openCommentsScreen}
      shouldPlayVideo={shouldPlayVideo}
      likeDislikeAPi={likeDislikeApiCall}
    />
  );
};

export default AnnouncementController;
