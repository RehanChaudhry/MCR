import React, { FC } from "react";
import LoginController from "ui/screens/auth/login/LoginController";
import SignUpController from "ui/screens/auth/sign_up/SignUpController";
import { AuthStack } from "./AuthStack";

type Props = {
  initialRouteName: "SignUp" | "Login";
};

export const AuthRoutes: FC<Props> = ({ initialRouteName }) => {
  return (
    <AuthStack.Navigator initialRouteName={initialRouteName}>
      <AuthStack.Screen name="Login" component={LoginController} />
      <AuthStack.Screen name="SignUp" component={SignUpController} />
    </AuthStack.Navigator>
  );
};
