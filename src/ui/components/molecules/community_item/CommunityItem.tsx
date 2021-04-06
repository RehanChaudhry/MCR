import Shield from "assets/images/shield.svg";
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
import { shadowStyleProps, SvgProp } from "utils/Util";

export interface CommunityItemProps extends TouchableOpacityProps {
  communityItem: CommunityAnnouncement;
  openCommentsScreen?: () => void | undefined;
  shouldPlayVideo: boolean;
  openReportContentScreen?: () => void | undefined;
}

export const CommunityItem = React.memo<CommunityItemProps>(
  ({
    communityItem,
    openCommentsScreen,
    shouldPlayVideo,
    openReportContentScreen
  }) => {
    const theme = usePreferredTheme();
    const rightImage: SvgProp = () => {
      return (
        <Shield
          testID="right-icon"
          width={23}
          height={23}
          fill={theme.themedColors.interface["700"]}
        />
      );
    };
    return (
      <View
        style={[
          style.container,
          { backgroundColor: theme.themedColors.background }
        ]}>
        <AnnouncementHeader
          title={communityItem.name}
          subTitle={communityItem.time}
          leftImageUrl={communityItem.profileImageUrl}
          shouldShowRightImage={true}
          rightIcon={rightImage}
          onPress={openReportContentScreen}
        />
        {communityItem.text != null && true && (
          <AppLabel
            text={communityItem.text}
            style={[{ color: theme.themedColors.label }, style.text]}
            numberOfLines={0}
          />
        )}
        {communityItem.link != null && true && (
          <WebViewComponent
            url={communityItem.link}
            urlType={URL_TYPES.LINK}
            shouldPlayVideo={shouldPlayVideo}
          />
        )}
        {communityItem.embeddedUrl != null && true && (
          <WebViewComponent
            url={communityItem.embeddedUrl}
            urlType={URL_TYPES.EMBEDDED}
            shouldPlayVideo={shouldPlayVideo}
          />
        )}
        {communityItem.images != null &&
          true &&
          communityItem.images.length > 0 && (
            <ImagesSlideShow images={communityItem.images} />
          )}
        {communityItem.metaDataUrl != null && true && (
          <UrlMetaData url={communityItem.metaDataUrl} />
        )}
        <AnnouncementFooter
          commentCount={communityItem.commentCount}
          likeCount={communityItem.likeCount}
          openCommentsScreen={openCommentsScreen}
        />
      </View>
    );
  }
);

const style = StyleSheet.create({
  container: {
    borderRadius: 5,
    paddingRight: SPACE.md,
    paddingLeft: SPACE.md,
    paddingBottom: SPACE.md,
    ...shadowStyleProps
  },
  text: {
    lineHeight: 20,
    paddingTop: SPACE.lg,
    fontSize: FONT_SIZE.base
  }
});
