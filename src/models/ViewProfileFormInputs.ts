export type ViewProfileFormInputs = {
  id: number;
  label: string;
  inputType: string;
  userMeta: UserMeta[];
};

export type UserMeta = {
  value: string;
};
