import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Strings from "config/Strings";
import { FormikValues } from "formik";
import { usePreferredTheme, usePreventDoubleTap } from "hooks";
import CreatePostApiRequestModel, {
  Photo
} from "models/api_requests/CreatePostApiRequestModel";
import { CreatePostApiResponseModel } from "models/api_responses/CreatePostApiResponseModel";
import React, { FC, useLayoutEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { useApi } from "repo/Client";
import CommunityAnnouncementApis from "repo/home/CommunityAnnouncementApis";
import { CommunityStackParamList } from "routes/CommunityStack";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { CreatePostView } from "ui/screens/home/community/create_post/CreatePostView";
import MyImagePickerResponse from "models/api_responses/MyImagePickerResponse";

type CommunityNavigationProp = StackNavigationProp<
  CommunityStackParamList,
  "CreatePost"
>;

type CommunityRoutes = RouteProp<CommunityStackParamList, "CreatePost">;

type Props = {};

const CreatePostController: FC<Props> = () => {
  const navigation = useNavigation<CommunityNavigationProp>();
  const theme = usePreferredTheme();
  const [showProgressBar, setShowProgressBar] = useState<boolean>(false);
  const route = useRoute<CommunityRoutes>();

  useLayoutEffect(() => {
    navigation.setOptions({
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
  }, [navigation, theme]);

  const requestModel = useRef<CreatePostApiRequestModel>({
    type: "feed",
    content: "",
    everyone: true
  });

  const createPostApi = useApi<
    CreatePostApiRequestModel,
    CreatePostApiResponseModel
  >(CommunityAnnouncementApis.createPost);

  const handleCreatePost = usePreventDoubleTap(async () => {
    if (requestModel.current === undefined) {
      return;
    }
    setShowProgressBar(true);

    const { hasError, errorBody, dataBody } = await createPostApi.request([
      requestModel.current
    ]);

    setShowProgressBar(false);

    if (hasError || dataBody === undefined) {
      Alert.alert("Unable to create post", errorBody);
      return;
    } else {
      closeScreen();
    }
  });

  const onSubmit = (values: FormikValues) => {
    requestModel.current.content = values.message;
    requestModel.current.link =
      values.link !== "" ? values.link : undefined;
    requestModel.current.embed =
      values.embed !== "" ? values.embed : undefined;
    requestModel.current.photos = values.images.reduce(
      (newImage: Photo[], image: MyImagePickerResponse) => (
        newImage.push({
          fileURL: image.s3Url,
          originalName: image.fileName
        } as Photo),
        newImage
      ),
      []
    );

    handleCreatePost();
  };

  const closeScreen = usePreventDoubleTap(() => {
    navigation.goBack();
    route.params?.postCreatedSuccessfully?.();
  });

  return (
    <CreatePostView
      createPost={onSubmit}
      shouldShowProgressBar={showProgressBar}
    />
  );
};

export default CreatePostController;
