import { Profile } from "models/api_responses/FetchMyProfileResponseModel";
import { Authentication } from "models/api_responses/SignInApiResponseModel";
import { Uni } from "./UniSelectionResponseModel";

export type UserModel = {
  authentication?: Authentication;
  profile?: Profile;
  uni?: Uni;
};
