import React from "react";
import { StyleSheet, View } from "react-native";
import { AnnouncementItem } from "ui/components/molecules/AnnouncementItem";
import { CommunityAnnouncement } from "models/api_responses/CommunityAnnouncementResponseModel";
import useAuth from "hooks/useAuth";
import { SPACE } from "config";
import { AppLog } from "utils/Util";

type Props = {
  postData: CommunityAnnouncement;
  openCommentsScreen: (postId: number) => void;
  shouldPlayVideo: boolean;
  openReportContentScreen: (postId: number) => void;
  moveToProfileScreen: (userId: number) => void;
};

export const SinglePostView = React.memo<Props>(
  ({
    postData,
    openCommentsScreen,
    shouldPlayVideo,
    openReportContentScreen,
    moveToProfileScreen
  }) => {
    const auth = useAuth();

    AppLog.logForcefully(() => "siple post: " + JSON.stringify(postData));

    return (
      <View style={styles.container}>
        {postData && (
          <AnnouncementItem
            announcementItem={postData}
            openCommentsScreen={openCommentsScreen}
            shouldPlayVideo={shouldPlayVideo}
            openReportContentScreen={openReportContentScreen}
            shouldShowRightIcon={
              postData.postedBy !== auth.user?.profile?.id
            }
            onProfileImageClicked={moveToProfileScreen}
          />
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: SPACE.lg
  }
});
