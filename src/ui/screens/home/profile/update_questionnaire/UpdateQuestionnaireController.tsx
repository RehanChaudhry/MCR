import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth, usePreventDoubleTap } from "hooks";
import React, { FC, useLayoutEffect } from "react";
import { ProfileStackParamList } from "routes/ProfileStack";
import NoHeader from "ui/components/headers/NoHeader";
import { UpdateQuestionnaireView } from "ui/screens/home/profile/update_questionnaire/UpdateQuestionnaireView";

type ProfileNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "UpdateQuestionnaire"
>;

type Props = {};

const UpdateQuestionnaireController: FC<Props> = () => {
  const auth = useAuth();

  const navigation = useNavigation<ProfileNavigationProp>();

  // Add no toolbar
  useLayoutEffect(() => {
    navigation.setOptions(NoHeader.create());
  }, [navigation]);

  const logout = usePreventDoubleTap(() => {
    auth.logOut();
  });

  const userProfile = auth.user?.data?.profile!;
  if (userProfile === undefined) {
    return null;
  }

  return (
    <UpdateQuestionnaireView
      userProfile={userProfile}
      onLogoutButton={logout}
    />
  );
};

export default UpdateQuestionnaireController;
