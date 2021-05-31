import React from "react";
import { StyleSheet, View } from "react-native";
import { CircleImageBorder } from "ui/components/atoms/circle_image_border/CircleImageBorder";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import Colors from "config/Colors";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import { usePreferredTheme } from "hooks";
import { moderateScale } from "config/Dimens";
import Fonts from "config/Fonts";
import NotificationData from "models/NotificationData";
import LabelHtml from "ui/components/molecules/label_html/LabelHtml";

type Props = {
  notifications?: NotificationData;

  userNameOnPress?: () => void;
};

export const CircleImageWithText = React.memo<Props>(
  ({ userNameOnPress, notifications }) => {
    const theme = usePreferredTheme();

    return (
      <View style={styles.mainContainer}>
        <CircleImageBorder imageUrl={""} />
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

            <AppButton
              text={notifications?.getButtonText()!}
              shouldNotOptimize={false}
              buttonStyle={[
                styles.buttonStyle,
                { backgroundColor: theme.themedColors.primaryShade }
              ]}
              textStyle={styles.buttonText}
              fontWeight={"bold"}
              onPress={userNameOnPress}
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
    marginLeft: SPACE.lg,
    marginRight: SPACE.lg,
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
    width: "40%",
    height: moderateScale(32),
    borderRadius: 8,
    elevation: 0
  },
  view: {
    backgroundColor: Colors.grey2,
    height: 0.5,
    width: "100%",
    alignSelf: "flex-end",
    marginTop: SPACE.md,
    marginBottom: SPACE.lg
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
