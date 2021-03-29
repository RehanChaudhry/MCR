import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import PencilAlt from "assets/images/pencil_alt.svg";
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
import { CommunityStackParamList } from "routes/CommunityStack";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
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
      <HeaderRightTextWithIcon
        onPress={() => {
          navigation.navigate("CreatePost");
        }}
        text="Create Post"
        icon={() => {
          return (
            <PencilAlt
              width={20}
              height={20}
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

  const openCommentsScreen = () => {
    navigation.navigate("Comments");
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
      openCommentsScreen={openCommentsScreen}
    />
  );
};

export default CommunityController;
