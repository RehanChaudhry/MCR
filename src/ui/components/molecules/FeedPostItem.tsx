import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import {
  PostFeed,
  PostFeed as FeedData,
  toDisplayName
} from "models/api_responses/FetchPostFeedListResponseModel";
import React, { useCallback, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacityProps,
  View
} from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { WebViewComponent } from "ui/components/atoms/webview/WebViewComponent";
import { AnnouncementFooter } from "ui/components/molecules/announcement_footer/AnnouncementFooter";
import { AnnouncementHeader } from "ui/components/molecules/announcement_header/AnnouncementHeader";
import { ImagesSlideShow } from "ui/components/molecules/image_slide_show/ImagesSlideShow";
import { UrlMetaData } from "ui/components/molecules/metadata/UrlMetaData";
import { shadowStyleProps, SvgProp } from "utils/Util";
import { PrettyTimeFormat } from "utils/PrettyTimeFormat";
import Shield from "assets/images/shield.svg";
import Trash from "assets/images/trash.svg";
import SimpleToast from "react-native-simple-toast";
import PencilAlt from "assets/images/pencil_alt.svg";
import DeletePostAlert from "ui/screens/home/community/single_post/DeletePostAlert";
import useDeletePost from "ui/screens/home/friends/useDeletePost";

export interface FeedPostItemProps extends TouchableOpacityProps {
  data: FeedData;
  openCommentsScreen?: (postId: number) => void;
  shouldPlayVideo: boolean;
  shouldShowRightIcon?: boolean;
  openReportContentScreen?: (postId: number) => void;
  onProfileImageClicked?: (userId: number, name: string) => void;
  likeButtonCallback: (postId: number) => void;
  shouldShowTwoButtonsRight?: boolean;
  onDeleteBtnActionPress?: () => void;
  removePostFromList?: (postId: number) => void;
  moveToEditPostScreen?: (postFeed: PostFeed) => void;
  itemHeightMap: number[];
  index: number;
}

function showAttachedItemsIfAny(item: FeedData, shouldPlayVideo: boolean) {
  if (item.link) {
    return <UrlMetaData url={item.link} />;
  } else if (item.embed) {
    return (
      <WebViewComponent
        url={item.embed}
        shouldPlayVideo={shouldPlayVideo}
      />
    );
  } else if (item?.photos?.length! > 0) {
    if (item?.photos?.length === 1) {
      return (
        <Image
          source={{
            uri: item.photos[0].fileURL
          }}
          style={style.image}
        />
      );
    }
    return <ImagesSlideShow images={item.photos!} />;
  }
}

export const FeedPostItem = React.memo<FeedPostItemProps>(
  ({
    data: announcementItem,
    openCommentsScreen,
    shouldPlayVideo,
    shouldShowRightIcon = false,
    openReportContentScreen,
    onProfileImageClicked,
    likeButtonCallback,
    shouldShowTwoButtonsRight,
    removePostFromList,
    moveToEditPostScreen
  }) => {
    const theme = usePreferredTheme();
    const [deletePostPopup, setDeletePostPopUp] = useState(false);

    const { shouldShowPb, deletePost } = useDeletePost(
      "Unable to leave group",
      () => {
        setDeletePostPopUp(false);
      },
      () => {
        removePostFromList?.(announcementItem.id);
      }
    );
    const rightImage: SvgProp = useCallback(() => {
      return (
        <Shield
          testID="right-icon"
          width={30}
          height={30}
          fill={theme.themedColors.interface["700"]}
        />
      );
    }, [theme.themedColors]);

    const onImageClicked = () => {
      if (announcementItem.roleTitle !== "Admin") {
        onProfileImageClicked?.(
          announcementItem!.postedBy!,
          `${announcementItem.postedByFirstName} ${announcementItem.postedByLastName}`
        );
      } else {
        SimpleToast.show(
          "This user's information is not publicly available."
        );
      }
    };

    return (
      <>
        <View
          //onLayout={(event) => {
          // let { height } = event.nativeEvent.layout;
          // if (height) {
          //   itemHeightMap[index] = height;
          //   AppLog.logForcefully(
          //     () => "height map is : " + JSON.stringify(itemHeightMap)
          //   );
          // }
          //}}
          style={[
            style.container,
            { backgroundColor: theme.themedColors.background }
          ]}>
          <AnnouncementHeader
            title={toDisplayName(
              announcementItem.postedByFirstName,
              announcementItem.postedByLastName
            )}
            subTitle={new PrettyTimeFormat().getPrettyTime(
              (announcementItem.createdAt as unknown) as string
            )}
            leftImageUrl={announcementItem.postedByProfilePicture?.fileURL}
            shouldShowRightImage={shouldShowRightIcon}
            rightIcon={rightImage}
            onRightBtnClicked={() => {
              openReportContentScreen?.(announcementItem.id);
            }}
            onProfileImageClicked={onImageClicked}
            onUserNameClicked={onImageClicked}
            shouldShowTwoButtonsRight={shouldShowTwoButtonsRight}
            onDeleteBtnActionPress={() => setDeletePostPopUp(true)}
            onEditBtnActionPress={() =>
              moveToEditPostScreen?.(announcementItem)
            }
            rightButtonIcon={() => (
              <Trash
                width={30}
                height={30}
                fill={theme.themedColors.interface["700"]}
              />
            )}
            leftButtonIcon={() => (
              <PencilAlt
                width={30}
                height={30}
                fill={theme.themedColors.interface["700"]}
              />
            )}
          />
          {announcementItem.content !== "" && (
            <AppLabel
              text={announcementItem.content}
              style={style.text}
              numberOfLines={0}
            />
          )}
          {showAttachedItemsIfAny(announcementItem, shouldPlayVideo)}
          <AnnouncementFooter
            commentCount={announcementItem.commentsCount}
            likeCount={announcementItem.likesCount}
            openCommentsScreen={openCommentsScreen}
            isLikedByMe={announcementItem.isLikedByMe}
            postId={announcementItem.id}
            likeButtonCallback={likeButtonCallback}
          />
        </View>
        <DeletePostAlert
          shouldShow={deletePostPopup}
          shouldShowPb={shouldShowPb}
          hideDialogue={() => setDeletePostPopUp(false)}
          title="Delete Post"
          message={"Are you sure you want to delete this post?"}
          deleteActionPress={() => deletePost(announcementItem.id)}
        />
      </>
    );
  }
);

const style = StyleSheet.create({
  container: {
    borderRadius: 5,
    paddingRight: SPACE.lg,
    paddingLeft: SPACE.lg,
    paddingBottom: SPACE.lg,
    // flex: 1,
    ...shadowStyleProps
  },
  text: {
    lineHeight: 24,
    paddingTop: SPACE.md,
    fontSize: FONT_SIZE.base
  },
  image: {
    borderRadius: 12,
    width: "100%",
    height: 300,
    marginTop: SPACE.md
  }
});
