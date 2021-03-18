export type CommunityResponseModel = {
  message: string;
  data: CommunityData[];
};

export type CommunityData = {
  id: number;
  profileImageUrl: string;
  name: string;
  time: string;
  text?: string | null;
  images?: string[] | null;
  link?: string | null;
  embeddedUrl?: string | null;
  likeCount: number;
  commentCount: number;
  metaDataUrl?: string;
};
