import { DropDownItem } from "models/DropDownItem";

enum EGender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other"
}

export const genders: DropDownItem[] = [
  { text: undefined, value: "All genders" },
  { text: EGender.MALE, value: "Male" },
  { text: EGender.FEMALE, value: "Female" },
  { text: EGender.OTHER, value: "Others" }
];

export default EGender;
