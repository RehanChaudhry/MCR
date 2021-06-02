import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import React, { FC } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import {
  AppButton,
  BUTTON_TYPES
} from "ui/components/molecules/app_button/AppButton";
import { SvgProp } from "utils/Util";

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  title: string;
  detail: string;
  icon?: SvgProp | undefined;
  onPressAction: () => void;
};

const ConnectionListHeader: FC<Props> = ({
  containerStyle,
  title,
  detail,
  icon,
  onPressAction
}) => {
  const theme = usePreferredTheme();
  return (
    <View style={containerStyle}>
      <AppButton
        shouldAlignTextWithLeftIconWithFullWidth={true}
        fontWeight="semi-bold"
        text={title}
        shouldNotOptimize={true}
        iconStyle={[{ marginLeft: SPACE.sm }]}
        textStyle={[
          styles.buttonText,
          {
            color: theme.themedColors.labelSecondary
          }
        ]}
        buttonType={BUTTON_TYPES.BORDER}
        textContainerStyle={styles.buttonTextContainer}
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
  text: {
    marginTop: SPACE.lg,
    fontSize: FONT_SIZE.sm
  },
  buttonText: {
    fontSize: FONT_SIZE.base,
    paddingLeft: SPACE.xs
  },
  buttonTextContainer: { flex: 1, justifyContent: "flex-start" }
});

export default ConnectionListHeader;
