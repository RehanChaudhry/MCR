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
  options?: optionsData[] | undefined;
  order?: number;
  isRequired?: number;
  isDefault?: number;
  content?: null;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: null;
  userMeta?: userMetaData[];
};

export type optionsData = {
  id: number;
  value: string;
};

export type userMetaData = {
  value?: string;
};
