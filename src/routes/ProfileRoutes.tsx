import React, { Dispatch, FC, SetStateAction, useState } from "react";
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
import EScreen from "models/enums/EScreen";
import { AddInterestsController } from "ui/screens/home/profile/update_profile/add_interests/AddInterestsController";

type notifyData = {
  timeStamp?: number;
  setTimeStamp: Dispatch<SetStateAction<number | undefined>>;
};
// @ts-ignore
export const NotifyContext = React.createContext<notifyData>({});

export const ProfileRoutes = () => {
  const [timeStamp, setTimeStamp] = useState<number>();
  return (
    <NotifyContext.Provider
      value={{
        timeStamp: timeStamp,
        setTimeStamp: setTimeStamp
      }}>
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
    </NotifyContext.Provider>
  );
};

type ViewProfileRoutesProps = {};
const ViewProfileRoutes: FC<ViewProfileRoutesProps> = () => {
  return (
    <ViewProfileStack.Navigator>
      <ViewProfileStack.Screen
        name="ViewProfile"
        component={ViewProfileController}
        initialParams={{ isFrom: EScreen.HOME, updateProfile: false }}
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
        initialParams={{
          isFrom: EScreen.HOME,
          updateProfile: true
        }}
        component={UpdateProfileController}
        options={{ title: "Update Profile" }}
      />
      <UpdateProfileStack.Screen
        name="AddInterests"
        component={AddInterestsController}
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
        initialParams={{ isFrom: EScreen.MY_PROFILE }}
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
