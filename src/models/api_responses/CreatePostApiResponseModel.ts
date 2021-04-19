export interface Photo {
  fileURL: string;
  originalName: string;
}

export interface PostedByProfilePicture {
  fileURL: string;
  originalName: string;
}

export interface Post {
  popularityScore: number;
  likesCount: number;
  commentsCount: number;
  id: number;
  content: string;
  link: string;
  photos: Photo[];
  embed: string;
  type: string;
  isFlagged: boolean;
  everyone?: any;
  postedBy: number;
  postedByFirstName: string;
  postedByLastName: string;
  postedByProfilePicture: PostedByProfilePicture;
  updatedAt: Date;
  createdAt: Date;
}

export interface CreatePostApiResponseModel {
  message: string;
  data: Post;
}

export default CreatePostApiResponseModel;
