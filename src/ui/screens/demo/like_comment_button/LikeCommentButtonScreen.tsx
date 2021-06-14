import React from "react";
import { StyleSheet, View } from "react-native";
import { LikeCommentButton } from "ui/components/atoms/like_comment_button/LikeCommentButton";
import { AppLog } from "utils/Util";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { ThemeSwitcher } from "ui/components/templates/theme_switcher/ThemeSwitcher";

export const LikeCommentButtonScreen = React.memo(() => {
  AppLog.logForComplexMessages(() => "Rendering App...");
  const theme = usePreferredTheme();

  const onValueChanged = (isSelected: boolean) => {
    if (isSelected) {
    } else {
    }
  };

  return (
    <ThemeSwitcher>
      <View style={styles.container}>
        <LikeCommentButton
          selectedText={"Liked"}
          unSelectedText={"Like"}
          textStyle={{ color: theme.themedColors.switchActive }}
          buttonStyle={styles.likeAndComment}
          onValueChanged={onValueChanged}
        />
        <LikeCommentButton
          unSelectedText={"Comment"}
          textStyle={{ color: theme.themedColors.primaryLabelColor }}
          buttonStyle={styles.likeAndComment}
          onValueChanged={onValueChanged}
        />
      </View>
    </ThemeSwitcher>
  );
});

const styles = StyleSheet.create({
  container: {
    alignSelf: "center"
  },
  likeAndComment: {
    marginTop: 40,
    alignSelf: "center",
    marginBottom: 20
  },
  leftIcon: {
    width: 10,
    height: 10,
    resizeMode: "contain"
  }
});
