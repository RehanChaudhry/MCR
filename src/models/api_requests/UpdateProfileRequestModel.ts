import { SectionsType } from "models/api_responses/DynamicFormSections";
import { EWelcomeFlowStatus } from "models/api_responses/FetchMyProfileResponseModel";

export type UpdateProfileRequestModel = {
  secondaryEmail?: string;
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
  sections?: SectionsType[];
  welcomeVideoStatus?: EWelcomeFlowStatus;
  questionnaireStatus?: EWelcomeFlowStatus;
};
