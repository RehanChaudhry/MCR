import { CommunityAnnouncement } from "models/api_responses/CommunityAnnouncementResponseModel";
import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { CommunityView } from "ui/screens/home/community/CommunityView";
import DataGenerator from "utils/DataGenerator";

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
    />
  );
};

export default CommunityController;
