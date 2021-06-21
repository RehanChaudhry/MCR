import { SectionsType } from "models/api_responses/DynamicFormSections";
import { EWelcomeFlowStatus } from "models/api_responses/FetchMyProfileResponseModel";

export type UpdateProfileRequestModel = {
  queryParams?: string;
  secondaryEmail?: string | null;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  sections?: SectionsType[];
  welcomeVideoStatus?: EWelcomeFlowStatus;
  questionnaireStatus?: EWelcomeFlowStatus;
};
