export type FilterCount = {
  type: string;
};

enum FeedsTypeFilter {
  MOST_RECENT = "Most Recent",
  MOST_POPULAR = "Most Popular",
  FRIENDS_ONLY = "Friends Only",
  OWN_POSTS = "Own Posts"
}

export const getFeedsTypeFilterData = () => {
  const filterCounts: FilterCount[] = [];
  filterCounts.push({
    type: FeedsTypeFilter.MOST_RECENT
  });
  filterCounts.push({
    type: FeedsTypeFilter.MOST_POPULAR
  });
  filterCounts.push({
    type: FeedsTypeFilter.FRIENDS_ONLY
  });
  filterCounts.push({
    type: FeedsTypeFilter.OWN_POSTS
  });
  return filterCounts;
};

export default FeedsTypeFilter;
