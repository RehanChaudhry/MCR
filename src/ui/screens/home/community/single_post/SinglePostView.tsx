import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FeedPostItem } from "ui/components/molecules/FeedPostItem";
import { PostFeed } from "models/api_responses/FetchPostFeedListResponseModel";
import useAuth from "hooks/useAuth";
import { SPACE } from "config";

type Props = {
  postData: PostFeed;
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

    return (
      <ScrollView>
        <View style={styles.container}>
          {postData && (
            <FeedPostItem
              data={postData}
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
      </ScrollView>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: SPACE.lg
  }
});
