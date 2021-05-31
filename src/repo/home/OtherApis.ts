import { apiClient } from "repo/Client";
import { API } from "config";
import StaticContentRequestModel from "models/api_requests/StaticContentRequestModel";
import StaticContentResponseModel from "models/api_responses/StaticContentResponseModel";

function staticContent(request: StaticContentRequestModel) {
  return apiClient.get<StaticContentResponseModel>(
    API.GET_STATIC_CONTENT + request.type
  );
}

export default { staticContent };
