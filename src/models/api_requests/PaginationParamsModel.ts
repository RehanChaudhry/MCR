import EGender from "models/enums/EGender";
import MatchesTypeFilter from "models/enums/MatchesTypeFilter";

export type PaginationParamsModel = {
  page?: number;
  limit?: number;
  paginate?: boolean;
  type?: string;
  keyword?: string;
  gender?: EGender;
  filterBy?: MatchesTypeFilter;
};
