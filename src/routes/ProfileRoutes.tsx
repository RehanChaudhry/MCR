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
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { STRINGS } from "config";

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
        initialParams={{ isUpdating: true }}
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
    <UpdateQuestionnaireStack.Navigator
      screenOptions={{ headerTitleAlign: "center" }}>
      <UpdateQuestionnaireStack.Screen
        name="UpdateQuestionnaire"
        component={QuestionsController}
        initialParams={{ isUpdating: true }}
        options={{
          headerLeft: () => <Hamburger />,
          headerTitle: () => (
            <HeaderTitle text={STRINGS.questionnaire.title_update} />
          )
        }}
      />
    </UpdateQuestionnaireStack.Navigator>
  );
};
