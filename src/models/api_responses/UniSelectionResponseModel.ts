export type UniSelectionResponseModel = {
  message: string;
  data: Uni[];
};

export type Uni = {
  id: string;
  name: string;
  location: string;
  logo: string;
};
