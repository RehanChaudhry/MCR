import Chat from "assets/images/chat.svg";
import Like from "assets/images/like.svg";
import { SPACE } from "config";
import { usePreferredTheme } from "hooks";
import React from "react";
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
  View,
  ViewStyle
} from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { LikeCommentButton } from "ui/components/atoms/like_comment_button/LikeCommentButton";

export interface AnnouncementFooterProps extends TouchableOpacityProps {
  commentCount: number;
  likeCount: number;
  bottomLineStyle?: StyleProp<ViewStyle>;
  leftContainerLeftTextStyle?: StyleProp<TextStyle>;
  leftContainerRightTextStyle?: StyleProp<TextStyle>;

  leftContainerLeftIconStyle?: StyleProp<ImageStyle>;
  leftContainerRightIconStyle?: StyleProp<ImageStyle>;

  leftContainerLeftButtonStyle?: StyleProp<ViewStyle>;
  leftContainerRightButtonStyle?: StyleProp<ViewStyle>;
}

export const AnnouncementFooter = React.memo<AnnouncementFooterProps>(
  ({
    likeCount = 3,
    commentCount = 5,
    leftContainerLeftTextStyle,
    leftContainerRightTextStyle,
    leftContainerLeftIconStyle,
    leftContainerRightIconStyle,
    leftContainerLeftButtonStyle,
    leftContainerRightButtonStyle,
    bottomLineStyle
  }) => {
    const theme = usePreferredTheme();
    return (
      <View>
        <View
          style={[
            style.bottomLine,
            { backgroundColor: theme.themedColors.interface["300"] },
            bottomLineStyle
          ]}
        />
        <View style={style.container}>
          <View style={style.leftRightContainer}>
            <View>
              <LikeCommentButton
                unSelectedText="Like"
                selectedText="Liked"
                buttonStyle={[
                  {
                    backgroundColor: theme.themedColors.interface["200"]
                  },
                  leftContainerLeftButtonStyle
                ]}
                textStyle={[
                  { color: theme.themedColors.interface["700"] },
                  leftContainerLeftTextStyle
                ]}
                iconStyle={[
                  { tintColor: theme.themedColors.interface["700"] },
                  leftContainerLeftIconStyle
                ]}
              />
            </View>
            <View style={style.leftContainerRightSide}>
              <LikeCommentButton
                unSelectedText="Comment"
                buttonStyle={[
                  {
                    backgroundColor: theme.themedColors.interface["200"]
                  },
                  leftContainerRightButtonStyle
                ]}
                textStyle={[
                  { color: theme.themedColors.interface["700"] },
                  leftContainerRightTextStyle
                ]}
                iconStyle={[
                  { tintColor: theme.themedColors.interface["700"] },
                  leftContainerRightIconStyle
                ]}
              />
            </View>
          </View>
          <View style={style.leftRightContainer}>
            <View style={style.rightContainerLeftSide}>
              <View style={style.row}>
                <Like
                  width={12}
                  height={12}
                  fill={theme.themedColors.primary}
                  style={style.icon}
                />
                <AppLabel
                  text={likeCount.toString()}
                  style={{ color: theme.themedColors.interface["700"] }}
                />
              </View>
            </View>
            <View>
              <View style={style.row}>
                <Chat
                  width={12}
                  height={12}
                  fill={theme.themedColors.primary}
                  style={style.icon}
                />
                <AppLabel
                  text={commentCount.toString()}
                  style={{ color: theme.themedColors.interface["700"] }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
);

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  leftRightContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center"
  },
  leftContainerRightSide: {
    marginLeft: SPACE.sm
  },
  rightContainerRightSide: {
    marginLeft: SPACE.sm
  },
  bottomLine: {
    width: "100%",
    height: 0.5,
    marginVertical: SPACE.md
  },
  rightContainerLeftSide: {
    marginRight: SPACE.sm
  },
  row: {
    flexDirection: "row",
    marginRight: SPACE.sm
  },
  icon: {
    marginTop: SPACE.xxsm,
    marginRight: SPACE.xsm
  }
});
