import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
  View
} from "react-native";
import { LinkButton } from "ui/components/molecules/link_button/LinkButton";
import { AppLog, SvgProp } from "utils/Util";
import { Weight } from "ui/components/atoms/app_label/AppLabel";

export interface HeaderRightTextWithIconProps
  extends TouchableOpacityProps {
  text: string;
  icon?: SvgProp;
  onPress?: () => void;
  textStyle?: StyleProp<TextStyle>;
  fontWeight?: Weight;
  shouldShowLoader?: boolean;
}

const HeaderRightTextWithIcon = React.memo<HeaderRightTextWithIconProps>(
  ({
    text,
    icon,
    onPress,
    textStyle,
    fontWeight = "normal",
    shouldShowLoader = false
  }) => {
    const theme = usePreferredTheme();

    AppLog.logForcefully(
      () => "HeaderRightTextWithIcon : " + shouldShowLoader
    );
    return (
      <>
        {shouldShowLoader && (
          <View style={style.loadMore}>
            <ActivityIndicator
              size="small"
              color={theme.themedColors.label}
            />
          </View>
        )}

        {!shouldShowLoader && (
          <LinkButton
            text={text}
            onPress={onPress}
            rightIcon={icon}
            textStyle={[
              {
                color: theme.themedColors.primary
              },
              style.text,
              textStyle
            ]}
            fontWeight={fontWeight}
            viewStyle={style.container}
          />
        )}
      </>
    );
  }
);

const style = StyleSheet.create({
  container: {
    marginRight: SPACE.sm,
    height: "100%",
    justifyContent: "center"
  },
  text: {
    paddingRight: SPACE._2xs,
    fontSize: FONT_SIZE.sm
  },
  loadMore: {
    height: "100%",
    width: 50,
    marginRight: SPACE.sm,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
});

export default HeaderRightTextWithIcon;
