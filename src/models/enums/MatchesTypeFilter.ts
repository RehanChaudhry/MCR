import { FilterCount } from "models/api_responses/MatchesFilterApiResponseModel";

enum MatchesTypeFilter {
  MATCHES = "matches",
  FRIENDS = "friends",
  NEW = "new",
  RECENTLY_VIEWED = "recently_viewed"
}

export const getMatchesTypeFilterData = () => {
  const filterCounts: FilterCount[] = [];
  filterCounts.push({
    type: MatchesTypeFilter.MATCHES,
    count: 14
  });
  filterCounts.push({
    type: MatchesTypeFilter.FRIENDS,
    count: 28
  });
  filterCounts.push({
    type: MatchesTypeFilter.NEW,
    count: 18
  });
  filterCounts.push({
    type: MatchesTypeFilter.RECENTLY_VIEWED,
    count: 2
  });
  return filterCounts;
};

export default MatchesTypeFilter;
