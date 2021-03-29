import { SPACE } from "config";
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

export interface AnnouncementItemProps extends TouchableOpacityProps {
  announcementItem: CommunityAnnouncement;
}

export const AnnouncementItem = React.memo<AnnouncementItemProps>(
  ({ announcementItem }) => {
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
          />
        )}
        {announcementItem.embeddedUrl != null && true && (
          <WebViewComponent
            url={announcementItem.embeddedUrl}
            urlType={URL_TYPES.EMBEDDED}
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
        />
      </View>
    );
  }
);

const style = StyleSheet.create({
  container: {
    marginRight: SPACE.md,
    marginLeft: SPACE.md,
    marginBottom: SPACE.md,
    borderRadius: 10,
    paddingRight: SPACE.lg,
    paddingLeft: SPACE.lg,
    paddingBottom: SPACE.lg
  },
  text: {
    lineHeight: 20,
    paddingTop: SPACE.lg
  }
});
