import { usePreventDoubleTap } from "hooks";
import { CreatePostApiRequestModel } from "models/api_requests/CreatePostApiRequestModel";
import { CreatePostApiResponseModel } from "models/api_responses/CreatePostApiResponseModel";
import React, { FC, useRef } from "react";
import { Alert } from "react-native";
import { useApi } from "repo/Client";
import CommunityAnnouncementApis from "repo/home/CommunityAnnouncementApis";
import { CreatePostView } from "ui/screens/home/community/create_post/CreatePostView";
import { AppLog } from "utils/Util";

type Props = {};

const CreatePostController: FC<Props> = () => {
  const requestModel = useRef<CreatePostApiRequestModel>();
  const createPostApi = useApi<
    CreatePostApiRequestModel,
    CreatePostApiResponseModel
  >(CommunityAnnouncementApis.createPost);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCreatePost = usePreventDoubleTap(async () => {
    if (requestModel.current === undefined) {
      return;
    }
    AppLog.log("handleSignIn: ");
    const { hasError, errorBody, dataBody } = await createPostApi.request([
      requestModel.current
    ]);
    if (hasError || dataBody === undefined) {
      Alert.alert("Unable to Sign In", errorBody);
      return;
    } else {
    }
  });
  return <CreatePostView />;
};

export default CreatePostController;
