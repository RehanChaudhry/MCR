export type CommunityAnnouncementResponseModel = {
  message: string;
  data: CommunityAnnouncement[];
};

export type CommunityAnnouncement = {
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
