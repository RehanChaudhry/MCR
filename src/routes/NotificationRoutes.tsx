import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import NotificationController from "ui/screens/home/notification/NotificationController";
import { NotificationStack } from "routes/NotificationParams";
import ViewProfileController from "ui/screens/home/profile/view_profile/ViewProfileController";
import EScreen from "models/enums/EScreen";
import ConnectRequestsController from "ui/screens/home/friends/connect_requests/ConnectRequestsController";
import MyRoommatesController from "ui/screens/home/friends/MyRoommates/MyRoommatesController";
import RoommateAgreementController from "ui/screens/home/friends/RoommateAgreement/RoommateAgreementController";
import SinglePostController from "ui/screens/home/community/single_post/SinglePostController";
import CommunityController from "ui/screens/home/community/CommunityController";
import { CommunityStack } from "routes/CommunityStack";
import { CommentsController } from "ui/screens/home/comments/CommentsController";
import ReportContentController from "ui/screens/home/community/report_content/ReportContentController";

const Stack = createStackNavigator();

export const NotificationRoutes = () => {
  return (
    <Stack.Navigator>
      <NotificationStack.Screen
        name="Notification"
        component={NotificationController}
      />
      <NotificationStack.Screen
        name="ViewProfile"
        component={ViewProfileController}
        initialParams={{ isFrom: EScreen.HOME, updateProfile: false }}
        options={{ title: "View Profile" }}
      />
      <NotificationStack.Screen
        name="ConnectRequest"
        component={ConnectRequestsController}
      />
      <NotificationStack.Screen
        name="MyRoommates"
        initialParams={{ isFrom: EScreen.NOTIFICATION }}
        component={MyRoommatesController}
      />
      <NotificationStack.Screen
        name="RoommateAgreement"
        initialParams={{ isFrom: EScreen.NOTIFICATION }}
        component={RoommateAgreementController}
      />
      <NotificationStack.Screen
        name="SinglePost"
        component={SinglePostController}
      />
      <CommunityStack.Screen
        name="Community"
        component={CommunityController}
      />
      <CommunityStack.Screen
        name="Comments"
        component={CommentsController}
      />
      <CommunityStack.Screen
        name="ReportContent"
        component={ReportContentController}
      />
      <CommunityStack.Screen
        name="Profile"
        component={ViewProfileController}
        initialParams={{ isFrom: EScreen.NOTIFICATION }}
        options={{ title: "View Profile" }}
      />
    </Stack.Navigator>
  );
};
