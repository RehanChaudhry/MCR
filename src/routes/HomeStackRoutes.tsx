import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { HomeStack } from "routes/HomeStack";
import ViewProfileController from "ui/screens/home/profile/view_profile/ViewProfileController";
import EScreen from "models/enums/EScreen";
import ConnectRequestsController from "ui/screens/home/friends/connect_requests/ConnectRequestsController";
import MyRoommatesController from "ui/screens/home/friends/MyRoommates/MyRoommatesController";
import RoommateAgreementController from "ui/screens/home/friends/RoommateAgreement/RoommateAgreementController";
import SinglePostController from "ui/screens/home/community/single_post/SinglePostController";
import CommunityController from "ui/screens/home/community/CommunityController";
import { CommentsController } from "ui/screens/home/comments/CommentsController";
import ReportContentController from "ui/screens/home/community/report_content/ReportContentController";
import { ChatThreadController } from "ui/screens/chat/thread/ChatThreadController";
import { HomeDrawerRoutes } from "./HomeDrawerRoutes";
import CreatePostController from "ui/screens/home/community/create_post/CreatePostController";
import { STRINGS } from "config";
import AgreementDetailsController from "ui/screens/home/friends/agreement_details/AgreementDetailsController";
import MatchInfoController from "ui/screens/home/matches/match_info/MatchInfoController";
import UpdateProfileController from "ui/screens/home/profile/update_profile/UpdateProfileController";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import QuestionsController from "ui/screens/questions/QuestionsController";
import StaticContentController from "ui/screens/static_content/StaticContentController";
import { AddInterestsController } from "ui/screens/home/profile/update_profile/add_interests/AddInterestsController";
import { NewConversationController } from "ui/screens/chat/new/NewConversationController";
import MyFriendsController from "ui/screens/home/friends/MyFriends/MyFriendsController";

const Stack = createStackNavigator();

export const HomeStackRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      {/* Root */}
      <HomeStack.Screen
        name="DrawerRoutes"
        component={HomeDrawerRoutes}
        options={{ headerShown: false }}
      />

      {/* Matches */}
      <HomeStack.Screen
        name="MatchInfo"
        component={MatchInfoController}
        options={{
          headerTitle: () => <HeaderTitle text={STRINGS.matchInfo.title} />
        }}
      />

      {/* My Friends */}
      <HomeStack.Screen
        name="ConnectRequest"
        component={ConnectRequestsController}
      />
      <HomeStack.Screen
        name="MyFriends"
        initialParams={{ isFrom: EScreen.NOTIFICATION }}
        component={MyFriendsController}
      />
      <HomeStack.Screen
        name="MyRoommates"
        initialParams={{ isFrom: EScreen.NOTIFICATION }}
        component={MyRoommatesController}
      />
      <HomeStack.Screen
        name="RoommateAgreement"
        initialParams={{ isFrom: EScreen.NOTIFICATION }}
        component={RoommateAgreementController}
      />

      {/* Chat */}
      <HomeStack.Screen
        name="ChatThread"
        component={ChatThreadController}
      />
      <HomeStack.Screen
        name={"NewConversation"}
        component={NewConversationController}
      />

      {/* My Profile */}
      <HomeStack.Screen
        name="ViewProfile"
        component={ViewProfileController}
        initialParams={{ isFrom: EScreen.HOME }}
        options={{ title: "View Profile" }}
      />
      <HomeStack.Screen
        name="UpdateProfile"
        component={UpdateProfileController}
      />
      <HomeStack.Screen
        name="AddInterests"
        component={AddInterestsController}
      />
      <HomeStack.Screen
        name="Questionnaire"
        component={QuestionsController}
      />
      <HomeStack.Screen
        name="AgreementDetails"
        component={AgreementDetailsController}
      />

      {/* Community */}
      <HomeStack.Screen name="Community" component={CommunityController} />
      <HomeStack.Screen
        name="CreatePost"
        component={CreatePostController}
      />
      <HomeStack.Screen name="Comments" component={CommentsController} />
      <HomeStack.Screen
        name="ReportContent"
        component={ReportContentController}
      />
      <HomeStack.Screen
        name="SinglePost"
        component={SinglePostController}
      />

      {/* Others */}
      <HomeStack.Screen
        name="StaticContent"
        component={StaticContentController}
      />
    </Stack.Navigator>
  );
};
