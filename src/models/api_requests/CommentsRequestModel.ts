type CommentsRequestModel = {
  postId: number;
  paginate?: boolean;
  page?: number;
  limit: number;
  attributes?: string[];
  postedBy?: string;
};

export default CommentsRequestModel;
