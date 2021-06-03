export type FetchAgreementAnswersResponseModel = {
  message: string;
  data: AgreementAnswers;
};

export type AgreementAnswers = {
  agreementStatus: String;
  agreementFields: [];
};
