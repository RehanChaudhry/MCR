import React from "react";
import { StyleSheet } from "react-native";
import {
  AppLabel,
  TEXT_TYPE
} from "ui/components/atoms/app_label/AppLabel";
import { ThemeSwitcher } from "ui/components/templates/ThemeSwitcher";
import { FONT_SIZE } from "config";

type Props = {};

export const AppLabelScreen = React.memo<Props>(() => {
  return (
    <ThemeSwitcher>
      <AppLabel
        text={"Lorem Ipsum"}
        textType={TEXT_TYPE.NORMAL}
        style={styles.space}
      />
      <AppLabel
        text={"Lorem Ipsum"}
        textType={TEXT_TYPE.ITALIC}
        style={styles.space}
      />
      <AppLabel
        text={"Lorem Ipsum"}
        textType={TEXT_TYPE.BOLD}
        style={styles.space}
      />
      <AppLabel
        text={"Lorem Ipsum"}
        textType={TEXT_TYPE.UNDERLINE}
        style={styles.space}
      />
      <AppLabel
        text={"Lorem Ipsum"}
        textType={TEXT_TYPE.LINE_THROUGH}
        style={styles.space}
      />

      <AppLabel
        text={"Lorem Ipsum"}
        textType={TEXT_TYPE.NORMAL}
        style={styles.small}
      />

      <AppLabel
        text={"Lorem Ipsum"}
        textType={TEXT_TYPE.NORMAL}
        style={styles.medium}
      />

      <AppLabel
        text={"Lorem Ipsum"}
        textType={TEXT_TYPE.NORMAL}
        style={styles.large}
      />
    </ThemeSwitcher>
  );
});

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40,
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center"
  },
  lineThrough: {
    textDecorationLine: "line-through"
  },
  space: {
    marginBottom: 12
  },

  small: {
    fontSize: FONT_SIZE.sm,
    marginBottom: 12
  },
  medium: {
    fontSize: FONT_SIZE.md,
    marginBottom: 12
  },
  large: {
    fontSize: FONT_SIZE._3xl,
    marginBottom: 12
  }
});
