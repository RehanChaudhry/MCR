import React, { FC } from "react";
import { usePreferredTheme } from "hooks";
import AppPopUp from "ui/components/organisms/popup/AppPopUp";
import { FONT_SIZE, SPACE } from "config";
import { StyleSheet, View } from "react-native";
import { AppButton } from "ui/components/molecules/app_button/AppButton";

type Props = {
  shouldShow: boolean;
  message: string;
  title: string;
  hideDialogue: () => void;
  deleteActionPress: () => void;
  shouldShowPb?: boolean;
};

const DeletePostAlert: FC<Props> = React.memo(
  ({
    shouldShow,
    message,
    title,
    hideDialogue,
    deleteActionPress,
    shouldShowPb
  }) => {
    const theme = usePreferredTheme();

    return (
      <AppPopUp
        isVisible={shouldShow}
        title={title}
        message={message}
        customActionButtons={
          <View>
            <View
              style={[
                styles.separator,
                { backgroundColor: theme.themedColors.separator }
              ]}
            />
            <AppButton
              text={"Yes,Delete"}
              style={styles.actionContainer}
              shouldShowProgressBar={shouldShowPb}
              onPress={deleteActionPress}
              textStyle={[
                styles.actionStyle,
                {
                  color: theme.themedColors.primary,
                  textAlign: "center",
                  fontSize: FONT_SIZE.base
                }
              ]}
              fontWeight="semi-bold"
            />
            <View
              style={[
                styles.separator,
                { backgroundColor: theme.themedColors.separator }
              ]}
            />
            <AppButton
              text="Cancel"
              style={styles.actionContainer}
              onPress={() => {
                hideDialogue();
              }}
              textStyle={[
                styles.actionStyle,
                {
                  color: theme.themedColors.label,
                  fontSize: FONT_SIZE.base
                }
              ]}
            />
          </View>
        }
      />
    );
  }
);

const styles = StyleSheet.create({
  actionStyle: {
    textAlign: "center",
    fontSize: FONT_SIZE.lg
  },
  actionContainer: {
    padding: SPACE.md
  },
  separator: {
    height: 0.5
  }
});

export default DeletePostAlert;
