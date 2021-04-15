import Chat from "assets/images/chat.svg";
import Like from "assets/images/like.svg";
import { FONT_SIZE, SPACE } from "config";
import { useAuth, usePreferredTheme } from "hooks";
import React, { useState } from "react";
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
import { CommentButton } from "ui/components/atoms/compact_buttons/CommentButton";
import { LikeButton } from "ui/components/atoms/compact_buttons/LikeButton";
import { AppLog } from "utils/Util";
import { IsLikedByMe } from "models/api_responses/CommunityAnnouncementResponseModel";

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
  openCommentsScreen?: () => void | undefined;
  likedBy: IsLikedByMe[];
  likeDislikeAPi: (postId: number) => Promise<boolean>;
  postId: number;
}

export const AnnouncementFooter = React.memo<AnnouncementFooterProps>(
  ({
    likeCount = 0,
    commentCount = 0,
    bottomLineStyle,
    openCommentsScreen,
    likedBy,
    likeDislikeAPi,
    postId
  }) => {
    const theme = usePreferredTheme();
    const { user } = useAuth();
    AppLog.logForcefully("user in footer " + JSON.stringify(user));
    let [
      showShowLikeButtonSelected,
      _showShowLikeButtonSelected
    ] = useState<boolean>(
      likedBy.length > 0 && likedBy[0].action === "liked"
    );
    return (
      <View>
        <View
          style={[
            style.bottomBorder,
            { backgroundColor: theme.themedColors.interface["300"] },
            bottomLineStyle
          ]}
        />
        <View style={style.container}>
          <View style={style.leftRightContainer}>
            <View>
              <LikeButton
                shouldSelected={showShowLikeButtonSelected}
                onValueChanged={(isLiked: boolean) => {
                  likeDislikeAPi(postId).then((result) => {
                    _showShowLikeButtonSelected(!result ?? !isLiked);
                  });
                }}
              />
            </View>
            <View style={style.leftContainerRightSide}>
              <CommentButton onPress={openCommentsScreen} />
            </View>
          </View>
          <View style={style.leftRightContainer}>
            <View style={style.rightContainerLeftSide}>
              <View style={style.row}>
                <Like
                  width={10}
                  height={10}
                  fill={theme.themedColors.primary}
                  style={style.icon}
                />
                <AppLabel
                  text={likeCount.toString()}
                  style={[
                    { color: theme.themedColors.interface["700"] },
                    style.commentLikeCount
                  ]}
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
                  style={[
                    { color: theme.themedColors.interface["700"] },
                    style.commentLikeCount
                  ]}
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
    alignSelf: "center",
    marginTop: SPACE._2md
  },
  leftContainerRightSide: {
    marginLeft: SPACE.sm
  },
  rightContainerRightSide: {
    marginLeft: SPACE.sm
  },
  bottomBorder: {
    width: "100%",
    height: 0.5,
    marginTop: SPACE.md
  },
  rightContainerLeftSide: {
    marginRight: SPACE.sm
  },
  row: {
    flexDirection: "row"
    // marginRight: SPACE.sm
  },
  icon: {
    marginTop: 2,
    marginRight: SPACE.xs
  },
  commentLikeCount: {
    fontSize: FONT_SIZE.xs
  }
});
