export type MatchInfoApiResponseModel = {
  message: string;
  data?: MatchInfoData;
};

export type MatchInfoData = {
  currentStatus?: string;
  deadline?: string;
  noOfRoommates?: string;
  criteria?: string;
};
