export type RoommateAgreementResponseModel = {
  message: string;
  data: RoommateData[];
};

export type RoommateData = {
  id: number;
  matchGroupId: null;
  inputType: string;
  label: string;
  placeholder: string;
  options: [
    {
      text: string;
      value: string;
    }
  ];
  order: number;
  isRequired: number;
  isDefault: number;
  content: null;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
};
