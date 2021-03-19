import { API } from "config";
import { CommunityAnnouncementResponseModel } from "models/api_responses/CommunityResponseModel";
import { apiClient } from "repo/Client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCommunity() {
  return apiClient.get<CommunityAnnouncementResponseModel>(
    API.GET_COMMUNITY
  );
}
