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
import { HomeStackParamList } from "routes/HomeStack";
import { SinglePostView } from "ui/screens/home/community/single_post/SinglePostView";
import { AppLog } from "utils/Util";
import { PostFeed } from "models/api_responses/FetchPostFeedListResponseModel";
import EScreen from "models/enums/EScreen";
import { useApi } from "repo/Client";
import CommunityAnnouncementApis from "repo/home/CommunityAnnouncementApis";
import { Alert } from "react-native";
import { ActivityLogStackParamList } from "routes/ActivityLogStack";
import { FetchPostFeedResponseModel } from "models/api_responses/FetchPostFeedResponseModel";

type Props = {};

type NotificationNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "SinglePost"
>;
type ActivityLogNavigationProp = StackNavigationProp<
  ActivityLogStackParamList,
  "SinglePost"
>;
type NotificationRouteProp = RouteProp<HomeStackParamList, "SinglePost">;

const SinglePostController: FC<Props> = () => {
  const navigation = useNavigation<
    NotificationNavigationProp & ActivityLogNavigationProp
  >();
  const route = useRoute<NotificationRouteProp>();

  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);
  //  const navigation = useNavigation<CommunityNavigationProp>();
  const [community, setCommunity] = useState<PostFeed | undefined>(
    undefined
  );

  const getCommunitiesApi = useApi<any, FetchPostFeedResponseModel>(
    CommunityAnnouncementApis.getSingleCommunityAnnouncements
  );

  const fetchCommunities = useCallback(async () => {
    const {
      hasError,
      errorBody,
      dataBody
    } = await getCommunitiesApi.request([route.params.postId]);

    if (hasError || dataBody === undefined) {
      Alert.alert("Unable to fetch posts", errorBody);
      return;
    } else {
      setCommunity(dataBody.data);
    }
  }, [getCommunitiesApi, route.params.postId]);

  const openCommentsScreen = (postId: number) => {
    navigation.navigate("Comments", {
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
    navigation.navigate("ReportContent", {
      postId: postId,
      callback: () => {
        AppLog.logForcefully(() => "come back");
      }
    });
  };

  const moveToProfileScreen = useCallback(
    (userId: number) => {
      navigation.navigate("ViewProfile", {
        isFrom: EScreen.NOTIFICATION,
        userId: userId
      });
    },
    [navigation]
  );

  useLayoutEffect(() =>
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <HeaderLeftTextWithIcon onPress={() => navigation.goBack()} />
      ),

      headerTitleAlign: "center",
      headerTitle: () => <HeaderTitle text="Single Post View" />
    })
  );
  useEffect(() => {
    return navigation.addListener("blur", () => {
      AppLog.log(() => "community screen is blur");
      setShouldPlayVideo(false);
    });
  }, [navigation]);

  useEffect(() => {
    return navigation.addListener("focus", () => {
      AppLog.log(() => "community screen is focus");
      setShouldPlayVideo(true);
    });
  }, [navigation]);

  useEffect(() => {
    AppLog.logForcefully(() => "" + setShouldPlayVideo(false));
    fetchCommunities();
  }, [fetchCommunities]);

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
