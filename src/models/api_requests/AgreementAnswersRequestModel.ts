export interface AgreementAnswersRequestModel {
  agreementUserAnswers?: AgreementUserAnswer[];
  agreementAccepted?: boolean;
  status?: string;
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

// export interface Roommate {
//   userId: number | undefined;
//   status: string;
// }
