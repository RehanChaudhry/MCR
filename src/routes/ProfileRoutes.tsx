import React, { FC } from "react";
import { ProfileBottomBar } from "routes/ProfileBottomBar";
import UpdateProfileController from "ui/screens/home/profile/update_profile/UpdateProfileController";
import ViewProfileController from "ui/screens/home/profile/view_profile/ViewProfileController";
import {
  UpdateProfileStack,
  UpdateQuestionnaireStack,
  ViewProfileStack
} from "./ProfileStack";
import QuestionsController from "../ui/screens/questions/QuestionsController";

export const ProfileRoutes = () => {
  return (
    <ProfileBottomBar.Navigator tabBar={() => null}>
      <ProfileBottomBar.Screen
        name="ViewProfile"
        component={ViewProfileRoutes}
      />
      <ProfileBottomBar.Screen
        name="UpdateProfile"
        component={UpdateProfileRoutes}
      />
      <ProfileBottomBar.Screen
        name="UpdateQuestionnaire"
        component={UpdateQuestionnaireRoutes}
        initialParams={{ isUpdating: true }}
      />
    </ProfileBottomBar.Navigator>
  );
};

type ViewProfileRoutesProps = {};
const ViewProfileRoutes: FC<ViewProfileRoutesProps> = () => {
  return (
    <ViewProfileStack.Navigator>
      <ViewProfileStack.Screen
        name="ViewProfile"
        component={ViewProfileController}
        options={{ title: "View Profile" }}
      />
    </ViewProfileStack.Navigator>
  );
};

type UpdateProfileRoutesProps = {};
const UpdateProfileRoutes: FC<UpdateProfileRoutesProps> = () => {
  return (
    <UpdateProfileStack.Navigator>
      <UpdateProfileStack.Screen
        name="UpdateProfile"
        component={UpdateProfileController}
        options={{ title: "Update Profile" }}
      />
    </UpdateProfileStack.Navigator>
  );
};

type UpdateQuestionnaireRoutesProps = {};
const UpdateQuestionnaireRoutes: FC<UpdateQuestionnaireRoutesProps> = () => {
  return (
    <UpdateQuestionnaireStack.Navigator>
      <UpdateQuestionnaireStack.Screen
        name="UpdateQuestionnaire"
        component={QuestionsController}
        initialParams={{ isUpdating: false }}
        options={{ title: "Update Questionnaire" }}
      />
    </UpdateQuestionnaireStack.Navigator>
  );
};
