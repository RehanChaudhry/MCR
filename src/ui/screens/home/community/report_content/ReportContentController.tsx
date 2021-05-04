import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { usePreferredTheme, usePreventDoubleTap } from "hooks";
import ReportContentApiRequestModel from "models/api_requests/ReportContentApiRequestModel";
import ReportContentApiResponseModel from "models/api_responses/ReportContentApiResponseModel";
import React, { FC, useLayoutEffect } from "react";
import { Alert } from "react-native";
import { useApi } from "repo/Client";
import CommunityAnnouncementApis from "repo/home/CommunityAnnouncementApis";
import { CommunityStackParamList } from "routes/CommunityStack";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { ReportContentView } from "ui/screens/home/community/report_content/ReportContentView";
import { AppLog } from "utils/Util";

type CommunityNavigationProp = StackNavigationProp<
  CommunityStackParamList,
  "ReportContent"
>;

type ReportContentRoute = RouteProp<
  CommunityStackParamList,
  "ReportContent"
>;

type Props = {};

const ReportContentController: FC<Props> = () => {
  const navigation = useNavigation<CommunityNavigationProp>();
  const theme = usePreferredTheme();
  const route = useRoute<ReportContentRoute>();

  AppLog.log("communityid: " + route.params.postId);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftTextWithIcon
          onPress={() => {
            navigation.pop();
          }}
        />
      ),
      headerTitleAlign: "center",
      headerTitle: () => <HeaderTitle text="Report Content" />
    });
  }, [navigation, theme]);

  const closeScreen = () => {
    navigation.goBack();
  };

  const reportContentApi = useApi<
    ReportContentApiRequestModel,
    ReportContentApiResponseModel
  >(CommunityAnnouncementApis.postReportContent);

  const handleReportContent = usePreventDoubleTap(
    async (apiRequestModel: ReportContentApiRequestModel) => {
      const {
        hasError,
        errorBody,
        dataBody
      } = await reportContentApi.request([apiRequestModel]);

      if (hasError || dataBody === undefined) {
        Alert.alert("Unable to post report content", errorBody);
        return;
      } else {
        AppLog.log(dataBody.message);
        closeScreen();
      }
    }
  );

  return (
    <ReportContentView
      communityId={route.params.postId}
      closeScreen={closeScreen}
      onPostReportContent={handleReportContent}
      shouldShowProgressBar={reportContentApi.loading}
    />
  );
};

export default ReportContentController;
