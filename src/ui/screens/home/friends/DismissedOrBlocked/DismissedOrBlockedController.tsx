import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { COLORS, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import StaticContentRequestModel, {
  StaticContentType
} from "models/api_requests/StaticContentRequestModel";
import StaticContentResponseModel, {
  StaticContent
} from "models/api_responses/StaticContentResponseModel";
import EScreen from "models/enums/EScreen";
import RelationFilterType from "models/enums/RelationFilterType";
import RelationModel from "models/RelationModel";
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import { StyleSheet, View } from "react-native";
import { useApi } from "repo/Client";
import OtherApis from "repo/home/OtherApis";
import { FriendsRootStackParamList } from "routes/FriendsRootStack";
import { DismissedOrBlockStackParamList } from "routes/FriendsStack";
import {
  Choice,
  SegmentedControl
} from "ui/components/molecules/segmented_control/SegmentedControl";
import { AppDataContext } from "ui/screens/home/friends/AppDataProvider";
import useFetchRelations from "ui/screens/home/friends/useFetchRelations";
import { AppLog } from "utils/Util";
import DismissedOrBlockedView from "./DismissedOrBlockedView";

type Props = {};

type DismissBlockNavigationProp = StackNavigationProp<DismissedOrBlockStackParamList>;

type FriendsNavigationProp = StackNavigationProp<
  FriendsRootStackParamList,
  "ConnectRequests"
>;

const DismissedOrBlockedController: FC<Props> = () => {
  const navigation = useNavigation<FriendsNavigationProp>();
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  const dismissBlockRootNavigation = useNavigation<DismissBlockNavigationProp>();
  const { dismissed, setDismissed } = useContext(AppDataContext);
  const { blocked, setBlocked } = useContext(AppDataContext);

  const {
    isLoading: isLoadingDismissed,
    canLoadMore: canLoadMoreDismissed,
    onEndReached: onEndReachedDismissed,
    errorMessage: errorMessageDismissed,
    onPullToRefresh: onPullToRefreshDismissed
  } = useFetchRelations(
    RelationFilterType.DISMISSED,
    dismissed,
    setDismissed
  );

  const {
    isLoading: isLoadingBlocked,
    canLoadMore: canLoadMoreBlocked,
    onEndReached: onEndReachedBlocked,
    errorMessage: errorMessageBlocked,
    onPullToRefresh: onPullToRefreshBlocked
  } = useFetchRelations(RelationFilterType.BLOCKED, blocked, setBlocked);

  // static content
  const [headerContent, setHeaderContent] = useState<StaticContent>();

  const staticContentApi = useApi<
    StaticContentRequestModel,
    StaticContentResponseModel
  >(OtherApis.staticContent);

  const getHeaderContent = useCallback(async () => {
    const {
      hasError,
      dataBody,
      errorBody
    } = await staticContentApi.request([
      { type: StaticContentType.DISMISSED_LIST }
    ]);
    if (hasError || dataBody === undefined) {
      AppLog.logForComplexMessages(
        () => "Unable to find header content " + errorBody
      );
      return;
    } else {
      setHeaderContent(dataBody.data);
    }
  }, [staticContentApi]);

  const moveToHeaderContent = useCallback(() => {
    dismissBlockRootNavigation.navigate("StaticContent", {
      isFrom: EScreen.MY_FRIENDS,
      staticContent: headerContent!
    });
  }, [dismissBlockRootNavigation, headerContent]);

  const theme = usePreferredTheme();

  const onTabChanged = (value: Choice, index: number) => {
    setSelectedTabIndex(index);
  };

  const moveToProfileScreen = useCallback(() => {
    navigation.navigate("Profile", { isFrom: EScreen.MY_FRIENDS });
  }, [navigation]);

  useEffect(() => {
    getHeaderContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View>
          <View style={styles.segmentedControlContainer}>
            <SegmentedControl
              onChange={onTabChanged}
              values={[
                { label: "Dismissed", value: "0" },
                { label: "Blocked", value: "1" }
              ]}
            />
          </View>
          <View
            style={[
              styles.separator,
              { backgroundColor: theme.themedColors.separator }
            ]}
          />
        </View>
        {selectedTabIndex === 0 ? (
          <DismissedOrBlockedView
            headerTitle={headerContent?.title!}
            headerSubtitle={headerContent?.description!}
            learnMoreTitle={"Learn more about dismissed list"}
            learnMoreAction={moveToHeaderContent}
            data={dismissed}
            isLoading={isLoadingDismissed}
            canLoadMore={canLoadMoreDismissed}
            error={errorMessageDismissed}
            onEndReached={onEndReachedDismissed}
            onPullToRefresh={onPullToRefreshDismissed}
            onPressChat={(item: RelationModel) => {
              AppLog.logForComplexMessages(() => "onPressChat: ", item);
            }}
            onPressProfile={moveToProfileScreen}
            selectedTab={selectedTabIndex}
          />
        ) : (
          <DismissedOrBlockedView
            headerTitle={headerContent?.title!}
            headerSubtitle={headerContent?.description!}
            learnMoreTitle={"Learn more about blocked list"}
            learnMoreAction={moveToHeaderContent}
            data={blocked}
            isLoading={isLoadingBlocked}
            canLoadMore={canLoadMoreBlocked}
            error={errorMessageBlocked}
            onEndReached={onEndReachedBlocked}
            onPullToRefresh={onPullToRefreshBlocked}
            onPressChat={(item: RelationModel) => {
              AppLog.logForComplexMessages(() => "onPressChat: ", item);
            }}
            onPressProfile={moveToProfileScreen}
            selectedTab={selectedTabIndex}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  segmentedControlContainer: {
    paddingLeft: SPACE.lg,
    paddingRight: SPACE.lg,
    paddingTop: SPACE.sm,
    paddingBottom: SPACE.sm,
    backgroundColor: COLORS.white
  },
  separator: {
    width: "100%",
    height: 0.5
  }
});

export default DismissedOrBlockedController;
