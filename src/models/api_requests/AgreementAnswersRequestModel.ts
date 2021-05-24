export interface AgreementAnswersRequestModel {
  agreementUserAnswers: AgreementUserAnswer[];
  roommates: Roommate[] | undefined;
  agreementAccepted: boolean;
  agreementId?: number;
}

export interface AgreementUserAnswer {
  agreementFieldId: number;
  agreementFieldValue: AgreementFieldValueElement[] | string;
}

export interface AgreementFieldValueElement {
  text: string;
  value: string;
}

export interface Roommate {
  userId: number;
  status: string;
}
