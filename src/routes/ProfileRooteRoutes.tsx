import { ProfileRootStack } from "routes/ProfileRootStack";
import React, { FC } from "react";
import RoommateAgreementController from "ui/screens/home/friends/RoommateAgreement/RoommateAgreementController";

type Props = {};

const ProfileRootRoutes: FC<Props> = () => {
  return (
    <ProfileRootStack.Navigator
      mode={"modal"}
      screenOptions={{ headerShown: false }}>
      <ProfileRootStack.Screen
        name={"RoommateAgreement"}
        component={RoommateAgreementController}
      />
    </ProfileRootStack.Navigator>
  );
};
export default ProfileRootRoutes;
