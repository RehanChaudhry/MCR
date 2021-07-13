import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute
} from "@react-navigation/native";
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
import {
  Choice,
  SegmentedControl
} from "ui/components/molecules/segmented_control/SegmentedControl";
import { AppDataContext } from "ui/screens/home/friends/AppDataProvider";
import useFetchRelations from "ui/screens/home/friends/useFetchRelations";
import { AppLog } from "utils/Util";
import DismissedOrBlockedView from "./DismissedOrBlockedView";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { HomeStackParamList } from "routes/HomeStack";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import useCreateConversation from "hooks/useCreateConversation";
import { User } from "models/User";

type Props = {};

type FriendsNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "DismissedOrBlocked"
>;

type FriendsRouteProp = RouteProp<
  HomeStackParamList,
  "DismissedOrBlocked"
>;

const DismissedOrBlockedController: FC<Props> = () => {
  const navigation = useNavigation<FriendsNavigationProp>();
  const route = useRoute<FriendsRouteProp>();

  useFocusEffect(
    useCallback(() => {
      if (route.params?.isFrom === EScreen.HOME) {
        navigation.dangerouslyGetParent()?.setOptions({
          headerTitleAlign: "center",
          headerTitle: () => <HeaderTitle text="Dismissed or Blocked" />,
          headerLeft: () => <Hamburger />,
          headerRight: () => null
        });
      } else {
        navigation.setOptions({
          headerTitleAlign: "center",
          headerLeft: () => (
            <HeaderLeftTextWithIcon
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          headerTitle: () => <HeaderTitle text="Dismissed or Blocked" />
        });
      }
    }, [navigation, route.params?.isFrom])
  );
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  const {
    dismissed,
    setDismissed,
    setActiveConversations,
    setInActiveConversations
  } = useContext(AppDataContext);
  const { blocked, setBlocked } = useContext(AppDataContext);
  const { createConversationAndNavigate } = useCreateConversation();

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
  const [
    blockedHeaderContent,
    setBlockedHeaderContent
  ] = useState<StaticContent>();

  const staticContentApi = useApi<
    StaticContentRequestModel,
    StaticContentResponseModel
  >(OtherApis.staticContent);

  const getHeaderContent = useCallback(
    async (type: StaticContentType) => {
      const {
        hasError,
        dataBody,
        errorBody
      } = await staticContentApi.request([{ type: type }]);
      if (hasError || dataBody === undefined) {
        AppLog.log(() => "Unable to find header content " + errorBody);
        return;
      } else {
        if (type === StaticContentType.DISMISSED_LIST) {
          setHeaderContent(dataBody.data);
        } else {
          setBlockedHeaderContent(dataBody.data);
        }
      }
    },
    [staticContentApi]
  );

  const moveToHeaderContent = useCallback(() => {
    navigation.navigate("StaticContent", {
      isFrom: EScreen.MY_FRIENDS,
      staticContent: headerContent!
    });
  }, [navigation, headerContent]);

  const moveToBlockedHeaderContent = useCallback(() => {
    navigation.navigate("StaticContent", {
      isFrom: EScreen.MY_FRIENDS,
      staticContent: blockedHeaderContent!
    });
  }, [navigation, blockedHeaderContent]);

  const theme = usePreferredTheme();

  const onTabChanged = (value: Choice, index: number) => {
    if (index === 0) {
      getHeaderContent(StaticContentType.DISMISSED_LIST);
    } else {
      getHeaderContent(StaticContentType.BLOCKED_LIST);
    }
    setSelectedTabIndex(index);
  };

  const moveToProfileScreen = useCallback(
    (relationModel: RelationModel) => {
      navigation.navigate("ViewProfile", {
        isFrom: EScreen.MY_FRIENDS,
        userId: relationModel.user!.id!
      });
    },
    [navigation]
  );

  const moveToChatScreen = async (profileMatch: RelationModel) => {
    createConversationAndNavigate(
      (profileMatch.user as unknown) as User,
      setActiveConversations,
      setInActiveConversations
    );
  };

  useEffect(() => {
    getHeaderContent(StaticContentType.DISMISSED_LIST);
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
            onPullToRefresh={(
              onComplete?: (data?: RelationModel[]) => void
            ) => {
              getHeaderContent(StaticContentType.DISMISSED_LIST)
                .then()
                .catch();
              onPullToRefreshDismissed(onComplete);
            }}
            onPressChat={(item: RelationModel) => {
              moveToChatScreen(item).then().catch();
            }}
            onPressProfile={moveToProfileScreen}
            selectedTab={selectedTabIndex}
          />
        ) : (
          <DismissedOrBlockedView
            headerTitle={blockedHeaderContent?.title!}
            headerSubtitle={blockedHeaderContent?.description!}
            learnMoreTitle={"Learn more about blocked list"}
            learnMoreAction={moveToBlockedHeaderContent}
            data={blocked}
            isLoading={isLoadingBlocked}
            canLoadMore={canLoadMoreBlocked}
            error={errorMessageBlocked}
            onEndReached={onEndReachedBlocked}
            onPullToRefresh={(
              onComplete?: (data?: RelationModel[]) => void
            ) => {
              getHeaderContent(StaticContentType.BLOCKED_LIST)
                .then()
                .catch();
              onPullToRefreshBlocked(onComplete);
            }}
            onPressChat={(item: RelationModel) => {
              moveToChatScreen(item).then().catch();
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
