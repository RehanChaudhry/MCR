export type SignInApiResponseModel = {
  message: string;
  data: Data;
};

export type Data = {
  accessToken: string;
  refreshToken: string;
  profile: Profile;
};

export type Profile = {
  id: number;
  name: string;
  email: string;
  profilePicture: {
    originalName: string;
    fileName: string;
    fileURL: string;
  };
};
