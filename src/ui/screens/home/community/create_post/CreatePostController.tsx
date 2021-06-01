import { useNavigation } from "@react-navigation/native";
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
import { AppLog } from "utils/Util";
import { ImagePickerResponse } from "react-native-image-picker";
import OtherApis from "repo/home/OtherApis";
import { GenerateSignedUrlResponse } from "models/api_responses/GenerateSignedUrlResponse";
import SimpleToast from "react-native-simple-toast";
import _ from "lodash";
import { S3ImageUploadRequest } from "models/api_requests/S3ImageUploadRequest";
import { Constants } from "config";

type CommunityNavigationProp = StackNavigationProp<
  CommunityStackParamList,
  "CreatePost"
>;

type Props = {};

const CreatePostController: FC<Props> = () => {
  const navigation = useNavigation<CommunityNavigationProp>();
  const theme = usePreferredTheme();
  const [showProgressBar, setShowProgressBar] = useState<boolean>(false);
  const signedUrls = useRef<string[]>([]);

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

  const createSignedUrl = useApi<string, GenerateSignedUrlResponse>(
    OtherApis.createSignedUrl
  );

  const uploadFileToS3 = useApi<S3ImageUploadRequest, any>(
    OtherApis.uploadFileToS3
  );

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

  const createSignedUrlApi = async (image: ImagePickerResponse) => {
    const { hasError, dataBody } = await createSignedUrl.request([
      image.fileName!!
    ]);

    if (hasError || dataBody === undefined) {
      SimpleToast.show("file upload failed: " + image.fileName!!);
      return;
    } else {
      AppLog.log("Your Signed Url : " + JSON.stringify(dataBody));
      signedUrls.current.push(image.fileName!!);
      await handleUploadFileToS3({ url: dataBody.url, data: image });
    }
  };

  const handleUploadFileToS3 = async (request: S3ImageUploadRequest) => {
    AppLog.log("in handleUploadFileToS3()..." + JSON.stringify(request));
    const {
      hasError,
      dataBody,
      errorBody
    } = await uploadFileToS3.request([request]);

    if (hasError || dataBody === undefined) {
      SimpleToast.show("S3 image upload failed" + errorBody);
      return;
    } else {
      AppLog.logForcefully(
        "Image successfully uploaded to s3 : " + JSON.stringify(dataBody)
      );
    }
  };

  const onSubmit = (values: FormikValues) => {
    requestModel.current.content = values.message;
    requestModel.current.link =
      values.link !== "" ? values.link : undefined;
    requestModel.current.embed =
      values.embed !== "" ? values.embed : undefined;
    requestModel.current.photos = signedUrls.current.reduce(
      (newImage: Photo[], image: string) => (
        newImage.push({
          fileURL: Constants.S3_BUCKET_URL + image,
          originalName: image
        } as Photo),
        newImage
      ),
      []
    );

    AppLog.logForcefully(
      "create post request : " + JSON.stringify(values.images)
    );
    handleCreatePost();
  };

  const closeScreen = usePreventDoubleTap(() => {
    navigation.goBack();
  });

  const removeSignedImageUrl = (filename: string, removeAll: boolean) => {
    removeAll
      ? (signedUrls.current = [])
      : (signedUrls.current = _.reject(signedUrls.current, (item) =>
          item.includes(filename)
        ));

    AppLog.log(
      "signed urls after removing file name : " +
        JSON.stringify(signedUrls.current)
    );
  };

  return (
    <CreatePostView
      createPost={onSubmit}
      shouldShowProgressBar={showProgressBar}
      createSignedUrl={createSignedUrlApi}
      removeSignedImageUrl={removeSignedImageUrl}
    />
  );
};

export default CreatePostController;
