import { NavigationContainer } from "@react-navigation/native";
import { COLORS, Constants } from "config";
import { AuthContext } from "hooks/useAuth";
import { SignInApiResponseModel } from "models/api_responses/SignInApiResponseModel";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Linking,
  StyleSheet,
  View
} from "react-native";
import AuthStorage from "repo/auth/AuthStorage";
import { AuthRoutes, HomeRoutes } from "routes";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { AppLog } from "utils/Util";
import VersionCheck from "react-native-version-check";

interface Props {}

export const SplashView = React.memo<Props>(() => {
  AppLog.log("Rendering SplashView...");
  const [user, setUser] = useState<SignInApiResponseModel>();
  const [isReady, setIsReady] = useState(false);
  //const initialRouteNameRef = useRef<"SignUp" | "Login">("Login");

  const restoreUser = async () => {
    const _user = await AuthStorage.getUser();
    if (_user) {
      setUser(_user);
    }
  };

  async function versionCheckLibraryImpl(): Promise<{
    isNeeded: boolean;
    storeUrl: string;
  }> {
    let versionCheckNeedUpdate;
    const noStoreUrlFound = {
      isNeeded: false,
      storeUrl: "N/A"
    };
    try {
      versionCheckNeedUpdate =
        (await VersionCheck.needUpdate()) ?? noStoreUrlFound;
    } catch (e) {
      // in case of no store url found
      AppLog.logForcefully("Exception occurred.. No store url found..");
      versionCheckNeedUpdate = noStoreUrlFound;
    }

    AppLog.logForcefully(
      "versionCheckNeedUpdate: " + JSON.stringify(versionCheckNeedUpdate)
    );
    return versionCheckNeedUpdate;
  }

  async function checkForForcedUpdate() {
    const versionCheckNeedUpdate = await versionCheckLibraryImpl();
    return versionCheckNeedUpdate;
  }

  function showForcedUpdateDialog(storeUrl: string) {
    Alert.alert(
      "Update available",
      "It looks like you are using an older version of our app. Please update to continue.",
      [
        {
          text: "Update",
          onPress: () => {
            BackHandler.exitApp();
            Linking.openURL(storeUrl);
          }
        }
      ]
    );
  }

  async function initializeApp() {
    let { isNeeded, storeUrl } = await checkForForcedUpdate();
    if (isNeeded && Constants.SHOULD_ENABLE_FORCE_UPDATE) {
      showForcedUpdateDialog(storeUrl);
    } else {
      if (!isReady) {
        setTimeout(() => {
          restoreUser().then(() => {
            AppLog.logForcefully("Logging in...");
            setIsReady(true);
          });
        }, 2000);
      }
    }
  }

  useEffect(() => {
    initializeApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isReady) {
    return (
      <View style={styles.container}>
        <View style={styles.logoSpacer} />
        <AppLabel style={styles.logoImage} text="Splash Screen" />
        <View style={styles.loaderSpacer} />
        <ActivityIndicator
          style={styles.loader}
          color={COLORS.secondary}
        />
        <View style={styles.loaderSpacer} />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {/*<HomeRoutes />*/}
        {AppLog.log("User exists: " + (user !== undefined))}
        {user !== undefined ? (
          <HomeRoutes />
        ) : (
          <AuthRoutes initialRouteName={"UniSelection"} />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    flex: 1
  },

  loader: {},

  logoImage: {
    alignSelf: "center",
    marginTop: 20
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10
  },
  bottomLogo: {
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    width: 200
  },
  logoSpacer: {
    flex: 3
  },
  loaderSpacer: {
    flex: 1
  }
});
