import EIntBoolean from "models/enums/EIntBoolean";

export type RoommateAgreementResponseModel = {
  message: string;
  data: FormInputFieldData[];
};

export type FormInputFieldData = {
  id: number;
  matchGroupId?: null;
  inputType?: string;
  label?: string;
  placeholder?: string;
  options?: OptionsData[] | undefined;
  order?: number;
  isRequired: EIntBoolean;
  isDefault?: number;
  content?: null;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: null;
  userMeta?: userMetaData[];
};

export type OptionsData = {
  id: number;
  value: string;
};

export type userMetaData = {
  value?: string;
};
