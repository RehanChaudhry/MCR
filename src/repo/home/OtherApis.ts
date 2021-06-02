import { apiClient } from "repo/Client";
import { API } from "config";
import StaticContentRequestModel from "models/api_requests/StaticContentRequestModel";
import StaticContentResponseModel from "models/api_responses/StaticContentResponseModel";
import { GenerateSignedUrlResponse } from "models/api_responses/GenerateSignedUrlResponse";
import { S3ImageUploadRequest } from "models/api_requests/S3ImageUploadRequest";
import { create } from "apisauce";
import { decode } from "base64-arraybuffer";

const s3Client = create({ baseURL: "" });

function staticContent(request: StaticContentRequestModel) {
  return apiClient.get<StaticContentResponseModel>(
    API.GET_STATIC_CONTENT + request.type
  );
}

function createSignedUrl(filename: string) {
  const headers = {
    "x-amz-meta-filekey": filename
  };

  return apiClient.get<GenerateSignedUrlResponse>(API.GET_SIGNED_URL, [], {
    headers: headers
  });
}

async function uploadFileToS3(request: S3ImageUploadRequest) {
  const headers = {
    Accept: "multipart/form-data",
    "Content-Type": "image"
  };

  const arrayBuffer = decode(request.data.base64!!);
  return s3Client.put<any>(request.url, arrayBuffer, {
    headers: headers
  });
}

export default { staticContent, createSignedUrl, uploadFileToS3 };
