import { useRoute } from "@react-navigation/native";
import React from "react";
import MatchesController from "ui/screens/home/matches/MatchesController";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import { STRINGS } from "config";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { ActivityLogStack } from "routes/ActivityLogStack";

const ActivityLogRoutes = ({ navigation }: any) => {
  const route: any = useRoute();

  React.useEffect(() => {
    return navigation.addListener("focus", () => {
      route.params.changeSelectedDrawerItem();
    });
  }, [navigation, route]);

  return (
    <ActivityLogStack.Navigator
      initialRouteName={"ActivityLog"}
      screenOptions={{ headerTitleAlign: "center" }}>
      <ActivityLogStack.Screen
        name="ActivityLog"
        component={MatchesController}
        options={{
          headerLeft: () => <Hamburger />,
          headerTitle: () => (
            <HeaderTitle text={STRINGS.activity_log.title} />
          )
        }}
      />
    </ActivityLogStack.Navigator>
  );
};

export default ActivityLogRoutes;
