export class NotificationSenderData {
  firstName?: string;
  lastName?: string;
  profilePicture?: ProfilePicture;

  constructor(notificationSenderData: NotificationSenderData) {
    Object.assign(this, notificationSenderData);
  }

  fullName = () => {
    return this.firstName + " " + this.lastName;
  };
}

export type ProfilePicture = {
  fileURL: string;
  originalName: string;
};

export default NotificationSenderData;
