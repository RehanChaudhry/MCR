enum EGender {
  ALL = "all",
  MALE = "male",
  FEMALE = "female",
  OTHER = "other"
}

export const genders = [
  { id: EGender.ALL, title: "All genders" },
  { id: EGender.MALE, title: "Male" },
  { id: EGender.FEMALE, title: "Female" },
  { id: EGender.OTHER, title: "Others" }
];

export default EGender;
