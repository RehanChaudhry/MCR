import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import UserImage from "../assets/images/user_pic2.svg";
import { FONT_SIZE, SPACE } from "config";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { grayShades } from "hooks/theme/ColorPaletteContainer";

type Props = {};

const ProfileHeader: FC<Props> = () => {
  const theme = usePreferredTheme();

  return (
    <View style={styles.innerCardView}>
      <View style={styles.container}>
        <View style={styles.imageView}>
          <UserImage />
        </View>
        <View style={styles.headingTextStyle}>
          <HeadingWithText
            headingText={"Zane Mayes"}
            headingFontWeight={"semi-bold"}
            text={"Freshman, Interior Architecture"}
            textStyle={[
              styles.textStyle,
              { color: theme.themedColors.interface["600"] }
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  innerCardView: {
    marginHorizontal: SPACE.lg,
    paddingTop: SPACE.xs
  },
  cardView: {
    marginHorizontal: SPACE.lg,
    marginTop: SPACE.lg
    //marginBottom: -16
  },
  horizontalLine: {
    backgroundColor: grayShades.warmGray["300"],
    height: 0.5,
    marginVertical: SPACE.md
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
    paddingTop: SPACE.xs,
    fontSize: FONT_SIZE.md
  },
  container: {
    flexDirection: "row",
    paddingTop: SPACE.lg
  }
});

export default ProfileHeader;
