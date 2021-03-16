import React from "react";
import { StyleSheet, View } from "react-native";
import { CircleImageBorder } from "ui/components/atoms/circle_image_border/CircleImageBorder";
import { MultilineSpannableText } from "ui/components/atoms/multiline_spannable_text/MultilineSpannableText";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import Colors from "config/Colors";

type Props = {};

export const CircleImageWithText = React.memo<Props>(() => {
  return (
    <View style={styles.mainContainer}>
      <CircleImageBorder />
      <View>
        <View style={styles.circleWithText}>
          <View>
            <MultilineSpannableText
              text={[
                { id: 1, text: "Phoenix Walker " },
                {
                  id: 2,
                  text:
                    "has sent you a friend ,has sent you a friend request"
                }
              ]}
              textStyle={[styles.name, styles.message]}
            />
          </View>
        </View>
        <View style={styles.requestButtonWithText}>
          <AppLabel text={"1h ago"} />

          <AppButton
            text="View Request"
            buttonStyle={styles.buttonStyle}
          />
        </View>
        <View style={styles.view} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    width: 290
  },
  circleWithText: {
    flexDirection: "row"
  },

  requestButtonWithText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8
  },
  buttonStyle: {
    width: 160,
    height: 30,
    borderRadius: 8
  },
  view: {
    backgroundColor: Colors.grey2,
    height: 1,
    width: "100%",
    alignSelf: "flex-end",
    marginTop: 20,
    marginBottom: 30
  },
  name: { fontWeight: "bold" },
  message: { fontWeight: "normal" }
});
