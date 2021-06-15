import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import { CommunityAnnouncement } from "models/api_responses/CommunityAnnouncementResponseModel";
import React, { useCallback } from "react";
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
import { shadowStyleProps, SvgProp } from "utils/Util";
import { PrettyTimeFormat } from "utils/PrettyTimeFormat";
import Shield from "assets/images/shield.svg";

export interface AnnouncementItemProps extends TouchableOpacityProps {
  announcementItem: CommunityAnnouncement;
  openCommentsScreen?: (postId: number) => void;
  shouldPlayVideo: boolean;
  shouldShowRightIcon?: boolean;
  openReportContentScreen?: (postId: number) => void;
  onProfileImageClicked?: () => void;
}

function showAttachedItemsIfAny(
  item: CommunityAnnouncement,
  shouldPlayVideo: boolean
) {
  if (item.link) {
    return <UrlMetaData url={item.link} />;
  } else if (item.embed) {
    return (
      <WebViewComponent
        url={item.embed}
        urlType={URL_TYPES.EMBEDDED}
        shouldPlayVideo={shouldPlayVideo}
      />
    );
  } else if (item.photos) {
    return <ImagesSlideShow images={item.photos} />;
  } else if (item.link) {
    return <UrlMetaData url={item.link} />;
  }
}

export const AnnouncementItem = React.memo<AnnouncementItemProps>(
  ({
    announcementItem,
    openCommentsScreen,
    shouldPlayVideo,
    shouldShowRightIcon = false,
    openReportContentScreen,
    onProfileImageClicked
  }) => {
    const theme = usePreferredTheme();

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
            (announcementItem.createdAt as unknown) as string
          )}
          leftImageUrl={announcementItem.postedByProfilePicture?.fileURL}
          shouldShowRightImage={shouldShowRightIcon}
          rightIcon={rightImage}
          onRightBtnClicked={() => {
            openReportContentScreen?.(announcementItem.id);
          }}
          onProfileImageClicked={onProfileImageClicked}
        />
        {announcementItem.content && (
          <AppLabel
            text={announcementItem.content}
            style={[{ color: theme.themedColors.label }, style.text]}
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
