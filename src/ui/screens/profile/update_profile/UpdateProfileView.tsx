import React from "react";
import { BasicProfile } from "ui/components/profile/BasicProfile";
import Screen from "ui/components/atoms/Screen";

export const UpdateProfileView = React.memo(() => {
  return (
    <Screen>
      <BasicProfile />
    </Screen>
  );
});
