import {
  Uni,
  UniSelectionResponseModel
} from "models/api_responses/UniSelectionResponseModel";
import React, { FC, useLayoutEffect, useState } from "react";
import { useApi } from "repo/Client";
import DataGenerator from "utils/DataGenerator";
import UniSelectionView from "./UniSelectionView";
import UniSelectionApis from "../../../repo/auth/UniSelectionApis";
import { AppLog } from "utils/Util";
import { usePreferredTheme, usePreventDoubleTap } from "hooks";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "routes";
import NoHeader from "ui/components/headers/NoHeader";

type Props = {};

type LoginNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Login"
>;

const UniSelectionController: FC<Props> = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const [unis, setUnis] = useState<Array<Uni>>(
    DataGenerator.getUnis().data
  );

  const unisApi = useApi<any, UniSelectionResponseModel>(
    UniSelectionApis.getUnis
  );

  const openLoginScreen = usePreventDoubleTap(() => {
    navigation.navigate("Login");
  });

  const openSSOScreen = usePreventDoubleTap(() => {
    navigation.navigate("SSO_Login");
  });

  const handleGetUnisApi = async (onComplete?: () => void) => {
    const { hasError, dataBody, errorBody } = await unisApi.request([]);
    if (hasError || dataBody === undefined) {
      AppLog.log("Unable to find unis " + errorBody);
      return;
    } else {
      setUnis(dataBody.data);
      onComplete?.();
    }
  };

  const theme = usePreferredTheme();

  const uniDidSelect = (item: Uni) => {
    AppLog.log("selected item: ", item);
    theme.saveCustomPalette(item.colorPalette);
    if (item.sso_login === true) {
      openSSOScreen();
    } else {
      openLoginScreen();
    }
  };

  // Add no toolbar
  useLayoutEffect(() => {
    navigation.setOptions(NoHeader.create());
  }, [navigation]);

  AppLog.log("handle getuni api: ", handleGetUnisApi);

  return (
    <UniSelectionView
      isError={unisApi.error}
      isLoading={unisApi.loading}
      unis={unis}
      didSelectItem={uniDidSelect}
    />
  );
};

export default UniSelectionController;
