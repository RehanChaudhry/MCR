import React from "react";
import { StyleSheet, View } from "react-native";
import { CircleImageBorder } from "ui/components/atoms/circle_image_border/CircleImageBorder";
import MultilineSpannableText from "ui/components/atoms/multiline_spannable_text/MultilineSpannableText";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import Colors from "config/Colors";
import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import { moderateScale } from "config/Dimens";

type Props = {
  username: string;
  message: string;
  onPress: () => void;
  userNameOnPress?: (value: string, userNameindex: number) => void;
};

export const CircleImageWithText = React.memo<Props>(
  ({ username, onPress, message, userNameOnPress }) => {
    const theme = usePreferredTheme();
    return (
      <View style={styles.mainContainer}>
        <CircleImageBorder />
        <View style={styles.viewRequest}>
          <View style={styles.circleWithText}>
            <View>
              <MultilineSpannableText
                text={[username, message]}
                textStyle={[
                  [styles.name, { color: theme.themedColors.primary }],
                  [styles.message, { color: theme.themedColors.black }]
                ]}
                onPress={(value: string, index) => {
                  userNameOnPress?.(value, index);
                }}
              />
            </View>
          </View>
          <View style={styles.requestButtonWithText}>
            <AppLabel
              text={"1h ago"}
              style={[
                styles.time,
                { color: theme.themedColors.interface["700"] }
              ]}
            />

            <AppButton
              text="View Request"
              buttonStyle={[
                styles.buttonStyle,
                { backgroundColor: theme.themedColors.primaryShade }
              ]}
              textStyle={styles.buttonText}
              fontWeight={"bold"}
              onPress={onPress}
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
    marginTop: SPACE.sm
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
    marginTop: SPACE.lg,
    marginBottom: SPACE.xl
  },
  name: { fontWeight: "bold", fontSize: FONT_SIZE.xsm },
  message: { fontWeight: "normal", fontSize: FONT_SIZE.xsm },
  time: {
    fontSize: FONT_SIZE._2xsm
  },
  buttonText: {
    fontSize: FONT_SIZE._2xsm
  },
  viewRequest: {
    flex: 1
  }
});
