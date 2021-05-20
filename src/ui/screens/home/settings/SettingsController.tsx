import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { usePreventDoubleTap } from "hooks";
import { UpdateAccountPasswordApiRequestModel } from "models/api_requests/UpdateAccountPasswordApiRequestModel";
import { UpdateAccountPasswordApiResponseModel } from "models/api_responses/UpdateAccountPasswordApiResponseModel";
import React, { FC, useLayoutEffect } from "react";
import { Alert } from "react-native";
import SimpleToast from "react-native-simple-toast";
import AuthApis from "repo/auth/AuthApis";
import { useApi } from "repo/Client";
import { HomeDrawerParamList } from "routes";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { AppLog } from "utils/Util";
import Hamburger from "../../../components/molecules/hamburger/Hamburger";
import SettingsView from "./SettingsView";

type Props = {};
type SettingNavigationProp = StackNavigationProp<
  HomeDrawerParamList,
  "Settings"
>;

const SettingsController: FC<Props> = () => {
  const navigation = useNavigation<SettingNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Hamburger />,
      headerTitleAlign: "center",
      headerTitle: () => <HeaderTitle text="Settings" />
    });
  });

  const updateAccountPasswordApi = useApi<
    UpdateAccountPasswordApiRequestModel,
    UpdateAccountPasswordApiResponseModel
  >(AuthApis.updateAccountPassword);

  const handleUpdateAccountPassword = usePreventDoubleTap(
    async (apiRequestModel: UpdateAccountPasswordApiRequestModel) => {
      AppLog.log("handleUpdateAccountPassword: ");

      // authenticate user
      const {
        hasError,
        errorBody,
        dataBody
      } = await updateAccountPasswordApi.request([apiRequestModel]);

      if (hasError || dataBody === undefined) {
        Alert.alert("Unable to Update account password", errorBody);
        return;
      } else {
        SimpleToast.show(dataBody.message);
      }
    }
  );

  return (
    <SettingsView
      shouldShowProgressBar={updateAccountPasswordApi.loading}
      onUpdateAccountSettings={(_requestModel) => {
        handleUpdateAccountPassword(_requestModel);
      }}
    />
  );
};

export default SettingsController;
