import React, { FC } from "react";
import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import { SvgProp } from "utils/Util";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE, SPACE } from "config";

type Props = {
  headingStyle?: StyleProp<TextStyle>;
  titleStyle?: StyleProp<TextStyle>;
  icon: SvgProp;
  heading: string;
  title: string;
};

const SocialDetailForm: FC<Props> = ({
  icon,
  heading,
  title,
  headingStyle,
  titleStyle
}) => {
  const theme = usePreferredTheme();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        {icon?.(theme.themedColors.label, 20, 20)}
        <AppLabel
          text={heading}
          weight={"semi-bold"}
          style={[styles.headingStyle, headingStyle]}
        />
      </View>
      <AppLabel
        text={title}
        style={[
          styles.titleStyle,
          { color: theme.themedColors.primary },
          titleStyle
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    marginTop: SPACE.lg
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  headingStyle: {
    fontSize: FONT_SIZE.xsm,
    paddingHorizontal: SPACE.sm
  },
  titleStyle: {
    marginTop: SPACE.sm
  }
});

export default SocialDetailForm;
