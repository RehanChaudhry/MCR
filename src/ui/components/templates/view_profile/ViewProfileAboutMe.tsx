import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE, SPACE } from "config";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { grayShades } from "hooks/theme/ColorPaletteContainer";
import Strings from "config/Strings";

type Props = {};

const ViewProfileAboutMe: FC<Props> = () => {
  const theme = usePreferredTheme();

  return (
    <View style={styles.innerCardView}>
      <AppLabel
        text={Strings.profile.formTitle.aboutMe}
        style={[
          styles.aboutMe,
          {
            color: theme.themedColors.labelSecondary,
            fontSize: FONT_SIZE.md
          }
        ]}
        weight={"semi-bold"}
      />

      <AppLabel
        text={
          "I am a Interior Architecture major who also likes to play the bass guitar. I always clean up after myself and I like having a quiet environment but I'm down to do fun stuff as well! I am kind of introverted but once we get to know each other, I’ll be your best friend."
        }
        numberOfLines={0}
        style={{
          fontSize: FONT_SIZE.sm,
          color: grayShades.warmGray["700"]
        }}
      />
      <View style={styles.horizontalLine} />
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
  },
  uploadButton: {
    height: 44,
    marginVertical: SPACE.lg,
    width: "100%",
    flexDirection: "row",
    paddingLeft: SPACE.sm
    //alignItems: "flex-start"
  },
  aboutMe: { fontSize: FONT_SIZE.xs, paddingBottom: SPACE.sm }
});

export default ViewProfileAboutMe;
