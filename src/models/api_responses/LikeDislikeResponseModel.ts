export type LikeDislikeResponseModel = {
  message: string;
  data: LikeDislike;
};

export type LikeDislike = {
  isLikedByMe: boolean;
  id: number;
};
