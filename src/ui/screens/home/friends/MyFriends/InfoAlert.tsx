import { FONT_SIZE } from "config";
import { usePreferredTheme } from "hooks";
import React, { FC } from "react";
import AppPopUp from "ui/components/organisms/popup/AppPopUp";
import { AppLog } from "utils/Util";

type Props = {
  shouldShow: boolean;
  message: string;
  title: string;
  hideSelf: () => void;
};

const InfoAlert: FC<Props> = React.memo(
  ({ shouldShow, hideSelf, message, title }) => {
    AppLog.log(() => "in InfoAlert");

    const theme = usePreferredTheme();
    return (
      <AppPopUp
        isVisible={shouldShow}
        title={title}
        message={message}
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

export default InfoAlert;
