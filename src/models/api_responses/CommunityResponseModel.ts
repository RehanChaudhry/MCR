export type CommunityResponseModel = {
  message: string;
  data: CommunityData[];
};

export type CommunityData = {
  profileImageUrl: string;
  name: string;
  time: string;
  text?: string | null;
  images?: string[] | null;
  videoUrl?: string | null;
};
