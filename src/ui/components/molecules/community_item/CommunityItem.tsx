import { SPACE } from "config";
import { usePreferredTheme } from "hooks";
import { CommunityData } from "models/api_responses/CommunityResponseModel";
import React from "react";
import { StyleSheet, TouchableOpacityProps, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { WebViewComponent } from "ui/components/atoms/webview/WebViewComponent";
import { AnnouncementFooter } from "ui/components/molecules/announcement_footer/AnnouncementFooter";
import { AnnouncementHeader } from "ui/components/molecules/announcement_header/AnnouncementHeader";
import { ImagesSlideShow } from "ui/components/molecules/image_slide_show/ImagesSlideShow";

export interface CommunityItemProps extends TouchableOpacityProps {
  communityItem: CommunityData;
}

export const CommunityItem = React.memo<CommunityItemProps>(
  ({ communityItem }) => {
    const theme = usePreferredTheme();
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
        />
        {communityItem.text != null && true && (
          <AppLabel
            text={communityItem.text}
            style={[{ color: theme.themedColors.label }, style.text]}
            numberOfLines={0}
          />
        )}
        {communityItem.videoUrl != null && true && (
          <WebViewComponent url={communityItem.videoUrl} />
        )}
        {communityItem.images != null &&
          true &&
          communityItem.images.length > 0 && (
            <ImagesSlideShow images={communityItem.images} />
          )}
        <AnnouncementFooter
          commentCount={communityItem.commentCount}
          likeCount={communityItem.likeCount}
        />
      </View>
    );
  }
);

const style = StyleSheet.create({
  container: {
    margin: SPACE.md,
    borderRadius: 10,
    padding: SPACE.md
  },
  text: {
    lineHeight: 20
  }
});
