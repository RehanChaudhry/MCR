import { createStackNavigator } from "@react-navigation/stack";

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ForgotPasswordFeedBack: { email: string };
  UniSelection: undefined;
  Welcome: undefined;
  SSO_Login: undefined;
  ContactUs: undefined;
};

export const AuthStack = createStackNavigator<AuthStackParamList>();
