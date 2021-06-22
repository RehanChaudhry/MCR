import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState
} from "react";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { NotificationParamList } from "routes/NotificationParams";
import { SinglePostView } from "ui/screens/home/community/single_post/SinglePostView";
import { AppLog } from "utils/Util";
import {
  CommunityAnnouncement,
  CommunityAnnouncementResponseModel
} from "models/api_responses/CommunityAnnouncementResponseModel";
import EScreen from "models/enums/EScreen";
import { useApi } from "repo/Client";
import CommunityAnnouncementApis from "repo/home/CommunityAnnouncementApis";
import { Alert } from "react-native";

type Props = {};

type NotificationNavigationProp = StackNavigationProp<
  NotificationParamList,
  "SinglePost"
>;
type NotificationRouteProp = RouteProp<
  NotificationParamList,
  "SinglePost"
>;

const SinglePostController: FC<Props> = () => {
  const notificationNavigation = useNavigation<NotificationNavigationProp>();
  const route = useRoute<NotificationRouteProp>();

  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);
  //  const navigation = useNavigation<CommunityNavigationProp>();
  const [community, setCommunity] = useState<
    CommunityAnnouncement | undefined
  >(undefined);

  AppLog.log(() => "PostId: " + route.params.postId);

  const getCommunitiesApi = useApi<
    any,
    CommunityAnnouncementResponseModel
  >(CommunityAnnouncementApis.getSingleCommunityAnnouncements);

  const fetchCommunities = useCallback(async () => {
    const {
      hasError,
      errorBody,
      dataBody
    } = await getCommunitiesApi.request([{ postId: route.params.postId }]);

    if (hasError || dataBody === undefined) {
      Alert.alert("Unable to fetch posts", errorBody);
      return;
    } else {
      setCommunity(dataBody.data as CommunityAnnouncement);
      AppLog.logForcefully(
        () => "SinglePost " + JSON.stringify(dataBody?.data)
      );
    }
  }, [getCommunitiesApi, route.params.postId]);

  const openCommentsScreen = (postId: number) => {
    notificationNavigation.navigate("Comments", {
      postId: postId,
      callback: () => {
        setCommunity((prevState) => {
          prevState!.commentsCount++;
          return prevState;
        });
      }
    });
  };

  const openReportContentScreen = (postId: number) => {
    notificationNavigation.navigate("ReportContent", {
      postId: postId,
      callback: () => {
        AppLog.logForcefully(() => "come back");
      }
    });
  };

  const moveToProfileScreen = useCallback(
    (userId: number) => {
      notificationNavigation.navigate("Profile", {
        isFrom: EScreen.NOTIFICATION,
        updateProfile: false,
        userId: userId
      });
    },
    [notificationNavigation]
  );

  useLayoutEffect(() =>
    notificationNavigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <HeaderLeftTextWithIcon
          onPress={() => notificationNavigation.goBack()}
        />
      ),

      headerTitleAlign: "center",
      headerTitle: () => <HeaderTitle text="Single Post View" />
    })
  );
  useEffect(() => {
    return notificationNavigation.addListener("blur", () => {
      AppLog.log(() => "community screen is blur");
      setShouldPlayVideo(false);
    });
  }, [notificationNavigation]);

  useEffect(() => {
    return notificationNavigation.addListener("focus", () => {
      AppLog.log(() => "community screen is focus");
      setShouldPlayVideo(true);
    });
  }, [notificationNavigation]);

  useEffect(() => {
    AppLog.logForcefully(() => "" + setShouldPlayVideo(false));
    fetchCommunities();
  }, [fetchCommunities]);

  AppLog.logForcefully(() => "PostId: " + route.params.postId);

  return (
    <SinglePostView
      postData={community!}
      openCommentsScreen={openCommentsScreen}
      shouldPlayVideo={shouldPlayVideo}
      openReportContentScreen={openReportContentScreen}
      moveToProfileScreen={moveToProfileScreen}
    />
  );
};

export default SinglePostController;
