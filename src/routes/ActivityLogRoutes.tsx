import React from "react";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import { STRINGS } from "config";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { ActivityLogStack } from "routes/ActivityLogStack";
import ActivityLogController from "ui/screens/home/activity_log/ActivityLogController";

const ActivityLogRoutes = () => (
  <ActivityLogStack.Navigator
    initialRouteName={"ActivityLog"}
    screenOptions={{ headerTitleAlign: "center" }}>
    <ActivityLogStack.Screen
      name="ActivityLog"
      component={ActivityLogController}
      options={{
        headerLeft: () => <Hamburger />,
        headerTitle: () => (
          <HeaderTitle text={STRINGS.activity_log.title} />
        ),
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0
        }
      }}
    />
  </ActivityLogStack.Navigator>
);

export default ActivityLogRoutes;
