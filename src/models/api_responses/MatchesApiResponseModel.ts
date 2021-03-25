import { Pagination } from "models/Pagination";
import ProfileMatch from "models/ProfileMatch";

type MatchesApiResponseModel = {
  message: string;
  data: ProfileMatch[];
  pagination?: Pagination;
};

export default MatchesApiResponseModel;
