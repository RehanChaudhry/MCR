import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { FC, useLayoutEffect } from "react";
import { AuthStackParamList } from "routes";
import NoHeader from "ui/components/headers/NoHeader";
import { PreSSOLoginView } from "ui/screens/auth/pre_sso_login/PreSSOLoginView";
import { usePreventDoubleTap } from "hooks";
import UniSelectionApis from "repo/auth/UniSelectionApis";
import { useApi } from "repo/Client";
import { AppLog } from "utils/Util";
import SimpleToast from "react-native-simple-toast";

type Props = {};

export type PreSSOScreenAuthStackScreenProps = StackScreenProps<
  AuthStackParamList,
  "SSO_Login"
>;

const PreSSOLoginController: FC<Props> = () => {
  const navigation = useNavigation<
    PreSSOScreenAuthStackScreenProps["navigation"]
  >();

  const goBack = usePreventDoubleTap(() => {
    navigation.goBack();
  });

  const getSSOUrl = useApi<any, Object>(UniSelectionApis.getSSOUrl);

  const handleGetSSOUrlApi = async () => {
    const { hasError, dataBody, errorBody } = await getSSOUrl.request([]);
    if (hasError || dataBody === undefined) {
      AppLog.log(() => "Unable to find unis " + errorBody);
      return;
    } else {
      if (dataBody?.data?.loginURL !== undefined) {
        navigation.navigate("SSO_Login_View", {
          url: dataBody?.data!.loginURL
        });
      } else {
        SimpleToast.show("SSO url not found.");
      }
    }
  };

  const openSSOLoginScreen = usePreventDoubleTap(() => {
    handleGetSSOUrlApi().then().catch();
  });

  const openLoginScreen = usePreventDoubleTap(() => {
    navigation.navigate("Login");
  });

  // Add no toolbar
  useLayoutEffect(() => {
    navigation.setOptions(NoHeader.create());
  }, [navigation]);

  return (
    <PreSSOLoginView
      goBack={goBack}
      openLoginScreen={openLoginScreen}
      openSSOLoginScreen={openSSOLoginScreen}
    />
  );
};

export default PreSSOLoginController;
