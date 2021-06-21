// prettier-ignore
import "react-native-gesture-handler";
import { AppColorScheme, AppThemeProvider } from "hooks/theme";
import React from "react";
import { SplashView } from "ui/screens/auth/splash/SplashView";
import { AppLog } from "utils/Util";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PushNotification } from "utils/PushNotification";

type Props = {};

const App: React.FC<Props> = () => {
  AppLog.log(() => "Rendering App...");

  PushNotification.init();
  return (
    <AppThemeProvider colorScheme={AppColorScheme.SYSTEM}>
      <SafeAreaProvider>
        <SplashView />
      </SafeAreaProvider>
    </AppThemeProvider>
  );
};
export default App;
