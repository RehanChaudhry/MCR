import { API } from "config";
import { PaginationParamsModel } from "models/api_requests/PaginationParamsModel";
import { DismissedOrBlockedResponseModel } from "models/api_responses/DismissedOrBlockedResponseModel";
import { PendingRequestsResponseModel } from "models/api_responses/PendingRequestsResponseModel";
import RelationApiResponseModel from "models/api_responses/RelationApiResponseModel";
import RelationFilterType from "models/enums/RelationFilterType";
import { apiClient } from "repo/Client";

function getRelations(request: PaginationParamsModel) {
  return apiClient.get<RelationApiResponseModel>(
    API.RELATION +
      (request.type === RelationFilterType.MATCHES ? API.MATCHES : ""),
    {
      ...request
    }
  );
}

function getDismissedOrBlocked() {
  return apiClient.get<DismissedOrBlockedResponseModel>(
    API.DISMISSED_OR_BLOCKED
  );
}

function getFriendsRequests(requestModel: PaginationParamsModel) {
  return apiClient.get<PendingRequestsResponseModel>(API.FRIEND_REQUESTS, {
    ...requestModel
  });
}

function getRoommateRequests(requestModel: PaginationParamsModel) {
  return apiClient.get<PendingRequestsResponseModel>(
    API.ROOMMATE_REQUESTS,
    {
      ...requestModel
    }
  );
}

export default {
  getRelations,
  getDismissedOrBlocked,
  getFriendsRequests,
  getRoommateRequests
};
