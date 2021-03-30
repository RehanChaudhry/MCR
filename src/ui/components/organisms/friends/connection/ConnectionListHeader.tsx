import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import {
  AppButton,
  BUTTON_TYPES
} from "ui/components/molecules/app_button/AppButton";
import { SvgProp } from "utils/Util";

type Props = {
  title: string;
  detail: string;
  icon?: SvgProp | undefined;
  onPressAction: () => void;
};

const ConnectionListHeader: FC<Props> = ({
  title,
  detail,
  icon,
  onPressAction
}) => {
  const theme = usePreferredTheme();
  return (
    <View style={styles.container}>
      <AppButton
        shouldAlignTextWithLeftIconWithFullWidth={true}
        fontWeight="semi-bold"
        text={title}
        textStyle={[
          styles.buttonText,
          {
            color: theme.themedColors.labelSecondary
          }
        ]}
        buttonType={BUTTON_TYPES.BORDER}
        leftIcon={icon}
        onPress={onPressAction}
      />
      <AppLabel
        style={[{ color: theme.themedColors.labelSecondary }, styles.text]}
        text={detail}
        numberOfLines={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: SPACE.lg,
    paddingRight: SPACE.lg,
    paddingTop: SPACE.lg,
    paddingBottom: SPACE.sm
  },
  text: {
    marginTop: SPACE.lg
  },
  buttonText: {
    fontSize: FONT_SIZE.xsm,
    paddingLeft: SPACE.xxsm
  }
});

export default ConnectionListHeader;
