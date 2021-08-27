export type MatchesGenderResponseModel = {
  message: string;
  data?: GenderData[];
};

export type GenderData = {
  id: number;
  title: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  isAssociated: number;
};
