type ActivityLogApiRequestModel = {
  paginate?: boolean;
  page?: number;
  limit?: number;
  keyword?: string | undefined;
  userType?: string;
  actionType?: string;
  attributes?: string;
};

export default ActivityLogApiRequestModel;
