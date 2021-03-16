import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
  View,
  ViewStyle
} from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import { SvgProp } from "utils/Util";

export interface AppButtonProps extends TouchableOpacityProps {
  leftImage?: SvgProp;
  title: string;
  subTitle: string;
  rightImage?: SvgProp;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
  bottomLineStyle?: StyleProp<ViewStyle>;
}

export const AnnouncementHeader = React.memo<AppButtonProps>(
  ({
    leftImage,
    title,
    subTitle,
    rightImage,
    titleStyle,
    subTitleStyle,
    bottomLineStyle
  }) => {
    const theme = usePreferredTheme();
    return (
      <View>
        <View style={style.container}>
          <View style={style.leftContainer}>
            {leftImage?.(theme.themedColors.primaryIconColor, 20, 20)}
            <View style={style.titleSubtitle}>
              <AppLabel
                text={title}
                style={[
                  style.title,
                  { color: theme.themedColors.primaryLabelColor },
                  titleStyle
                ]}
              />
              <AppLabel
                text={subTitle}
                style={[
                  style.subTitle,
                  { color: theme.themedColors.secondaryLabelColor },
                  subTitleStyle
                ]}
              />
            </View>
          </View>
          <AppImageBackground
            icon={rightImage}
            containerShape={CONTAINER_TYPES.SQUARE}
          />
        </View>
        <View
          style={[
            style.bottomLine,
            { backgroundColor: theme.themedColors.primaryBackground },
            bottomLineStyle
          ]}
        />
      </View>
    );
  }
);

const style = StyleSheet.create({
  container: {
    marginTop: SPACE.one,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  leftContainer: {
    flexDirection: "row"
  },
  title: {
    fontSize: FONT_SIZE.md
  },
  subTitle: {
    fontSize: FONT_SIZE.sm
  },
  titleSubtitle: {
    marginLeft: SPACE.two,
    justifyContent: "center"
  },
  bottomLine: {
    width: "100%",
    height: 1,
    marginTop: SPACE.two
  }
});
