// prettier-ignore
import "react-native-gesture-handler";
import { AppColorScheme, AppThemeProvider } from "hooks/theme";
import React from "react";
//import { SplashView } from "ui/screens/auth/splash/SplashView";
import { AppLog } from "utils/Util";
import { UpdateProfileController } from "./ui/screens/profile/update_profile/UpdateProfileController";

type Props = {};

const App: React.FC<Props> = () => {
  AppLog.log("Rendering App...");

  return (
    <AppThemeProvider colorScheme={AppColorScheme.SYSTEM}>
      <UpdateProfileController />
    </AppThemeProvider>
  );
};
export default App;
