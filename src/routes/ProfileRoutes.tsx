import React, { FC } from "react";
import { ProfileStack } from "routes/ProfileStack";
import UpdateProfileController from "ui/screens/home/profile/update_profile/UpdateProfileController";
import UpdateQuestionnaireController from "ui/screens/home/profile/update_questionnaire/UpdateQuestionnaireController";
import ViewProfileController from "ui/screens/home/profile/view_profile/ViewProfileController";

export const ProfileRoutes: FC = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ViewProfile"
        component={ViewProfileController}
      />
      <ProfileStack.Screen
        name="UpdateProfile"
        component={UpdateProfileController}
      />
      <ProfileStack.Screen
        name="UpdateQuestionnaire"
        component={UpdateQuestionnaireController}
      />
    </ProfileStack.Navigator>
  );
};
