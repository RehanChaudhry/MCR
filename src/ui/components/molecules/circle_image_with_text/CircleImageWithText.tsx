import { FONT_SIZE, SPACE, STRINGS } from "config";
import Colors from "config/Colors";
import Fonts from "config/Fonts";
import { usePreferredTheme } from "hooks";
import NotificationData from "models/NotificationData";
import React from "react";
import { StyleSheet, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { CircleImageBorder } from "ui/components/atoms/circle_image_border/CircleImageBorder";
import LabelHtml from "ui/components/molecules/label_html/LabelHtml";
import { LinkButton } from "ui/components/molecules/link_button/LinkButton";

type Props = {
  notifications?: NotificationData;

  userNameOnPress?: () => void;
};

export const CircleImageWithText = React.memo<Props>(
  ({ userNameOnPress, notifications }) => {
    const theme = usePreferredTheme();

    return (
      <View style={styles.mainContainer}>
        <CircleImageBorder
          imageUrl={notifications?.sender?.profilePicture?.fileURL!}
        />
        <View style={styles.viewRequest}>
          <View style={styles.circleWithText}>
            <LabelHtml
              style={styles.messageText}
              text={
                notifications?.getMessage() ?? STRINGS.common.not_found
              }
            />
          </View>
          <View style={styles.requestButtonWithText}>
            <AppLabel
              text={notifications?.getDisplayTime()}
              style={[
                styles.time,
                { color: theme.themedColors.interface["700"] }
              ]}
            />
            <LinkButton
              text={notifications?.getButtonText()!}
              viewStyle={[
                styles.buttonStyle,
                { backgroundColor: theme.themedColors.primaryShade }
              ]}
              onPress={userNameOnPress}
              fontWeight="bold"
              textStyle={styles.buttonText}
            />
          </View>
          <View
            style={[
              styles.view,
              { backgroundColor: theme.themedColors.interface["300"] }
            ]}
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    flexBasis: 0.1
  },
  circleWithText: {
    flexDirection: "row"
  },

  requestButtonWithText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: SPACE._2xs
  },
  buttonStyle: {
    borderRadius: 8,
    elevation: 0,
    paddingLeft: SPACE.sm,
    paddingTop: SPACE.sm,
    paddingBottom: SPACE.sm
  },
  view: {
    backgroundColor: Colors.grey2,
    height: 0.5,
    width: "100%",
    alignSelf: "flex-end",
    marginTop: SPACE.md
  },
  name: { fontFamily: Fonts.bold, fontSize: FONT_SIZE.sm },
  message: { fontSize: FONT_SIZE.sm },
  boldText: {
    fontFamily: Fonts.regular,
    fontSize: FONT_SIZE.sm
  },
  time: {
    fontSize: FONT_SIZE.xs
  },
  buttonText: {
    fontSize: FONT_SIZE.xs
  },
  viewRequest: {
    flex: 1
  },
  messageText: { fontSize: FONT_SIZE.sm }
});
