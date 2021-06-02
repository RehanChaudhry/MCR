import NotificationData from "models/NotificationData";

export type NotificationsResponseModel = {
  message: string;
  data: NotificationData[];
};
