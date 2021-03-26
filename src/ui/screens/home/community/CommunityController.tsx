import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import PencilAlt from "assets/images/pencil_alt.svg";
import { FONT_SIZE, SPACE } from "config";
import { moderateScale } from "config/Dimens";
import { usePreferredTheme } from "hooks";
import { CommunityAnnouncement } from "models/api_responses/CommunityAnnouncementResponseModel";
import { getFeedsTypeFilterData } from "models/enums/FeedsTypeFilter";
import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { CommunityStackParamList } from "routes/CommunityStack";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { CommunityView } from "ui/screens/home/community/CommunityView";
import DataGenerator from "utils/DataGenerator";

type CommunityNavigationProp = StackNavigationProp<
  CommunityStackParamList,
  "Community"
>;

type Props = {};

const CommunityController: FC<Props> = () => {
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [shouldShowProgressBar, setShouldShowProgressBar] = useState(true);
  const pageToReload = useRef<number>(1);
  const isFetchingInProgress = useRef(false);
  const [communities, setCommunities] = useState<CommunityAnnouncement[]>(
    DataGenerator.getCommunityAnnouncementList(pageToReload.current)
  );
  const totalPages = 5;
  const navigation = useNavigation<CommunityNavigationProp>();
  const theme = usePreferredTheme();

  navigation.setOptions({
    headerRight: () => (
      <Pressable
        onPress={() => {
          navigation.navigate("CreatePost");
        }}>
        <View style={style.headerView}>
          <AppLabel
            text="Create Post"
            style={[
              {
                color: theme.themedColors.primary
              },
              style.headerLeftRightText
            ]}
            weight="semi-bold"
          />
          <PencilAlt
            width={20}
            height={20}
            fill={theme.themedColors.primary}
          />
        </View>
      </Pressable>
    ),
    headerRightContainerStyle: {
      padding: SPACE.md
    },
    headerLeft: () => <Hamburger />,
    headerTitleAlign: "center",
    headerTitle: () => <HeaderTitle text="Community" />
  });

  const fetchCommunities = useCallback(async () => {
    if (isFetchingInProgress.current) {
      return;
    }
    isFetchingInProgress.current = true;
    const currentPageToReload = pageToReload.current;
    if (currentPageToReload === 0) {
      isFetchingInProgress.current = false;
      setIsAllDataLoaded(true);
      return;
    }
    const communitiesData = DataGenerator.getCommunityAnnouncementList(
      pageToReload.current
    );
    if (pageToReload.current < totalPages) {
      pageToReload.current = pageToReload.current + 1;
    } else {
      pageToReload.current = 0;
    }

    // Make list empty first
    if (currentPageToReload === 1) {
      setCommunities([]);
    }
    setCommunities((prevState) => {
      return [
        ...(prevState === undefined || currentPageToReload === 1
          ? []
          : prevState),
        ...communitiesData
      ];
    });
    isFetchingInProgress.current = false;
  }, []);

  const onEndReached = useCallback(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  const refreshCallback = useCallback(
    async (onComplete: () => void) => {
      pageToReload.current = 1;
      fetchCommunities().then(() => {
        onComplete();
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageToReload]
  );

  const getFeedsFilterList = () => {
    return getFeedsTypeFilterData();
  };

  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  return (
    <CommunityView
      data={communities}
      shouldShowProgressBar={shouldShowProgressBar}
      onEndReached={onEndReached}
      isAllDataLoaded={isAllDataLoaded}
      pullToRefreshCallback={refreshCallback}
      feedsFilterData={getFeedsFilterList()}
    />
  );
};

const style = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerLeftRightText: {
    padding: moderateScale(2.0),
    fontSize: FONT_SIZE.md
  },
  headerTitle: {
    fontSize: FONT_SIZE.lg
  }
});

export default CommunityController;
