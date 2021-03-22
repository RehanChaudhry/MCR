import { API } from "config";
import { UniSelectionResponseModel } from "models/api_responses/UniSelectionResponseModel";
import { apiClient } from "repo/Client";

function getUnis() {
  return apiClient.get<UniSelectionResponseModel>(API.UNIS);
}

export default { getUnis };
