import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import { CommunityAnnouncement } from "models/api_responses/CommunityAnnouncementResponseModel";
import React from "react";
import { StyleSheet, TouchableOpacityProps, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import {
  URL_TYPES,
  WebViewComponent
} from "ui/components/atoms/webview/WebViewComponent";
import { AnnouncementFooter } from "ui/components/molecules/announcement_footer/AnnouncementFooter";
import { AnnouncementHeader } from "ui/components/molecules/announcement_header/AnnouncementHeader";
import { ImagesSlideShow } from "ui/components/molecules/image_slide_show/ImagesSlideShow";
import { UrlMetaData } from "ui/components/molecules/metadata/UrlMetaData";
import { shadowStyleProps } from "utils/Util";
import { PrettyTimeFormat } from "utils/PrettyTimeFormat";

export interface AnnouncementItemProps extends TouchableOpacityProps {
  announcementItem: CommunityAnnouncement;
  openCommentsScreen?: (postId: number) => void;
  shouldPlayVideo: boolean;
  likeDislikeAPi: (postId: number) => Promise<boolean>;
}

export const AnnouncementItem = React.memo<AnnouncementItemProps>(
  ({
    announcementItem,
    openCommentsScreen,
    shouldPlayVideo,
    likeDislikeAPi
  }) => {
    const theme = usePreferredTheme();

    return (
      <View
        style={[
          style.container,
          { backgroundColor: theme.themedColors.background }
        ]}>
        <AnnouncementHeader
          title={
            announcementItem.postedByFirstName +
            " " +
            announcementItem.postedByLastName
          }
          subTitle={new PrettyTimeFormat().getPrettyTime(
            (announcementItem.updatedAt as unknown) as string
          )}
          leftImageUrl={announcementItem.postedByProfilePicture.fileURL}
          shouldShowRightImage={false}
        />
        {announcementItem.content != null && true && (
          <AppLabel
            text={announcementItem.content}
            style={[{ color: theme.themedColors.label }, style.text]}
            numberOfLines={0}
          />
        )}
        {announcementItem.link != null && (
          <WebViewComponent
            url={announcementItem.link}
            urlType={URL_TYPES.LINK}
            shouldPlayVideo={shouldPlayVideo}
          />
        )}
        {announcementItem.embed != null && (
          <WebViewComponent
            url={announcementItem.embed!!}
            urlType={URL_TYPES.EMBEDDED}
            shouldPlayVideo={shouldPlayVideo}
          />
        )}
        {announcementItem.photos !== null &&
          announcementItem.photos.length > 0 && (
            <ImagesSlideShow images={announcementItem.photos} />
          )}
        {announcementItem.embed != null && (
          <UrlMetaData url={announcementItem.embed} />
        )}
        <AnnouncementFooter
          commentCount={announcementItem.commentsCount}
          likeCount={announcementItem.likesCount}
          openCommentsScreen={openCommentsScreen}
          likedBy={announcementItem.isLikedByMe}
          likeDislikeAPi={likeDislikeAPi}
          postId={announcementItem.id}
        />
      </View>
    );
  }
);

const style = StyleSheet.create({
  container: {
    borderRadius: 5,
    paddingRight: SPACE.lg,
    paddingLeft: SPACE.lg,
    paddingBottom: SPACE.lg,
    ...shadowStyleProps
  },
  text: {
    lineHeight: 24,
    paddingTop: SPACE.md,
    fontSize: FONT_SIZE.base
  }
});
