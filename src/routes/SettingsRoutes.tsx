import React from "react";
import { SettingsStack } from "./SettingsStack";
import SettingsController from "../ui/screens/home/settings/SettingsController";

const SettingsRoutes = () => {
  return (
    <SettingsStack.Navigator initialRouteName={"Settings"}>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsController}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsRoutes;
