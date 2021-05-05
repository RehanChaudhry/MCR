export type FilterCount = {
  type: string;
  count: number;
};

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
    count: 0
  });
  filterCounts.push({
    type: MatchesTypeFilter.FRIENDS,
    count: 0
  });
  filterCounts.push({
    type: MatchesTypeFilter.NEW,
    count: 0
  });
  filterCounts.push({
    type: MatchesTypeFilter.RECENTLY_VIEWED,
    count: 0
  });
  return filterCounts;
};

export default MatchesTypeFilter;
