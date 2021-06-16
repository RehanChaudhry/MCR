import EIntBoolean from "models/enums/EIntBoolean";
import { ProfilePicture } from "models/User";

export type RoommateAgreementResponseModel = {
  message: string;
  data: FormInputFieldData[];
};

export type FormInputFieldData = {
  firstName?: string;
  lastName?: string;
  fieldName?: string;
  id: number;
  name: string;
  matchGroupId?: null;
  inputType?: string;
  label?: string;
  placeholder?: string;
  options?: OptionsData[] | undefined;
  order?: number;
  isLocked: EIntBoolean;
  isRequired: EIntBoolean;
  icon?: string;
  isDefault?: number;
  content?: null;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: null;
  userMeta?: UserMetaData[];
  profilePicture?: ProfilePicture;
  intendedMajor?: string;
  homeTown: string | undefined;
  youtubeVideoUrl?: string | null;
};

export type OptionsData = {
  value: string;
  text: string;
};

export type UserMetaData = {
  value?: string;
};
