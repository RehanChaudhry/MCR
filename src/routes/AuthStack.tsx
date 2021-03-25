import { createStackNavigator } from "@react-navigation/stack";

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ForgotPasswordFeedBack: undefined;
};

export const AuthStack = createStackNavigator<AuthStackParamList>();
