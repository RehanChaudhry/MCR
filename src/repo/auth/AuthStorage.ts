import { SignInApiResponseModel } from "models/api_responses/SignInApiResponseModel";
import { AppLog } from "utils/Util";
import * as Keychain from "react-native-keychain";

const key = "user_data";

const storeUser = async (user: SignInApiResponseModel) => {
  try {
    await Keychain.setGenericPassword(key, JSON.stringify(user));
  } catch (error) {
    AppLog.log("Error storing the user", error);
  }
};

const getUser = async () => {
  try {
    const userAsString = await Keychain.getGenericPassword();
    if (typeof userAsString !== "boolean") {
      return JSON.parse(userAsString.password) as SignInApiResponseModel;
    }
  } catch (error) {
    AppLog.warn("Error getting the user", error);
  }
};

const getUserToken = async () => {
  try {
    const user = await getUser();
    const userToken = user?.data?.accessToken;
    if (userToken === undefined) {
      throw Error("Unable to fetch user token from AsyncStorage");
    }
    return userToken;
  } catch (error) {
    AppLog.log("Error getting the user: ", error);
  }
};

const removeUser = async (callback?: () => void) => {
  try {
    await Keychain.resetGenericPassword();
    callback?.();
  } catch (error) {
    AppLog.warn("Error removing the user", error);
  }
};

export default { storeUser, getUser, removeUser, getUserToken };
