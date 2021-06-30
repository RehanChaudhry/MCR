import React, { FC } from "react";
import { AppLog } from "utils/Util";
import { usePreferredTheme } from "hooks";
import AppPopUp from "ui/components/organisms/popup/AppPopUp";
import { FONT_SIZE } from "config";

type Props = {
  shouldShow: boolean;
  message: string;
  title: string;
  onConfirmation: () => void;
  hideDialogue: () => void;
};

const TwoButtonsInfoAlert: FC<Props> = React.memo(
  ({ shouldShow, onConfirmation, message, title, hideDialogue }) => {
    AppLog.log(() => "in InfoAlert");
    const theme = usePreferredTheme();
    return (
      <AppPopUp
        isVisible={shouldShow}
        title={title}
        message={message}
        actions={[
          {
            title: "Yes",
            onPress: () => {
              onConfirmation();
            },
            style: {
              style: {
                color: theme.themedColors.primary,
                textAlign: "center",
                fontSize: FONT_SIZE.lg
              }
            }
          },
          {
            title: "Cancel",
            onPress: () => {
              hideDialogue();
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

        // customActionButtons={
        //   <View>
        //     <AppButton text={"Ok"} />
        //     <AppButton text={"Cancel"} onPress={()=>hideSelf()}/>
        //   </View>
        // }
      />
    );
  }
);

export default TwoButtonsInfoAlert;
