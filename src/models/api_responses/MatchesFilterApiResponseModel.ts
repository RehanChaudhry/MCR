type MatchesFilterApiResponseModel = {
  message: string;
  data: FilterCount[];
};

export type FilterCount = {
  type: string;
  count: number;
};

export default MatchesFilterApiResponseModel;
