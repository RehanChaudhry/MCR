import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth, usePreferredTheme, usePreventDoubleTap } from "hooks";
import { computeShades } from "hooks/theme/ColorPaletteContainer";
import {
  Uni,
  UniSelectionResponseModel
} from "models/api_responses/UniSelectionResponseModel";
import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { useApi } from "repo/Client";
import { AuthStackParamList } from "routes";
import NoHeader from "ui/components/headers/NoHeader";
import { AppLog } from "utils/Util";
import UniSelectionApis from "../../../repo/auth/UniSelectionApis";
import UniSelectionView from "./UniSelectionView";

type Props = {};

type LoginNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Login"
>;

const UniSelectionController: FC<Props> = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const [unis, setUnis] = useState<Array<Uni>>();
  let auth = useAuth();
  const unisApi = useApi<any, UniSelectionResponseModel>(
    UniSelectionApis.getUnis
  );

  const openLoginScreen = async () => {
    navigation.navigate("Login");
  };

  const openSSOScreen = async () => {
    navigation.navigate("SSO_Login");
  };

  const handleGetUnisApi = async (onComplete?: () => void) => {
    const { hasError, dataBody, errorBody } = await unisApi.request([]);
    if (hasError || dataBody === undefined) {
      AppLog.log(() => "Unable to find unis " + errorBody);
      return;
    } else {
      setUnis(dataBody.data);
      onComplete?.();
    }
  };

  const theme = usePreferredTheme();

  const uniDidSelect = usePreventDoubleTap((item: Uni) => {
    requestAnimationFrame(async () => {
      AppLog.log(() => "selected item: ", item);
      await theme.saveCustomPalette({
        interface: computeShades(item.interfaceColor),
        primaryShade: item.primaryColorLight,
        primary: item.primaryColorDark,
        secondaryShade: item.secondaryColorLight,
        secondary: item.secondaryColorDark
      });
      await auth.saveUni(item);
      if (item.ssoMethod === "off") {
        openLoginScreen();
      } else {
        openSSOScreen();
      }
    });
  });

  // Add no toolbar
  useLayoutEffect(() => {
    navigation.setOptions(NoHeader.create());
  }, [navigation]);

  useEffect(() => {
    handleGetUnisApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reloadCallback = async () => {
    handleGetUnisApi();
  };

  return (
    <UniSelectionView
      isError={unisApi.error}
      isLoading={unisApi.loading}
      unis={unis}
      didSelectItem={uniDidSelect}
      reload={reloadCallback}
    />
  );
};

export default UniSelectionController;
