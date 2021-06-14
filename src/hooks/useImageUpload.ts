import * as ImagePicker from "react-native-image-picker";
import { ImagePickerResponse } from "react-native-image-picker";
import { AppLog } from "utils/Util";
import SimpleToast from "react-native-simple-toast";
import { S3ImageUploadRequest } from "models/api_requests/S3ImageUploadRequest";
import { useApi } from "repo/Client";
import { GenerateSignedUrlResponse } from "models/api_responses/GenerateSignedUrlResponse";
import OtherApis from "repo/home/OtherApis";
import { useCallback } from "react";
import MyImagePickerResponse from "models/api_responses/MyImagePickerResponse";

const S3_BUCKET_URL =
  "https://my-college-roomie-dev.s3.us-west-2.amazonaws.com/";

export const useImageUpload = () => {
  const createSignedUrl = useApi<string, GenerateSignedUrlResponse>(
    OtherApis.createSignedUrl
  );

  const uploadFileToS3 = useApi<S3ImageUploadRequest, any>(
    OtherApis.uploadFileToS3
  );

  const handleUploadFileToS3 = useCallback(
    async (request: S3ImageUploadRequest): Promise<boolean> => {
      const {
        hasError,
        dataBody,
        errorBody
      } = await uploadFileToS3.request([request]);

      if (hasError || dataBody === undefined) {
        SimpleToast.show("Image upload failed" + errorBody);
        return false;
      } else {
        AppLog.logForComplexMessages(
          () =>
            "Image successfully uploaded to s3 : " +
            JSON.stringify(dataBody)
        );
        return true;
      }
    },
    [uploadFileToS3]
  );

  const uploadImage = useCallback(
    async (image: ImagePickerResponse) => {
      AppLog.logForComplexMessages(() => "Your Signed Url : ");

      const { hasError, dataBody } = await createSignedUrl.request([
        image.fileName!!
      ]);

      if (hasError || dataBody === undefined) {
        SimpleToast.show("Image upload failed" + image.fileName!!);
        return false;
      } else {
        AppLog.logForComplexMessages(
          () => "Your Signed Url : " + JSON.stringify(dataBody)
        );
        return await handleUploadFileToS3({
          url: dataBody.url,
          data: image
        });
      }
    },
    [createSignedUrl, handleUploadFileToS3]
  );

  const openGallery = useCallback(
    (callback: (response: MyImagePickerResponse) => void) => {
      ImagePicker.launchImageLibrary(
        {
          mediaType: "photo",
          includeBase64: true,
          maxWidth: 500,
          maxHeight: 500
        },
        async (response) => {
          if (
            response !== null &&
            response !== undefined &&
            response.didCancel !== true
          ) {
            AppLog.logForComplexMessages(
              () =>
                "Image picker response : " +
                JSON.stringify(response.fileName)
            );

            //callback without uploading image to s3
            callback(
              new MyImagePickerResponse(
                response.uri,
                response.type!!,
                response.fileName!!,
                S3_BUCKET_URL + response.fileName,
                true,
                false
              )
            );
            const isSuccess = await uploadImage(response);

            //callback after uploading image to s3
            callback(
              new MyImagePickerResponse(
                response.uri,
                response.type!!,
                response.fileName!!,
                S3_BUCKET_URL + response.fileName,
                false,
                !isSuccess
              )
            );
          }
        }
      );
    },
    [uploadImage]
  );

  return openGallery;
};
