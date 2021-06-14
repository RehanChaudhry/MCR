import AsyncStorage from "@react-native-async-storage/async-storage";
import { Uni } from "models/api_responses/UniSelectionResponseModel";
import { UserModel } from "models/api_responses/UserModel";
import { AppLog } from "utils/Util";
import * as Keychain from "react-native-keychain";

const key = "user_data";
const uniKey = "uni_data";

const storeUni = async (uni: Uni) => {
  try {
    await AsyncStorage.setItem(uniKey, JSON.stringify(uni));
  } catch (error) {
    AppLog.logForComplexMessages(() => "Error storing the uni", error);
  }
};

const getUni = async () => {
  try {
    const uniAsString = await AsyncStorage.getItem(uniKey);
    if (uniAsString) {
      return JSON.parse(uniAsString) as Uni;
    }
  } catch (error) {
    AppLog.warn("Error getting the uni", error);
  }
};

const storeUser = async (user: UserModel) => {
  try {
    await Keychain.setGenericPassword(key, JSON.stringify(user));
  } catch (error) {
    AppLog.logForComplexMessages(() => "Error storing the user", error);
  }
};

const getUser = async () => {
  try {
    const userAsString = await Keychain.getGenericPassword();
    if (typeof userAsString !== "boolean") {
      return JSON.parse(userAsString.password) as UserModel;
    }
  } catch (error) {
    AppLog.warn("Error getting the user", error);
  }
};

const getUserToken = async () => {
  try {
    const user = await getUser();
    const accessToken = user?.authentication?.accessToken;
    const refreshToken = user?.authentication?.refreshToken;
    const expiresIn = user?.authentication?.expiresIn;
    if (!accessToken || !refreshToken || !expiresIn) {
      throw Error("Unable to fetch user token from AsyncStorage");
    }
    return { accessToken, refreshToken, expiresIn };
  } catch (error) {
    AppLog.logForComplexMessages(() => "Error getting the user: ", error);
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

export default {
  storeUser,
  getUser,
  removeUser,
  getUserToken,
  storeUni,
  getUni
};
