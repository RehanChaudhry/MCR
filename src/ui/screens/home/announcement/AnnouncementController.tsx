import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Strings from "config/Strings";
import {
  CommunityAnnouncement,
  CommunityAnnouncementResponseModel
} from "models/api_responses/CommunityAnnouncementResponseModel";
import EScreen from "models/enums/EScreen";
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
  const [announcements, setAnnouncements] = useState<
    CommunityAnnouncement[] | undefined
  >(undefined);
  const navigation = useNavigation<AnnouncementNavigationProp>();
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);

  useEffect(() => {
    return navigation.addListener("blur", () => {
      AppLog.log(() => "announcements screen is blur");
      setShouldPlayVideo(false);
    });
  }, [navigation]);

  useEffect(() => {
    return navigation.addListener("focus", () => {
      AppLog.log(() => "announcements screen is focus");
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

    isFetchingInProgress.current = false;
    if (hasError || dataBody === undefined) {
      Alert.alert("Unable to fetch announcements", errorBody);
      setShouldShowProgressBar(false);
      return;
    } else {
      setAnnouncements((prevState) => {
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

      requestModel.current.page = (requestModel?.current?.page ?? 0) + 1;
      setShouldShowProgressBar(false);
    }
  }, [getAnnouncementsApi]);

  const onEndReached = useCallback(async () => {
    requestModel.current.page = requestModel.current.page!! + 1;
    await fetchAnnouncements();
  }, [fetchAnnouncements]);

  const refreshCallback = useCallback(
    async (onComplete?: () => void) => {
      requestModel.current.page = 1;
      fetchAnnouncements()
        .then(() => {
          onComplete?.();
        })
        .catch(() => {
          onComplete?.();
        });
    },
    [fetchAnnouncements]
  );

  const openCommentsScreen = useCallback(
    (postId: number) => {
      navigation.navigate("Comments", { postId: postId });
    },
    [navigation]
  );

  useEffect(() => {
    fetchAnnouncements().then().catch();
  }, [fetchAnnouncements]);

  const moveToProfileScreen = useCallback(
    (userId: number) => {
      navigation.navigate("Profile", {
        isFrom: EScreen.ANNOUNCEMENT,
        updateProfile: false,
        userId: userId
      });
    },
    [navigation]
  );

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
      moveToProfileScreen={moveToProfileScreen}
    />
  );
};

export default AnnouncementController;
