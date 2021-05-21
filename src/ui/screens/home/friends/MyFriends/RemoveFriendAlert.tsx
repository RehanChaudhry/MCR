import { FONT_SIZE } from "config";
import { usePreferredTheme } from "hooks";
import RelationModel from "models/RelationModel";
import React, { FC } from "react";
import AppPopUp from "ui/components/organisms/popup/AppPopUp";
import { AppLog } from "utils/Util";

type Props = {
  shouldShow: boolean;
  getSelectedItem: () => RelationModel | undefined;
  hideSelf: (shouldShow: boolean) => void;
};

const RemoveFriendAlert: FC<Props> = React.memo(
  ({ shouldShow, getSelectedItem, hideSelf }) => {
    AppLog.log("in RemoveFriendAlert");

    const theme = usePreferredTheme();
    return (
      <AppPopUp
        isVisible={shouldShow}
        title={"Remove Friend"}
        message={`Are you sure you want to remove ${
          getSelectedItem()?.user?.getFullName() ?? ""
        } from your friends list?`}
        actions={[
          {
            title: "Yes, remove",
            onPress: () => {
              hideSelf(false);
            },
            style: {
              weight: "bold",
              style: {
                color: theme.themedColors.danger,
                textAlign: "center",
                fontSize: FONT_SIZE.lg
              }
            }
          },
          {
            title: "Cancel",
            onPress: () => {
              hideSelf(false);
            }
          }
        ]}
      />
    );
  }
);

export default RemoveFriendAlert;
