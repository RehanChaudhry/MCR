import React from "react";
import { StyleSheet, View } from "react-native";
import { LikeCommentButton } from "ui/components/atoms/like_comment_button/LikeCommentButton";
import { AppLog } from "utils/Util";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { ThemeSwitcher } from "ui/components/templates/ThemeSwitcher";
import Like from "assets/images/like.svg";
import { Color } from "react-native-svg";

export const LikeCommentButtonScreen = React.memo(() => {
  AppLog.log("Rendering App...");
  const theme = usePreferredTheme();

  const onValueChanged = (isSelected: boolean) => {
    if (isSelected) {
    } else {
    }
  };

  const like = (isSelected: boolean, color: Color) => {
    return (
      <Like
        width={16}
        height={16}
        fill={isSelected ? theme.themedColors.switchActive : color}
      />
    );
  };

  const comment = () => {
    return (
      <Like
        width={16}
        height={16}
        fill={theme.themedColors.primaryIconColor}
      />
    );
  };
  return (
    <ThemeSwitcher>
      <View style={styles.container}>
        <LikeCommentButton
          selectedText={"Liked"}
          unSelectedText={"Like"}
          textStyle={{ color: theme.themedColors.switchActive }}
          buttonStyle={styles.likeAndComment}
          icon={like}
          onValueChanged={onValueChanged}
        />
        <LikeCommentButton
          unSelectedText={"Comment"}
          textStyle={{ color: theme.themedColors.primaryLabelColor }}
          buttonStyle={styles.likeAndComment}
          icon={comment}
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
