import Shield from "assets/images/shield.svg";
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

export interface CommunityItemProps extends TouchableOpacityProps {
  communityItem: CommunityAnnouncement;
  openCommentsScreen?: (postId: number) => void;
  shouldPlayVideo: boolean;
  openReportContentScreen?: (postId: number) => void;
}

function showAttachedItemsIfAny(
  item: CommunityAnnouncement,
  shouldPlayVideo: boolean
) {
  if (item.link) {
    return (
      <WebViewComponent
        url={item.link}
        urlType={URL_TYPES.LINK}
        shouldPlayVideo={shouldPlayVideo}
      />
    );
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

export const CommunityItem = React.memo<CommunityItemProps>(
  ({
    communityItem,
    openCommentsScreen,
    shouldPlayVideo,
    openReportContentScreen
  }) => {
    const theme = usePreferredTheme();

    const rightImage: SvgProp = useCallback(() => {
      return (
        <Shield
          testID="right-icon"
          width={23}
          height={23}
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
            communityItem.postedByFirstName +
            " " +
            communityItem.postedByLastName
          }
          subTitle={new PrettyTimeFormat().getPrettyTime(
            (communityItem.updatedAt as unknown) as string
          )}
          leftImageUrl={communityItem.postedByProfilePicture?.fileURL}
          shouldShowRightImage={true}
          rightIcon={rightImage}
          onRightBtnClicked={() => {
            openReportContentScreen?.(communityItem.id);
          }}
        />

        {communityItem.content != null && true && (
          <AppLabel
            text={communityItem.content}
            style={[{ color: theme.themedColors.label }, style.text]}
            numberOfLines={0}
          />
        )}

        {showAttachedItemsIfAny(communityItem, shouldPlayVideo)}

        <AnnouncementFooter
          commentCount={communityItem.commentsCount}
          likeCount={communityItem.likesCount}
          openCommentsScreen={openCommentsScreen}
          isLikedByMe={communityItem.isLikedByMe}
          postId={communityItem.id}
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
