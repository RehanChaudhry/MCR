import { ProfileRootStack } from "routes/ProfileRootStack";
import React, { FC } from "react";
import RoommateAgreementController from "ui/screens/home/friends/RoommateAgreement/RoommateAgreementController";
import ProfileController from "ui/screens/home/profile/ProfileController";
import AgreementDetailsController from "ui/screens/home/friends/agreement_details/AgreementDetailsController";
import StaticContentController from "ui/screens/static_content/StaticContentController";

type Props = {};

const ProfileRootRoutes: FC<Props> = () => {
  return (
    <ProfileRootStack.Navigator
      mode={"modal"}
      screenOptions={{ headerTitleAlign: "center" }}>
      <ProfileRootStack.Screen
        name={"Profile"}
        component={ProfileController}
        options={{ headerShown: false }}
      />
      <ProfileRootStack.Screen
        name={"RoommateAgreement"}
        component={RoommateAgreementController}
      />
      <ProfileRootStack.Screen
        name={"AgreementDetails"}
        component={AgreementDetailsController}
      />
      <ProfileRootStack.Screen
        name="StaticContent"
        component={StaticContentController}
      />
    </ProfileRootStack.Navigator>
  );
};
export default ProfileRootRoutes;
