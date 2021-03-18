import { CommunityData } from "models/api_responses/CommunityResponseModel";
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
  const [shouldShowProgressBar, setShouldShowProgressBar] = useState(
    false
  );
  const [communities, setCommunities] = useState<
    CommunityData[] | undefined
  >([]);
  const pageToReload = useRef<number>(1);
  const isFetchingInProgress = useRef(false);

  const fetchData = useCallback(async () => {
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
    const communitiesData = DataGenerator.getCommunityList(
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
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <CommunityView
      data={communities}
      shouldShowProgressBar={shouldShowProgressBar}
      onEndReached={onEndReached}
      isAllDataLoaded={isAllDataLoaded}
    />
  );
};

export default CommunityController;
