import AgreementStatus from "models/enums/AgreementStatusType";

export type AgreementDetailsResponseModel = {
  message: string;
  data: AgreementDetailsData[];
};
export type AgreementDetailsData = {
  id: number;
  username: string;
  updated_At: string;
  status: AgreementStatus;
};
