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
  deletedAt?: null;
  user: User;

  //for manual handle new comment
  isLoading?: boolean;
  isError?: boolean;
  retry?: (postId: number) => void;
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
