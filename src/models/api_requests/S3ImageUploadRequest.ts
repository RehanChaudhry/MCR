import { ImagePickerResponse } from "react-native-image-picker";

export type S3ImageUploadRequest = {
  url: string;
  data: ImagePickerResponse;
};
