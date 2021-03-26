import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CommunityAnnouncement } from "models/api_responses/CommunityAnnouncementResponseModel";
import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { AnnouncementStackParamList } from "routes/AnnouncementStack";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { AnnouncementView } from "ui/screens/home/announcement/AnnouncementView";
import DataGenerator from "utils/DataGenerator";

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
  const pageToReload = useRef<number>(1);
  const isFetchingInProgress = useRef(false);
  const [announcement, setAnnouncements] = useState<
    CommunityAnnouncement[] | undefined
  >(DataGenerator.getCommunityAnnouncementList(pageToReload.current));
  const navigation = useNavigation<AnnouncementNavigationProp>();

  navigation.setOptions({
    headerLeft: () => <Hamburger />,
    headerTitleAlign: "center",
    headerTitle: () => <HeaderTitle text="Announcement" />
  });

  const fetchAnnouncements = useCallback(async () => {
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
    setShouldShowProgressBar(true);
    const announcementsData = DataGenerator.getCommunityAnnouncementList(
      pageToReload.current
    );
    setShouldShowProgressBar(false);
    if (pageToReload.current < 5) {
      pageToReload.current = pageToReload.current + 1;
    } else {
      pageToReload.current = 0;
    }

    // Make list empty first
    if (currentPageToReload === 1) {
      setAnnouncements([]);
    }
    setAnnouncements((prevState) => {
      return [
        ...(prevState === undefined || currentPageToReload === 1
          ? []
          : prevState),
        ...announcementsData
      ];
    });
    isFetchingInProgress.current = false;
  }, []);

  const onEndReached = useCallback(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const refreshCallback = useCallback(
    async (onComplete: () => void) => {
      pageToReload.current = 1;
      fetchAnnouncements().then(() => {
        onComplete();
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageToReload]
  );

  useEffect(() => {
    setTimeout(() => {
      fetchAnnouncements();
    }, 1000);
  }, [fetchAnnouncements]);

  return (
    <AnnouncementView
      data={announcement}
      shouldShowProgressBar={shouldShowProgressBar}
      onEndReached={onEndReached}
      isAllDataLoaded={isAllDataLoaded}
      pullToRefreshCallback={refreshCallback}
    />
  );
};

export default AnnouncementController;
