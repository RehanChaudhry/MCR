import React, { FC } from "react";
import LoginController from "ui/screens/auth/login/LoginController";
import SignUpController from "ui/screens/auth/sign_up/SignUpController";
import { AuthStack } from "./AuthStack";
import ForgotPasswordController from "ui/screens/auth/forgot_password/ForgotPasswordController";
import ForgotPasswordFeedBackController from "ui/screens/auth/forgot_password_feedback/ForgotPasswordfeedBackController";
import UniSelectionController from "ui/screens/uni_selection/UniSelectionController";
import { WelcomeRoutes } from "routes/WelcomeRoutes";
import PreSSOLoginController from "ui/screens/auth/pre_sso_login/PreSSOLoginConstroller";

type Props = {
  initialRouteName: "SignUp" | "Login" | "UniSelection";
};

export const AuthRoutes: FC<Props> = ({ initialRouteName }) => {
  return (
    <AuthStack.Navigator initialRouteName={initialRouteName}>
      <AuthStack.Screen
        name="UniSelection"
        component={UniSelectionController}
      />
      <AuthStack.Screen name="Login" component={LoginController} />
      <AuthStack.Screen
        name="Welcome"
        component={WelcomeRoutes}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen name="SignUp" component={SignUpController} />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordController}
      />
      <AuthStack.Screen
        name="ForgotPasswordFeedBack"
        component={ForgotPasswordFeedBackController}
      />
      <AuthStack.Screen
        name="SSO_Login"
        component={PreSSOLoginController}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};
