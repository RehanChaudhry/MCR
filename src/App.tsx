// prettier-ignore
import "react-native-gesture-handler";
import { AppColorScheme, AppThemeProvider } from "hooks/theme";
import React from "react";
import { SplashView } from "ui/screens/auth/splash/SplashView";
import { AppLog } from "utils/Util";

type Props = {};

const App: React.FC<Props> = () => {
  AppLog.log("Rendering App...");

  return (
    <AppThemeProvider colorScheme={AppColorScheme.SYSTEM}>
      <SplashView />
    </AppThemeProvider>
  );
};
export default App;
