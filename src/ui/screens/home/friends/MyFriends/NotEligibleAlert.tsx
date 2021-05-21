import { FONT_SIZE } from "config";
import { usePreferredTheme } from "hooks";
import RelationModel from "models/RelationModel";
import React, { FC } from "react";
import AppPopUp from "ui/components/organisms/popup/AppPopUp";
import { AppLog } from "utils/Util";

type Props = {
  shouldShow: boolean;
  getSelectedItem: () => RelationModel | undefined;
  hideSelf: () => void;
};

const NotEligibleAlert: FC<Props> = React.memo(
  ({ shouldShow, getSelectedItem, hideSelf }) => {
    AppLog.log("in RemoveFriendAlert");

    const theme = usePreferredTheme();
    return (
      <AppPopUp
        isVisible={shouldShow}
        title={"Not eligible for roommate"}
        message={`You can't send roommate request to ${
          getSelectedItem()?.user?.getFullName() ?? "N/A"
        } because he has the maximum allowable number of roommates, and does not allow you to send a roommate request.`}
        actions={[
          {
            title: "OK",
            onPress: () => {
              hideSelf();
            },
            style: {
              style: {
                color: theme.themedColors.primary,
                textAlign: "center",
                fontSize: FONT_SIZE.lg
              }
            }
          }
        ]}
      />
    );
  }
);

export default NotEligibleAlert;
