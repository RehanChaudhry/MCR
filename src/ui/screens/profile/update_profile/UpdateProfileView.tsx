import React from "react";
import { BasicProfile } from "ui/components/profile/basic_profile/BasicProfile";
import Screen from "ui/components/atoms/Screen";
import { ScrollView } from "react-native";
import { DemoGraphics } from "ui/components/profile/demographics/DemoGraphics";

export const UpdateProfileView = React.memo(() => {
  return (
    <Screen>
      <ScrollView>
        <BasicProfile />
        <DemoGraphics />
      </ScrollView>
    </Screen>
  );
});
