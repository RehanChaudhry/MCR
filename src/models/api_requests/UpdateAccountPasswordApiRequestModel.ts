export type UpdateAccountPasswordApiRequestModel = {
  secondaryEmail: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
};
