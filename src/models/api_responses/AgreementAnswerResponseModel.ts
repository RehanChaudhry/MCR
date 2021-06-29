export interface AgreementAnswerResponseModel {
  message: string;
  data: AgreementData;
}

export interface AgreementData {
  agreementStatus?: string;
  agreementAccepted?: null;
  approvalInformation?: ApprovalInformation;
  roommateAgreementParties?: RoommateAgreementParty[];
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
