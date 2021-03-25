export type MyRoommatesResponseModel = {
  message: string;
  data: MyRoomate[];
};

export type MyRoomate = {
  id: string;
  title: string;
  subtitle: string;
  profileImage: string;
};
