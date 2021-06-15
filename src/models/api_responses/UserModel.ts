import { Profile } from "models/api_responses/FetchMyProfileResponseModel";
import { Authentication } from "models/api_responses/SignInApiResponseModel";

export type UserModel = {
  authentication?: Authentication;
  profile?: Profile;
};
