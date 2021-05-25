import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import React from "react";
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
  View,
  ViewStyle
} from "react-native";
import { AppLabel, Weight } from "ui/components/atoms/app_label/AppLabel";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import { SvgProp } from "utils/Util";

export interface AnnouncementHeaderProps extends TouchableOpacityProps {
  leftImageUrl?: string | undefined;
  title: string;
  subTitle?: string;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
  bottomLineStyle?: StyleProp<ViewStyle>;
  shouldShowRightImage?: boolean;
  shouldHideSubTitle?: boolean;
  shouldHideBottomSeparator?: boolean;
  titleFontWeight?: Weight;
  rightIcon?: SvgProp;
  onClickedReportContentButton?: (postId: number) => void | undefined;
  leftImageStyle?: StyleProp<ImageStyle> | undefined;
  postId?: number;
}

export const AnnouncementHeader = React.memo<AnnouncementHeaderProps>(
  ({
    leftImageUrl,
    title,
    subTitle,
    titleStyle,
    subTitleStyle,
    bottomLineStyle,
    shouldShowRightImage = false,
    shouldHideSubTitle = false,
    shouldHideBottomSeparator = false,
    titleFontWeight = "normal",
    onClickedReportContentButton,
    rightIcon,
    leftImageStyle,
    postId
  }) => {
    const theme = usePreferredTheme();

    return (
      <View style={style.mainContainer}>
        <View style={style.container}>
          <View style={style.leftContainer}>
            <Image
              style={[style.profileImage, leftImageStyle]}
              source={
                leftImageUrl !== undefined
                  ? { uri: leftImageUrl }
                  : require("assets/images/profile.png")
              }
            />

            <View style={style.titleSubtitle}>
              <AppLabel
                text={title}
                style={[
                  style.title,
                  { color: theme.themedColors.label },
                  titleStyle
                ]}
                weight={titleFontWeight}
              />
              {!shouldHideSubTitle && subTitle !== undefined && (
                <AppLabel
                  text={subTitle}
                  style={[
                    style.subTitle,
                    { color: theme.themedColors.labelSecondary },
                    subTitleStyle
                  ]}
                />
              )}
            </View>
          </View>
          {shouldShowRightImage && (
            <AppImageBackground
              icon={rightIcon}
              containerShape={CONTAINER_TYPES.SQUARE}
              containerStyle={[
                {
                  backgroundColor: theme.themedColors.interface["200"]
                },
                style.rightImage
              ]}
              onPress={() => {
                onClickedReportContentButton?.(postId ?? 0);
              }}
            />
          )}
        </View>
        {!shouldHideBottomSeparator && (
          <View
            style={[
              style.bottomLine,
              { borderColor: theme.themedColors.interface["300"] },
              bottomLineStyle
            ]}
          />
        )}
      </View>
    );
  }
);

const style = StyleSheet.create({
  mainContainer: {
    marginTop: SPACE.lg
  },
  container: {
    flexDirection: "row"
  },
  leftContainer: {
    flexDirection: "row",
    flex: 1
  },
  title: {
    fontSize: FONT_SIZE.base
  },
  subTitle: {
    fontSize: FONT_SIZE.xs
  },
  titleSubtitle: {
    marginLeft: SPACE.md,
    justifyContent: "space-around",
    flex: 1,
    marginStart: SPACE.sm,
    paddingStart: SPACE.sm,
    paddingEnd: SPACE.md
  },
  bottomLine: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: SPACE.lg
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 50
  },
  rightImage: {
    width: 36,
    height: 36
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  }
});
