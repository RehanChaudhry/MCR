import { SignInApiResponseModel } from "models/api_responses/SignInApiResponseModel";
import React, { useContext } from "react";
import AuthStorage from "repo/auth/AuthStorage";
import { resetApiClient } from "repo/Client";
import { AppLog } from "utils/Util";

type AuthProviderModel = {
  user?: SignInApiResponseModel;
  setUser: (user: SignInApiResponseModel | undefined) => void;
};

export const AuthContext = React.createContext<AuthProviderModel>({
  setUser: () => {}
});

export default () => {
  const { user, setUser } = useContext<AuthProviderModel>(AuthContext);

  const logIn = async (model: SignInApiResponseModel) => {
    await AuthStorage.storeUser(model);

    const token = model.data.accessToken;
    AppLog.log("Resetting Authorization Token: " + token);
    resetApiClient(token);

    // update AuthProvider after everything has been done
    setUser(model);
  };

  const logOut = () => {
    setUser(undefined);
    AuthStorage.removeUser(() => resetApiClient());
  };

  return { user, logIn, logOut };
};
