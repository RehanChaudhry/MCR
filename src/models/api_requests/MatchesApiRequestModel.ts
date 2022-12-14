import EGender from "models/enums/EGender";
import MatchesTypeFilter from "models/enums/MatchesTypeFilter";

type MatchesApiRequestModel = {
  page: number;
  limit?: number;
  keyword?: string;
  gender?: EGender;
  type: MatchesTypeFilter;
};

export default MatchesApiRequestModel;
