import { Profile } from "./FetchMyProfileResponseModel";

export type UpdateProfileResponseModel = {
  message: string;
  data?: Profile;
};
