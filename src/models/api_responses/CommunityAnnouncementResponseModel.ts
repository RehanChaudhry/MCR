export interface CommunityAnnouncementResponseModel {
  message: string;
  data: CommunityAnnouncement[];
}

export interface CommunityAnnouncement {
  popularityScore: number;
  id: number;
  type: string;
  content: string;
  link: null | string;
  photos: null;
  embed: null;
  postedBy: number;
  postedByFirstName: string;
  postedByLastName: string;
  postedByProfilePicture: PostedByProfilePicture;
  likesCount: number;
  commentsCount: number;
  isFlagged: null;
  everyone: number;
  specificFloorPlan: number;
  specificMatchGroup: number;
  specificGender: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  postFilter: PostFilter;
  isLikedByMe: IsLikedByMe[];
}

export interface PostFilter {
  filterType: string;
  filterId: null;
}

export interface PostedByProfilePicture {
  fileURL: string | undefined;
  originalName: string;
}

export interface IsLikedByMe {
  action: string;
}
