export interface CommentsResponseModel {
  message: string;
  data: Comment[];
}

export interface Comment {
  id: number;
  userId: number;
  postId: number;
  comment: string;
  createdAt: Date;
  deletedAt: null;
  user: User;
}

export interface User {
  firstName: string;
  lastName: string;
  profilePicture: ProfilePicture;
}

export interface ProfilePicture {
  fileURL: string;
  originalName: string;
}