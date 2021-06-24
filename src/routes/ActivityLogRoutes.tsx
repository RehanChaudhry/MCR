import React from "react";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import { STRINGS } from "config";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { ActivityLogStack } from "routes/ActivityLogStack";
import ActivityLogController from "ui/screens/home/activity_log/ActivityLogController";
import ViewProfileController from "ui/screens/home/profile/view_profile/ViewProfileController";
import SinglePostController from "ui/screens/home/community/single_post/SinglePostController";
import { NotificationStack } from "routes/NotificationParams";

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
    <ActivityLogStack.Screen
      name="Profile"
      component={ViewProfileController}
    />
    <NotificationStack.Screen
      name="SinglePost"
      component={SinglePostController}
    />
  </ActivityLogStack.Navigator>
);

export default ActivityLogRoutes;
