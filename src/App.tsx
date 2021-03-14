import { NavigationContainer } from "@react-navigation/native";
import {
  AppThemeProvider,
  AppColorScheme
} from "hooks/theme/usePreferredTheme";
import React from "react";
import "react-native-gesture-handler";
import { DemoRoutes } from "routes";
import { AppLog } from "utils/Util";

type Props = {};

const App: React.FC<Props> = () => {
  AppLog.log("Rendering App...");

  // return <SplashView /
  return (
    <AppThemeProvider colorScheme={AppColorScheme.SYSTEM}>
      <NavigationContainer>
        <DemoRoutes />
      </NavigationContainer>
    </AppThemeProvider>
  );
};
export default App;
