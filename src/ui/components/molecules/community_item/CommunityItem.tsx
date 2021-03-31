import { SPACE } from "config";
import { usePreferredTheme } from "hooks";
import { CommunityAnnouncement } from "models/api_responses/CommunityAnnouncementResponseModel";
import React from "react";
import { StyleSheet, TouchableOpacityProps, View } from "react-native";
import SimpleToast from "react-native-simple-toast";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import {
  URL_TYPES,
  WebViewComponent
} from "ui/components/atoms/webview/WebViewComponent";
import { AnnouncementFooter } from "ui/components/molecules/announcement_footer/AnnouncementFooter";
import { AnnouncementHeader } from "ui/components/molecules/announcement_header/AnnouncementHeader";
import { ImagesSlideShow } from "ui/components/molecules/image_slide_show/ImagesSlideShow";
import { UrlMetaData } from "ui/components/molecules/metadata/UrlMetaData";
import { SvgProp } from "utils/Util";
import Shield from "assets/images/shield.svg";

export interface CommunityItemProps extends TouchableOpacityProps {
  communityItem: CommunityAnnouncement;
  openCommentsScreen?: () => void | undefined;
  shouldPlayVideo: boolean;
}

export const CommunityItem = React.memo<CommunityItemProps>(
  ({ communityItem, openCommentsScreen, shouldPlayVideo }) => {
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
          onPress={() => SimpleToast.show("Clicked on shield")}
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
