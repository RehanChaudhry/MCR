import { NavigationContainer } from "@react-navigation/native";
import { COLORS, Constants, SPACE } from "config";
import { AuthContext } from "hooks/useAuth";
import {
  EWelcomeFlowStatus,
  FetchMyProfileResponseModel
} from "models/api_responses/FetchMyProfileResponseModel";
import { Uni } from "models/api_responses/UniSelectionResponseModel";
import { UserModel } from "models/api_responses/UserModel";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Linking,
  StyleSheet,
  View
} from "react-native";
import AuthApis from "repo/auth/AuthApis";
import AuthStorage from "repo/auth/AuthStorage";
import { useApi } from "repo/Client";
import { AuthRoutes, HomeRoutes } from "routes";
import { WelcomeRoutes, WelcomeScreens } from "routes/WelcomeRoutes";
import { AppLog, shadowStyleProps } from "utils/Util";
import VersionCheck from "react-native-version-check";
import Screen from "ui/components/atoms/Screen";
import { useAuth, usePreferredTheme } from "hooks";
import Logo from "assets/images/mcr_logo.svg";
import { FetchUniDetailsResponseModel } from "models/api_responses/FetchUniDetailsResponseModel";
import UniSelectionApis from "repo/auth/UniSelectionApis";
import FetchUniDetailsRequestModel from "models/api_requests/FetchUniDetailsRequestModel";
import { computeShades } from "hooks/theme/ColorPaletteContainer";

interface Props {}

function isLoggedIn(_user?: UserModel) {
  return (
    _user?.authentication !== undefined && _user.profile !== undefined
  );
}

type HasCompletedWelcomeJourneyReturnType =
  | {
      isWelcomeJourneyCompleted: false;
      welcomeScreen?: WelcomeScreens;
    }
  | {
      isWelcomeJourneyCompleted: true;
      welcomeScreen?: null;
    };

function hasCompletedWelcomeJourney(
  _user?: UserModel
): HasCompletedWelcomeJourneyReturnType {
  if (_user?.profile) {
    const userProfile = _user?.profile;
    return userProfile.welcomeVideoStatus === EWelcomeFlowStatus.PENDING
      ? {
          isWelcomeJourneyCompleted: false,
          welcomeScreen: "Welcome"
        }
      : userProfile.profileCompletedAt === null
      ? {
          isWelcomeJourneyCompleted: false,
          welcomeScreen: "UpdateProfile"
        }
      : userProfile.questionnaireStatus === EWelcomeFlowStatus.PENDING
      ? {
          isWelcomeJourneyCompleted: false,
          welcomeScreen: "Questionnaire"
        }
      : {
          isWelcomeJourneyCompleted: true,
          welcomeScreen: null
        };
  } else {
    return {
      isWelcomeJourneyCompleted: false,
      welcomeScreen: "Welcome"
    };
  }
}

async function versionCheckLibraryImpl() {
  let versionCheckNeedUpdate: {
    isNeeded: boolean;
    storeUrl: string;
  };
  const noStoreUrlFound = {
    isNeeded: false,
    storeUrl: "N/A"
  };
  try {
    versionCheckNeedUpdate =
      (await VersionCheck.needUpdate()) ?? noStoreUrlFound;
  } catch (e) {
    // in case of no store url found
    AppLog.logForcefully(
      () => "Exception occurred.. No store url found.."
    );
    versionCheckNeedUpdate = noStoreUrlFound;
  }

  AppLog.logForcefully(
    () =>
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

export const SplashView = React.memo<Props>(() => {
  AppLog.log(() => "Rendering SplashView...");
  const [user, setUser] = useState<UserModel>();
  const [uni, setUni] = useState<Uni>();
  const [isReady, setIsReady] = useState(false);
  //const initialRouteNameRef = useRef<"SignUp" | "Login">("Login");

  const fetchProfileApi = useApi<string, FetchMyProfileResponseModel>(
    AuthApis.fetchMyProfile
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchUniDetails = useApi<
    FetchUniDetailsRequestModel,
    FetchUniDetailsResponseModel
  >(UniSelectionApis.getUniDetails);

  const auth = useAuth();

  const restoreUserIfExists = async () => {
    const _user = await AuthStorage.getUser();
    // fetch profile data
    if (_user?.authentication?.accessToken) {
      await fetchUserProfile(_user);
    } else if (_user?.profile) {
      // remove profile data if no access token exists
      AppLog.logForcefully(
        () =>
          "Got NULL token with a user's profile upon user restoration.."
      );
      auth.logOut();
      return;
    }
  };

  async function restoreUni() {
    const _uni = await AuthStorage.getUni();
    const { hasError, dataBody } = await fetchUniDetails.request([
      { name: _uni?.subdomain ?? "" }
    ]);
    const updatedUni = dataBody?.data;

    if (!hasError && updatedUni) {
      await theme.saveCustomPalette({
        interface: computeShades(updatedUni.interfaceColor),
        primaryShade: updatedUni.primaryColorLight,
        primary: updatedUni.primaryColorDark,
        secondaryShade: updatedUni.secondaryColorLight,
        secondary: updatedUni.secondaryColorDark
      });
      await auth.saveUni(updatedUni);
      setUni(updatedUni);
    } else {
      setUni(_uni);
    }
  }

  async function fetchUserProfile(_user: UserModel) {
    AppLog.logForcefully(() => "Fetching user profile...");
    const {
      hasError,
      errorBody,
      dataBody
    } = await fetchProfileApi.request([]);

    if (!hasError && dataBody) {
      let updatedUser = await auth.saveProfile(dataBody.data, _user);
      await restoreUni();
      setUser(updatedUser);
    } else {
      AppLog.logForcefully(
        () =>
          "Error fetching updated profile: " + JSON.stringify(errorBody)
      );

      // let the user continue if we have a previously fetched profile
      if (_user?.profile) {
        await restoreUni();
        setUser(_user);
      } else {
        auth.logOut();
      }
    }
  }

  async function initializeApp() {
    let { isNeeded, storeUrl } = await checkForForcedUpdate();
    if (isNeeded && Constants.SHOULD_ENABLE_FORCE_UPDATE) {
      showForcedUpdateDialog(storeUrl);
    } else {
      if (!isReady) {
        setTimeout(() => {
          restoreUserIfExists().then(() => {
            AppLog.logForcefully(() => "Get set go...");
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
          <Logo width={260} height={87} />
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
    <AuthContext.Provider value={{ user, setUser, uni, setUni }}>
      <NavigationContainer>
        {AppLog.log(() => "User exists: " + (user !== undefined))}
        {AppLog.log(() => "User is logged in: " + isLoggedIn(user))}
        {AppLog.log(
          () =>
            "User has completed welcome journey: " +
            JSON.stringify(hasCompletedWelcomeJourney(user))
        )}

        {isLoggedIn(user) ? (
          hasCompletedWelcomeJourney(user).isWelcomeJourneyCompleted ? (
            <HomeRoutes />
          ) : (
            <WelcomeRoutes
              initialRouteName={
                hasCompletedWelcomeJourney(user).welcomeScreen!
              }
            />
          )
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
