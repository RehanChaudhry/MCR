type ActivityLogApiRequestModel = {
  paginate: boolean;
  page: number;
  limit?: number;
  keyword: string | undefined;
  userType: string;
  actionType: string;
  startDate: string;
  endDate: string;
  attributes: string;
};

export default ActivityLogApiRequestModel;
