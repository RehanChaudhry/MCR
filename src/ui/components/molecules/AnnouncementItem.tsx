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

export interface AnnouncementItemProps extends TouchableOpacityProps {
  announcementItem: CommunityAnnouncement;
  openCommentsScreen?: () => void | undefined;
  shouldPlayVideo: boolean;
}

export const AnnouncementItem = React.memo<AnnouncementItemProps>(
  ({ announcementItem, openCommentsScreen, shouldPlayVideo }) => {
    const theme = usePreferredTheme();
    return (
      <View
        style={[
          style.container,
          { backgroundColor: theme.themedColors.background }
        ]}>
        <AnnouncementHeader
          title={announcementItem.name}
          subTitle={announcementItem.time}
          leftImageUrl={announcementItem.profileImageUrl}
          shouldShowRightImage={false}
        />
        {announcementItem.text != null && true && (
          <AppLabel
            text={announcementItem.text}
            style={[{ color: theme.themedColors.label }, style.text]}
            numberOfLines={0}
          />
        )}
        {announcementItem.link != null && true && (
          <WebViewComponent
            url={announcementItem.link}
            urlType={URL_TYPES.LINK}
            shouldPlayVideo={shouldPlayVideo}
          />
        )}
        {announcementItem.embeddedUrl != null && true && (
          <WebViewComponent
            url={announcementItem.embeddedUrl}
            urlType={URL_TYPES.EMBEDDED}
            shouldPlayVideo={shouldPlayVideo}
          />
        )}
        {announcementItem.images != null &&
          true &&
          announcementItem.images.length > 0 && (
            <ImagesSlideShow images={announcementItem.images} />
          )}
        {announcementItem.metaDataUrl != null && true && (
          <UrlMetaData url={announcementItem.metaDataUrl} />
        )}
        <AnnouncementFooter
          commentCount={announcementItem.commentCount}
          likeCount={announcementItem.likeCount}
          openCommentsScreen={openCommentsScreen}
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
