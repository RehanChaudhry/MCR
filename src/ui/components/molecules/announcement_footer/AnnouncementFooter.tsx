import Chat from "assets/images/chat.svg";
import Like from "assets/images/like.svg";
import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import { LikeDislikeResponseModel } from "models/api_responses/LikeDislikeResponseModel";
import React, { useCallback, useState } from "react";
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
  View,
  ViewStyle
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SimpleToast from "react-native-simple-toast";
import { useApi } from "repo/Client";
import CommunityAnnouncementApis from "repo/home/CommunityAnnouncementApis";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { CommentButton } from "ui/components/atoms/compact_buttons/CommentButton";
import { LikeButton } from "ui/components/atoms/compact_buttons/LikeButton";
import { AppLog } from "utils/Util";

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
  openCommentsScreen?: (postId: number) => void | undefined;
  isLikedByMe: boolean;
  postId: number;

  likeButtonCallback(postId: number): void;
}

export const AnnouncementFooter = React.memo<AnnouncementFooterProps>(
  ({
    likeCount = 0,
    commentCount = 0,
    bottomLineStyle,
    openCommentsScreen,
    isLikedByMe,
    postId,
    likeButtonCallback
  }) => {
    const theme = usePreferredTheme();

    let [isLikeButtonSelected, setLikeButtonSelected] = useState<boolean>(
      isLikedByMe
    );

    const [likedCount, setLikedCount] = useState(likeCount);

    const toggleLikedStateApi = useApi<number, LikeDislikeResponseModel>(
      CommunityAnnouncementApis.likeDislike
    );

    const toggleLikedState = useCallback(
      async (_postId: number) => {
        AppLog.logForcefully(() => "like dislike api : " + _postId);

        const { hasError, dataBody } = await toggleLikedStateApi.request([
          _postId
        ]);

        if (hasError || dataBody === undefined) {
          SimpleToast.show(
            "Unable to perform action. Please try again later",
            SimpleToast.SHORT
          );
          return false;
        } else {
          setLikedCount(dataBody.data.likesCount);
          return true;
        }
      },
      [toggleLikedStateApi]
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
                shouldSelected={isLikeButtonSelected}
                onValueChanged={(isLiked: boolean) => {
                  toggleLikedState(postId).then((result) => {
                    setLikeButtonSelected(!result ?? !isLiked);
                  });
                }}
              />
            </View>
            <View style={style.leftContainerRightSide}>
              <CommentButton
                onPress={() => {
                  AppLog.logForcefully(() => "comment Button called");
                  openCommentsScreen?.(postId);
                }}
              />
            </View>
          </View>
          <View style={style.leftRightContainer}>
            <View style={style.rightContainerLeftSide}>
              <TouchableOpacity onPress={() => likeButtonCallback(postId)}>
                <View style={style.row}>
                  <Like
                    width={10}
                    height={10}
                    fill={theme.themedColors.primary}
                    style={style.icon}
                  />
                  <AppLabel
                    text={likedCount.toString()}
                    style={[
                      { color: theme.themedColors.interface["700"] },
                      style.commentLikeCount
                    ]}
                  />
                </View>
              </TouchableOpacity>
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
    marginTop: 4,
    marginRight: SPACE.xs
  },
  commentLikeCount: {
    fontSize: FONT_SIZE.sm
  }
});
