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
import HtmlView from "react-native-htmlview";

type Props = {
  mainContainerStyle?: StyleProp<ViewStyle>;
  headingStyle?: StyleProp<TextStyle>;
  titleStyle?: StyleProp<TextStyle>;
  icon?: SvgProp;
  heading?: string;
  title: string;
  onPress?: () => void;
  isRenderHtml?: boolean;
};

const SocialDetailForm: FC<Props> = ({
  icon,
  heading,
  title,
  headingStyle,
  titleStyle,
  onPress,
  mainContainerStyle,
  isRenderHtml
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

  const html = () => (
    <HtmlView
      paragraphBreak={""}
      addLineBreaks={false}
      value={title}
      stylesheet={styles}
    />
  );

  return (
    <View style={mainContainerStyle}>
      <View style={styles.subContainer}>
        {icon?.(theme.themedColors.label, 15, 15)}
        <AppLabel
          text={heading}
          weight={"semi-bold"}
          shouldNotOptimize={true}
          style={[
            styles.headingStyle,
            icon?.() === undefined ? { paddingHorizontal: 0 } : {},
            headingStyle
          ]}
        />
      </View>
      {onPress ? (
        <TouchableOpacity onPress={onPress}>{titleJsx()}</TouchableOpacity>
      ) : isRenderHtml ? (
        html()
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
