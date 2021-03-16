import React from "react";
import { ProfileBottomBar } from "routes/ProfileBottomBar";
import UpdateProfileController from "ui/screens/home/profile/update_profile/UpdateProfileController";
import UpdateQuestionnaireController from "ui/screens/home/profile/update_questionnaire/UpdateQuestionnaireController";
import ViewProfileController from "ui/screens/home/profile/view_profile/ViewProfileController";

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
        component={UpdateQuestionnaireController}
      />
    </ProfileBottomBar.Navigator>
  );
};
