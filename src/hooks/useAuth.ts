import { Profile } from "models/api_responses/FetchMyProfileResponseModel";
import { Authentication } from "models/api_responses/SignInApiResponseModel";
import { Uni } from "models/api_responses/UniSelectionResponseModel";
import { UserModel } from "models/api_responses/UserModel";
import React, { useContext } from "react";
import AuthStorage from "repo/auth/AuthStorage";
import { resetApiClient } from "repo/Client";
import { PushNotification } from "utils/PushNotification";

type AuthProviderModel = {
  user?: UserModel;
  setUser: (user: UserModel | undefined) => void;
  uni?: Uni;
  setUni: (uni: Uni | undefined) => void;
};

export const AuthContext = React.createContext<AuthProviderModel>({
  setUser: () => {},
  setUni: () => {}
});

export default () => {
  const { user, setUser, uni, setUni } = useContext<AuthProviderModel>(
    AuthContext
  );

  const saveUni = async (model: Uni) => {
    await AuthStorage.storeUni(model);
    setUni(model);
    return model;
  };

  const saveUser = async (model: UserModel) => {
    await AuthStorage.storeUser(model);
    const token = model?.authentication?.accessToken;
    await resetApiClient(token);
    // update AuthProvider after everything has been done
    setUser(model);

    PushNotification.init(model.profile?.id);

    return model;
  };

  const saveToken = async (
    model: Authentication,
    userToBeUpdated?: UserModel
  ) => {
    let _user: UserModel = {
      ...userToBeUpdated,
      authentication: model
    };
    await AuthStorage.storeUser(_user);
    const token = _user?.authentication?.accessToken;
    await resetApiClient(token);
    // update AuthProvider after everything has been done
    setUser(_user);
    return _user;
  };

  const saveProfile = async (
    profile: Profile,
    userToBeUpdated: UserModel
  ) => {
    let _user: UserModel = {
      ...userToBeUpdated,
      profile: profile
    };
    await AuthStorage.storeUser(_user);
    // update AuthProvider after everything has been done
    setUser(_user);
    return _user;
  };

  const logOut = () => {
    setUser(undefined);
    AuthStorage.removeUser(() => resetApiClient());
  };

  return { user, uni, saveUser, saveUni, saveToken, saveProfile, logOut };
};
