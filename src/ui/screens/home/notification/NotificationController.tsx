import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { NotificationView } from "ui/screens/home/notification/NotificationView";
import { useApi } from "repo/Client";
import ProfileApis from "repo/auth/ProfileApis";
import { NotificationsResponseModel } from "models/api_responses/NotificationsResponseModel";
import { AppLog } from "utils/Util";
import { View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import ProgressErrorView from "ui/components/templates/progress_error_view/ProgressErrorView";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { usePreventDoubleTap } from "hooks";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { NotificationParamList } from "routes/NotificationParams";
import EScreen from "models/enums/EScreen";
import { NotificationApiRequestModel } from "models/api_requests/NotificationApiRequestModel";

type NotificationNavigationProp = StackNavigationProp<
  NotificationParamList,
  "ViewProfile"
>;

type Props = {};

const NotificationController: FC<Props> = () => {
  const navigation = useNavigation<NotificationNavigationProp>();

  const [
    notifications,
    setNotifications
  ] = useState<NotificationsResponseModel>();

  const notificationApi = useApi<any, NotificationsResponseModel>(
    ProfileApis.getNotifications
  );
  const isFetchingInProgress = useRef(false);
  const LIMIT = 10;
  const [shouldShowProgressBar, setShouldShowProgressBar] = useState(
    false
  );
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);

  const requestModel = useRef<NotificationApiRequestModel>({
    paginate: true,
    limit: LIMIT,
    page: 1,
    type: "friend-request"
  });

  const openMyProfileScreen = usePreventDoubleTap(() => {
    navigation.push("ViewProfile", { isFrom: EScreen.NOTIFICATION });
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Hamburger />,
      headerTitleAlign: "center",
      headerStyle: { elevation: 0, shadowOpacity: 0 },
      headerTitle: () => <HeaderTitle text="Notification" />
    });
  }, [navigation]);

  const handleGetNotificationApi = useCallback(async () => {
    if (isFetchingInProgress.current) {
      return;
    }
    isFetchingInProgress.current = true;

    const currentPageToReload = requestModel.current.page;

    if (currentPageToReload === 0) {
      AppLog.log("No data left to fetch");
      isFetchingInProgress.current = false;
      setIsAllDataLoaded(true);
      return;
    }

    requestModel.current.page!! > 1 && setShouldShowProgressBar(true);
    const { hasError, dataBody } = await notificationApi.request([
      requestModel.current
    ]);

    setShouldShowProgressBar(false);
    if (!hasError) {
      setNotifications((prevState) => {
        return {
          message: dataBody!.message,
          data: [
            ...(requestModel.current.page!! === 1 ||
            prevState === undefined
              ? []
              : prevState.data),
            ...dataBody!.data
          ]
        };
      });

      if ((dataBody?.data.length ?? 0) < LIMIT) {
        // All data has been loaded
        requestModel.current.page = 0;
      }

      requestModel.current.page = requestModel.current.page!! + 1;
    }

    isFetchingInProgress.current = false;
  }, [notificationApi]);

  const onEndReached = useCallback(() => {
    AppLog.log("onEndReachedcall");
    handleGetNotificationApi();
  }, [handleGetNotificationApi]);

  const refreshCallback = async (onComplete: () => void) => {
    setIsAllDataLoaded(false);
    requestModel.current.page = 1;
    handleGetNotificationApi().then(() => {
      onComplete();
    });
  };

  function clearActivityLogList() {
    requestModel.current.page = 1;
    setNotifications(undefined);
  }

  const searchText = useCallback(
    (textToSearch: string) => {
      clearActivityLogList();
      requestModel.current.type = textToSearch;
      handleGetNotificationApi();
    },
    [handleGetNotificationApi]
  );

  useEffect(() => {
    handleGetNotificationApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProgressErrorView
      isLoading={notificationApi.loading}
      error={notificationApi.error}
      errorView={(message) => {
        return (
          <View>
            <AppLabel text={message} />
          </View>
        );
      }}
      data={notifications}>
      <NotificationView
        isAllDataLoaded={isAllDataLoaded}
        onEndReached={onEndReached}
        pullToRefreshCallback={refreshCallback}
        shouldShowProgressBar={shouldShowProgressBar}
        notifications={notifications?.data}
        openMyProfileScreen={openMyProfileScreen}
        selectedItem={searchText}
      />
    </ProgressErrorView>
  );
};

export default NotificationController;
