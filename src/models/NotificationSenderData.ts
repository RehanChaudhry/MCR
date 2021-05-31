export class NotificationSenderData {
  firstName?: string;
  lastName?: string;
  profilePicture?: string;

  constructor(notificationSenderData: NotificationSenderData) {
    Object.assign(this, notificationSenderData);
  }

  fullName = () => {
    return this.firstName + " " + this.lastName;
  };
}

export default NotificationSenderData;
