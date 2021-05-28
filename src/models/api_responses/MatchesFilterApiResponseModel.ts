import { FilterCount } from "models/enums/MatchesTypeFilter";

type MatchesFilterApiResponseModel = {
  message: string;
  data: FilterCount[];
};

export default MatchesFilterApiResponseModel;
