import EGender from "models/enums/EGender";
import MatchesTypeFilter from "models/enums/MatchesTypeFilter";

export type RelationApiRequestModel = {
  type: string;
  page: number;
  paginate: boolean;
  keyword?: string;
  gender?: EGender;
  filterBy?: MatchesTypeFilter;
};
