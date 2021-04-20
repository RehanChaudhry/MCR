type ActivityLogsResponseModel = {
  message: string;
  data: ActivityLog[];
};

type ActivityLog = {
  id: number;
  userId?: number;
  entityId?: string;
  type: string;
  action: string;
  user: User;
};

type User = {
  firstName: string;
  lastName: string;
  roleTitle: string;
  profilePicture: {
    fileURL: string;
    originalName: string;
  };
};

export default ActivityLogsResponseModel;
