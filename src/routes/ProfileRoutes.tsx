import React from "react";
import { ProfileBottomBar } from "routes/ProfileBottomBar";
import UpdateProfileController from "ui/screens/home/profile/update_profile/UpdateProfileController";
import ViewProfileController from "ui/screens/home/profile/view_profile/ViewProfileController";
import QuestionsController from "ui/screens/questions/QuestionsController";

export const ProfileRoutes = () => {
  return (
    <ProfileBottomBar.Navigator tabBar={() => null}>
      <ProfileBottomBar.Screen
        name="ViewProfile"
        component={ViewProfileController}
      />
      <ProfileBottomBar.Screen
        name="UpdateProfile"
        component={UpdateProfileController}
      />
      <ProfileBottomBar.Screen
        name="UpdateQuestionnaire"
        component={QuestionsController}
        initialParams={{ isUpdating: true }}
      />
    </ProfileBottomBar.Navigator>
  );
};
