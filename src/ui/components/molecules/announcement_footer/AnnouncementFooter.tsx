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
import { LikeCommentButton } from "ui/components/atoms/like_comment_button/LikeCommentButton";

export interface AnnouncementFooterProps extends TouchableOpacityProps {
  commentCount: number;
  likeCount: number;
  bottomLineStyle?: StyleProp<ViewStyle>;
  leftContainerLeftTextStyle?: StyleProp<TextStyle>;
  leftContainerRightTextStyle?: StyleProp<TextStyle>;
  rightContainerLeftTextStyle?: StyleProp<TextStyle>;
  rightContainerRightTextStyle?: StyleProp<TextStyle>;

  leftContainerLeftIconStyle?: StyleProp<ImageStyle>;
  leftContainerRightIconStyle?: StyleProp<ImageStyle>;
  rightContainerLeftIconStyle?: StyleProp<ImageStyle>;
  rightContainerRightIconStyle?: StyleProp<ImageStyle>;

  leftContainerLeftButtonStyle?: StyleProp<ViewStyle>;
  leftContainerRightButtonStyle?: StyleProp<ViewStyle>;
}

export const AnnouncementFooter = React.memo<AnnouncementFooterProps>(
  ({
    likeCount = 3,
    commentCount = 5,
    leftContainerLeftTextStyle,
    leftContainerRightTextStyle,
    rightContainerLeftTextStyle,
    rightContainerRightTextStyle,
    leftContainerLeftIconStyle,
    leftContainerRightIconStyle,
    rightContainerLeftIconStyle,
    rightContainerRightIconStyle,
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
            { backgroundColor: theme.themedColors.primaryBackground },
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
                    backgroundColor: theme.themedColors.primaryBackground
                  },
                  leftContainerLeftButtonStyle
                ]}
                textStyle={[
                  { color: theme.themedColors.primaryLabelColor },
                  leftContainerLeftTextStyle
                ]}
                iconStyle={[
                  { tintColor: theme.themedColors.primaryIconColor },
                  leftContainerLeftIconStyle
                ]}
              />
            </View>
            <View style={style.leftContainerRightSide}>
              <LikeCommentButton
                unSelectedText="Comment"
                buttonStyle={[
                  {
                    backgroundColor: theme.themedColors.primaryBackground
                  },
                  leftContainerRightButtonStyle
                ]}
                textStyle={[
                  { color: theme.themedColors.primaryLabelColor },
                  leftContainerRightTextStyle
                ]}
                iconStyle={[
                  { tintColor: theme.themedColors.primaryIconColor },
                  leftContainerRightIconStyle
                ]}
              />
            </View>
          </View>
          <View style={style.leftRightContainer}>
            <View>
              <LikeCommentButton
                unSelectedText={likeCount.toString()}
                textStyle={[
                  { color: theme.themedColors.primaryLabelColor },
                  rightContainerLeftTextStyle
                ]}
                iconStyle={[
                  { tintColor: theme.themedColors.primaryIconColor },
                  rightContainerLeftIconStyle
                ]}
                buttonStyle={[
                  {
                    backgroundColor: theme.themedColors.primaryBackground
                  },
                  leftContainerLeftButtonStyle
                ]}
              />
            </View>
            <View style={style.rightContainerRightSide}>
              <LikeCommentButton
                unSelectedText={commentCount.toString()}
                textStyle={[
                  { color: theme.themedColors.primaryLabelColor },
                  rightContainerRightTextStyle
                ]}
                iconStyle={[
                  { tintColor: theme.themedColors.primaryIconColor },
                  rightContainerRightIconStyle
                ]}
                buttonStyle={[
                  {
                    backgroundColor: theme.themedColors.primaryBackground
                  },
                  leftContainerRightButtonStyle
                ]}
              />
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
    flexDirection: "row"
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
  }
});
