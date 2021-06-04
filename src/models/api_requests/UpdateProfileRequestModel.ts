import { SectionsType } from "models/api_responses/DynamicFormSections";

export type UpdateProfileRequestModel = {
  secondaryEmail?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  sections?: SectionsType[];
};
