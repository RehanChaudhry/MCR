type AnnouncementRequestModel = {
  paginate?: boolean;
  page?: number;
  limit: number;
  filterBy?: string;
  attributes?: string[];
  postedBy?: string;
  sortBy?: ESortBy;
  sortOrder?: ESortOrder;
  type?: string;
  keyword?: string;
  //startDate:
  //endDate:
  status?: string;
  isFlagged?: boolean;
};

export enum ESortOrder {
  ASC = "asc",
  DSC = "dsc"
}

export enum ESortBy {
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  DELETED_AT = "deletedAt"
}

export default AnnouncementRequestModel;
