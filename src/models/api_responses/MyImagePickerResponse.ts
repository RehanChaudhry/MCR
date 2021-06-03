class MyImagePickerResponse {
  uri: string | undefined;
  type: string;
  fileName: string;
  s3Url: string;
  inProgress: boolean;
  isFailed: boolean;

  constructor(
    uri: string | undefined,
    type: string,
    fileName: string,
    s3Url: string,
    isProgress: boolean,
    isFailed: boolean
  ) {
    this.uri = uri;
    this.type = type;
    this.fileName = fileName;
    this.s3Url = s3Url;
    this.inProgress = isProgress;
    this.isFailed = isFailed;
  }
}

export default MyImagePickerResponse;
