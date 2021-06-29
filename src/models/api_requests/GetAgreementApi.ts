export interface GetAgreementApi {
  message: string;
  data: Data;
}

export interface Data {
  agreementStatus: string;
  agreementAccepted: null;
  agreementFields: AgreementField[];
  roommateAgreementParties: RoommateAgreementParty[];
  approvalInformation: ApprovalInformation;
}

export interface AgreementField {
  id: number;
  label: string;
  content: null | string;
  inputType: string;
  options: Option[] | null;
  placeholder: string;
  isRequired: number;
  agreementUserAnswers: AgreementUserAnswer[];
}

export interface AgreementUserAnswer {
  id: number;
  agreementID: number;
  agreementFieldID: number;
  agreementFieldValue: string;
}

export interface Option {
  text: string;
  value: string;
}

export interface ApprovalInformation {
  approvalStatus: string;
  approvalDate: null;
  approvedBy: null;
}

export interface RoommateAgreementParty {
  userId: number;
  firstName: string;
  lastName: string;
  status: string;
  submittedAt: Date | null;
  profilePicture: ProfilePicture;
}

export interface ProfilePicture {
  fileURL: string;
  originalName: string;
}
