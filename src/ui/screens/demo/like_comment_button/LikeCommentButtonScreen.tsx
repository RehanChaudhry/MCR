import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { LikeCommentButton } from "ui/components/atoms/like_comment_button/LikeCommentButton";
import { AppLog } from "utils/Util";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { ThemeSwitcher } from "ui/components/templates/ThemeSwitcher";

export const LikeCommentButtonScreen = React.memo(() => {
  AppLog.log("Rendering App...");
  const theme = usePreferredTheme();
  const [isSelected, setIsSelected] = useState(false);
  const onPress = () => {
    AppLog.log("isSelected: " + isSelected);
    if (isSelected) {
      setIsSelected(false);
    } else {
      setIsSelected(true);
    }
  };

  const getText = () => {
    if (isSelected) {
      return "Liked";
    } else {
      return "Like";
    }
  };

  return (
    <ThemeSwitcher>
      <View style={styles.container}>
        <LikeCommentButton
          text={getText()}
          leftIcon={require("assets/images/like_fill.png")}
          isSelected={isSelected}
          textStyle={{ color: theme.themedColors.switchActive }}
          iconStyle={{ tintColor: theme.themedColors.switchActive }}
          buttonStyle={styles.likeAndComment}
          onPress={onPress}
        />
        <LikeCommentButton
          text={"Comment"}
          leftIcon={require("assets/images/like_fill.png")}
          isSelected={isSelected}
          textStyle={{ color: theme.themedColors.primaryLabelColor }}
          iconStyle={{ tintColor: theme.themedColors.primaryLabelColor }}
          buttonStyle={styles.likeAndComment}
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
  }
});
