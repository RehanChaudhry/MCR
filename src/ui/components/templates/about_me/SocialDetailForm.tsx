import { FONT_SIZE, SPACE } from "config";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import React, { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { SvgProp } from "utils/Util";

type Props = {
  mainContainerStyle?: StyleProp<ViewStyle>;
  headingStyle?: StyleProp<TextStyle>;
  titleStyle?: StyleProp<TextStyle>;
  icon?: SvgProp;
  heading?: string;
  title: string;
  onPress?: () => void;
};

const SocialDetailForm: FC<Props> = ({
  icon,
  heading,
  title,
  headingStyle,
  titleStyle,
  onPress,
  mainContainerStyle
}) => {
  const theme = usePreferredTheme();
  const titleJsx = () => (
    <AppLabel
      text={title}
      style={[
        styles.titleStyle,
        { color: theme.themedColors.primary },
        titleStyle
      ]}
      numberOfLines={0}
    />
  );
  return (
    <View style={mainContainerStyle}>
      <View style={styles.subContainer}>
        {icon?.(theme.themedColors.label, 15, 15)}
        <AppLabel
          text={heading}
          weight={"semi-bold"}
          style={[styles.headingStyle, headingStyle]}
        />
      </View>
      {onPress ? (
        <TouchableOpacity onPress={onPress}>{titleJsx()}</TouchableOpacity>
      ) : (
        titleJsx()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  headingStyle: {
    fontSize: FONT_SIZE.sm,
    paddingHorizontal: SPACE.sm
  },
  titleStyle: {
    marginTop: SPACE.sm
  }
});

export default SocialDetailForm;
