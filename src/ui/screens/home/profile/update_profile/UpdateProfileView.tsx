import React from "react";
import { ScrollView } from "react-native";
import Screen from "../../../../components/atoms/Screen";
import { BasicProfile } from "ui/components/profile/basic_profile/BasicProfile";
import { DemoGraphics } from "ui/components/profile/demographics/DemoGraphics";

type Props = {};

export const UpdateProfileView: React.FC<Props> = () => {
  return (
    <Screen>
      <ScrollView>
        <BasicProfile />
        <DemoGraphics />
      </ScrollView>
    </Screen>
  );
};
