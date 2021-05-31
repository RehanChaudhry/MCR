import { FormInputFieldData } from "models/api_responses/RoommateAgreementResponseModel";

export type DynamicFormSections = {
  sections?: SectionsType[];
};

export type SectionsType = {
  title?: string;
  description?: string;
  formInputs?: FormInputFieldData[] | undefined;
  placeHolder?: string;
};
