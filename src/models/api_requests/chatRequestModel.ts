type ChatRequestModel = {
  paginate?: boolean;
  page?: number;
  limit: number;
  attributes?: string[];
  postedBy?: string;
  orderBy?: ESortBy;
  order?: ESortOrder;
  keyword?: string;
};

export enum ESortOrder {
  ASC = "asc",
  DSC = "desc"
}

export enum ESortBy {
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  DELETED_AT = "deletedAt"
}

export default ChatRequestModel;
