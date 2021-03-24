import React from "react";
import { StyleSheet, View } from "react-native";
import UserImage from "assets/images/user_pic2.svg";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { FONT_SIZE, SPACE } from "config";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
type Props = {};

export const ProfileHeader: React.FC<Props> = () => {
  const theme = usePreferredTheme();
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <UserImage />
      </View>
      <View style={styles.headingTextStyle}>
        <HeadingWithText
          headingText={"Zane Mayes"}
          text={"Freshman, Interior Architecture"}
          textStyle={[
            styles.textStyle,
            { color: theme.themedColors.interface["600"] }
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  imageView: {
    height: 64,
    width: 64,
    borderRadius: SPACE._3xl
  },
  headingTextStyle: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: SPACE.lg
  },
  textStyle: {
    paddingTop: SPACE.xsm,
    fontSize: FONT_SIZE.md
  }
});
