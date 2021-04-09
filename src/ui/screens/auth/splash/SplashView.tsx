import { NavigationContainer } from "@react-navigation/native";
import { COLORS, Constants, SPACE } from "config";
import { AuthContext } from "hooks/useAuth";
import { SignInApiResponseModel } from "models/api_responses/SignInApiResponseModel";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Image,
  Linking,
  StyleSheet,
  View
} from "react-native";
import AuthStorage from "repo/auth/AuthStorage";
import { AuthRoutes, HomeRoutes } from "routes";
import { AppLog, shadowStyleProps } from "utils/Util";
import VersionCheck from "react-native-version-check";
import Screen from "ui/components/atoms/Screen";
import { usePreferredTheme } from "hooks";

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

  const theme = usePreferredTheme();

  if (!isReady) {
    return (
      <Screen
        style={styles.container}
        bottomSafeAreaColor={theme.themedColors.backgroundSecondary}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("assets/images/splash.gif")}
          />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.loaderContainer}>
            <ActivityIndicator color={COLORS.secondary} />
          </View>
        </View>
      </Screen>
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
  bottomContainer: {
    paddingBottom: SPACE.lg
  },
  container: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1
  },
  image: {
    width: 260,
    height: 87
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    width: 40,
    height: 40,
    borderRadius: 20,
    ...shadowStyleProps
  }
});
