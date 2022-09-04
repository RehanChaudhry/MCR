import { useNavigation, useRoute } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { FC, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import WebView, { WebViewNavigation } from "react-native-webview";
import { AuthStackParamList } from "routes";
import { AppLog } from "utils/Util";
import { useAuth, usePreferredTheme, usePreventDoubleTap } from "hooks";
import NoHeader from "ui/components/headers/NoHeader";
import Screen from "ui/components/atoms/Screen";
import CookieManager from "@react-native-cookies/cookies";
import { FetchMyProfileResponseModel } from "models/api_responses/FetchMyProfileResponseModel";
import AuthApis from "repo/auth/AuthApis";
import { useApi } from "repo/Client";
import { Authentication } from "models/api_responses/SignInApiResponseModel";
import { ActivityIndicator } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";

export type LoginScreenAuthStackScreenProps = StackScreenProps<
  AuthStackParamList,
  "Login"
>;

type Props = {};

const SSOLoginView: FC<Props> = () => {
  const { params }: any = useRoute<any>();
  const [shouldShowWebview, setShouldShowWebView] = useState<boolean>(
    true
  );
  const [shouldShowErrorView, setShouldShowErrorView] = useState<boolean>(
    false
  );

  const auth = useAuth();
  const { themedColors } = usePreferredTheme();
  const navigation = useNavigation<
    LoginScreenAuthStackScreenProps["navigation"]
  >();

  // Add no toolbar
  useLayoutEffect(() => {
    navigation.setOptions(NoHeader.create());
  }, [navigation]);

  AppLog.logForcefully(() => "url to load on web view : " + params.url);

  const fetchProfileApi = useApi<string, FetchMyProfileResponseModel>(
    AuthApis.fetchMyProfile
  );

  const fetchUserProfile = usePreventDoubleTap(
    async (authentication: Authentication) => {
      // fetch user profile dataP
      const { hasError: hasErrorProfile } = await fetchProfileApi.request([
        authentication?.accessToken ?? ""
      ]);

      if (hasErrorProfile) {
        Alert.alert(
          "Unable to Sign In",
          "Couldn't fetch user information.\n" + fetchProfileApi.error
        );
      } else {
        if (fetchProfileApi.data?.data.roleTitle !== "Admin") {
          await auth.saveUser({
            authentication: authentication,
            profile: fetchProfileApi.data?.data
          });
        } else {
          setShouldShowWebView(false);
          setShouldShowErrorView(true);
        }
      }
    }
  );

  const onNavigationStateChange = (navigationState: WebViewNavigation) => {
    AppLog.logForcefully(
      () => "navigationState " + JSON.stringify(navigationState)
    );

    // Get cookies for a url
    CookieManager.get(navigationState.url, true).then((cookies) => {
      if (cookies["auth.token.local"]) {
        const accessToken = cookies["auth.token.local"].value;
        const refreshToken = cookies["auth.refresh_token.local"].value;
        const expiresIn = cookies["auth.token_expiration.local"].value;

        AppLog.logForcefully(
          () => "fetching user profile :  " + JSON.stringify(cookies)
        );

        fetchUserProfile({
          accessToken: accessToken.replace("Bearer%20", ""),
          refreshToken: refreshToken,
          expiresIn: expiresIn
        });

        setShouldShowWebView(false);

        CookieManager.clearAll(true);
      }
    });
  };

  return (
    <Screen
      style={[
        styles.container,
        { backgroundColor: themedColors.backgroundSecondary }
      ]}
      topSafeAreaAndStatusBarColor={themedColors.backgroundSecondary}>
      <View style={styles.mainContainer}>
        {shouldShowWebview && (
          <WebView
            source={{ uri: params.url }}
            startInLoadingState
            javaScriptEnabledAndroid={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            scrollEnabled={false}
            onNavigationStateChange={onNavigationStateChange}
            sharedCookiesEnabled={true}
          />
        )}

        {fetchProfileApi.loading && (
          <View style={styles.loadMore}>
            <ActivityIndicator
              size="large"
              color={themedColors.primary}
              style={[
                styles.initialPb,
                { backgroundColor: themedColors.backgroundSecondary }
              ]}
            />
          </View>
        )}

        {shouldShowErrorView && (
          <View style={styles.loadMore}>
            <AppLabel text="You don't have right permissions to view this page." />
          </View>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  mainContainer: {
    flex: 1
  },
  loadMore: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute"
  },
  initialPb: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default SSOLoginView;
