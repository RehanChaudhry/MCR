import { SectionsType } from "models/api_responses/DynamicFormSections";

export type UpdateProfileRequestModel = {
  secondaryEmail?: string;
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
  sections?: SectionsType[];
};
