import { STRINGS } from "config";
import ActivityLog from "models/ActivityLog";

export interface ActivityLogSection {
  title: string;
  data: ActivityLog[];
}

export const toSectionList = (activityLogs: ActivityLog[]) => {
  const activityLogSections: ActivityLogSection[] = [];
  const recent: ActivityLog[] = [],
    yesterday: ActivityLog[] = [],
    older: ActivityLog[] = [];

  activityLogs.forEach((_value) => {
    const value = new ActivityLog(_value);
    const diffInHours = value.getHoursDiff();
    if (diffInHours > 48) {
      older.push(value);
    } else if (diffInHours > 24) {
      yesterday.push(value);
    } else {
      recent.push(value);
    }
  });
  if (recent.length > 0) {
    activityLogSections.push({
      title: STRINGS.activity_log.label_recent,
      data: recent
    });
  }
  if (yesterday.length > 0) {
    activityLogSections.push({
      title: STRINGS.activity_log.label_yesterday,
      data: yesterday
    });
  }
  if (older.length > 0) {
    activityLogSections.push({
      title: STRINGS.activity_log.label_older,
      data: older
    });
  }
  return activityLogSections;
};
