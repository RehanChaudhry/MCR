export type NotificationsResponseModel = {
  message: string;
  data: NotificationData;
};

export type NotificationData = {
  id: string;
  type: string;
  message: string;
  date: string;
};
