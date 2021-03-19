import React from "react";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import ArrowLeft from "assets/images/arrow_left.svg";
import { usePreferredTheme } from "hooks";
import Colors from "config/Colors";
import { StyleSheet, View } from "react-native";
import { FONT_SIZE, SPACE } from "config";
import Logo from "assets/images/logo.svg";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";

type Props = {
  openForgotPasswordScreen?: () => void;
  shouldShowProgressBar: boolean;
};

export const SignInView = React.memo<Props>(({}) => {
  const theme = usePreferredTheme();

  return (
    <View style={styles.mainContainer}>
      <AppImageBackground
        containerShape={CONTAINER_TYPES.CIRCLE}
        icon={() => (
          <ArrowLeft
            width={20}
            height={20}
            fill={theme.themedColors.primary}
          />
        )}
        containerStyle={styles.leftArrow}
      />

      <Logo style={styles.logo} />

      <AppLabel
        text={"Sign in to your account"}
        weight={"bold"}
        style={styles.signInHeading}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    marginLeft: SPACE.lg,
    marginRight: SPACE.lg
  },
  leftArrow: {
    backgroundColor: Colors.white,
    elevation: 2,
    width: 32,
    height: 32,
    marginTop: SPACE.xl
  },
  logo: {
    marginTop: SPACE._2xl
  },
  signInHeading: {
    fontSize: FONT_SIZE._2xl,
    marginTop: 40
  }
});
