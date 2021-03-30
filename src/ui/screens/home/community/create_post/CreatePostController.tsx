import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Check from "assets/images/check_circle.svg";
import Strings from "config/Strings";
import { usePreferredTheme, usePreventDoubleTap } from "hooks";
import { CreatePostApiRequestModel } from "models/api_requests/CreatePostApiRequestModel";
import { CreatePostApiResponseModel } from "models/api_responses/CreatePostApiResponseModel";
import React, { FC, useRef } from "react";
import { Alert } from "react-native";
import SimpleToast from "react-native-simple-toast";
import { useApi } from "repo/Client";
import CommunityAnnouncementApis from "repo/home/CommunityAnnouncementApis";
import { CommunityStackParamList } from "routes/CommunityStack";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { CreatePostView } from "ui/screens/home/community/create_post/CreatePostView";
import { AppLog } from "utils/Util";

type CommunityNavigationProp = StackNavigationProp<
  CommunityStackParamList,
  "CreatePost"
>;

type Props = {};

const CreatePostController: FC<Props> = () => {
  const requestModel = useRef<CreatePostApiRequestModel>();
  const navigation = useNavigation<CommunityNavigationProp>();
  const theme = usePreferredTheme();
  const createPostApi = useApi<
    CreatePostApiRequestModel,
    CreatePostApiResponseModel
  >(CommunityAnnouncementApis.createPost);

  navigation.setOptions({
    headerRight: () => (
      <HeaderRightTextWithIcon
        text={Strings.createPost.title.post}
        icon={() => {
          return (
            <Check
              width={15}
              height={15}
              fill={theme.themedColors.primary}
            />
          );
        }}
        onPress={() => {
          SimpleToast.show("Clicked on Post");
        }}
      />
    ),
    headerLeft: () => (
      <HeaderLeftTextWithIcon
        onPress={() => {
          navigation.pop();
        }}
      />
    ),
    headerTitleAlign: "center",
    headerTitle: () => (
      <HeaderTitle text={Strings.createPost.title.createPost} />
    )
  });

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
  const closeScreen = usePreventDoubleTap(() => {
    navigation.goBack();
  });
  return (
    <CreatePostView
      createPost={() => {
        closeScreen();
      }}
    />
  );
};

export default CreatePostController;
