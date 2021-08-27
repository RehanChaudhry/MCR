import MatchesTypeFilter from "models/enums/MatchesTypeFilter";

export type PaginationParamsModel = {
  userId?: number;
  page?: number;
  limit?: number;
  paginate?: boolean;
  type?: string;
  actionType?: string;
  keyword?: string;
  gender?: string;
  filterBy?: MatchesTypeFilter;
};
