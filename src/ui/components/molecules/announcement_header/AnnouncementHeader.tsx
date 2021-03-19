import Shield from "assets/images/shield.svg";
import { FONT_SIZE, SPACE } from "config";
import { moderateScale } from "config/Dimens";
import { usePreferredTheme } from "hooks";
import React from "react";
import {
  Image,
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

export interface AnnouncementHeaderProps extends TouchableOpacityProps {
  leftImageUrl?: string;
  title: string;
  subTitle: string;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
  bottomLineStyle?: StyleProp<ViewStyle>;
  shouldShowRightImage?: boolean;
}

export const AnnouncementHeader = React.memo<AnnouncementHeaderProps>(
  ({
    leftImageUrl,
    title,
    subTitle,
    titleStyle,
    subTitleStyle,
    bottomLineStyle,
    shouldShowRightImage = false
  }) => {
    const theme = usePreferredTheme();
    const rightImage: SvgProp = () => {
      return (
        <Shield
          testID="right-icon"
          width={23}
          height={23}
          fill={theme.themedColors.interface["700"]}
        />
      );
    };

    return (
      <View style={style.mainContainer}>
        <View style={style.container}>
          <View style={style.leftContainer}>
            <Image
              style={style.profileImage}
              source={{ uri: leftImageUrl }}
            />
            <View style={style.titleSubtitle}>
              <AppLabel
                text={title}
                style={[
                  style.title,
                  { color: theme.themedColors.label },
                  titleStyle
                ]}
              />
              <AppLabel
                text={subTitle}
                style={[
                  style.subTitle,
                  { color: theme.themedColors.labelSecondary },
                  subTitleStyle
                ]}
              />
            </View>
          </View>
          {shouldShowRightImage && (
            <AppImageBackground
              icon={rightImage}
              containerShape={CONTAINER_TYPES.SQUARE}
              containerStyle={[
                {
                  backgroundColor: theme.themedColors.interface["200"]
                },
                style.rightImage
              ]}
            />
          )}
        </View>
        <View
          style={[
            style.bottomLine,
            { backgroundColor: theme.themedColors.interface["300"] },
            bottomLineStyle
          ]}
        />
      </View>
    );
  }
);

const style = StyleSheet.create({
  mainContainer: {
    marginBottom: SPACE.md
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  leftContainer: {
    flexDirection: "row"
  },
  title: {
    fontSize: FONT_SIZE.lg
  },
  subTitle: {
    fontSize: FONT_SIZE.sm
  },
  titleSubtitle: {
    marginLeft: SPACE.md,
    justifyContent: "space-around"
  },
  bottomLine: {
    width: "100%",
    height: 1,
    marginTop: SPACE.md
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  rightImage: {
    width: moderateScale(35),
    height: moderateScale(35)
  }
});
