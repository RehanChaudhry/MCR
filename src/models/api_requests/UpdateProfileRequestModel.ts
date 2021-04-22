export type UpdateProfileRequestModel = {
  id?: number;
  profilePicture: {
    originalName: string;
    fileURL: string;
  };
  firstName: string;
  lastName: string;
  aboutMe: string;
  socialProfiles: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    snapchat: string;
    tiktok: string;
  };
  gender: string;
  dateOfBirth: string;
  homeTown: string;
  smokingHabbits: string;
  intendedMajor: string;
  intrests: string[];
  memberships: string[];
  shows: string[];
  music: string[];
  books: string[];
  games: string[];
  studentId: number;
  program: string;
  communities: string[];
  building: string;
  room: string;
  videoURL: string;
  sendEmail: boolean;
};
