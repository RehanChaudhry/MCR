import { STRINGS } from "config";
import { DateUtils } from "utils/Util";

export interface Section<T> {
  title: string;
  data: T[];
}

export interface ChronologicalObject {
  createdAt?: Date;
}

export function toSectionList<T extends ChronologicalObject>(list: T[]) {
  const sections: Section<T>[] = [];
  const recent: T[] = [],
    yesterday: T[] = [],
    older: T[] = [];

  list.forEach((value) => {
    const diffInHours = DateUtils.getHoursDiff(value.createdAt);
    if (diffInHours > 48) {
      older.push(value);
    } else if (diffInHours > 24) {
      yesterday.push(value);
    } else {
      recent.push(value);
    }
  });
  if (recent.length > 0) {
    sections.push({
      title: STRINGS.activity_log.label_recent,
      data: recent
    });
  }
  if (yesterday.length > 0) {
    sections.push({
      title: STRINGS.activity_log.label_yesterday,
      data: yesterday
    });
  }
  if (older.length > 0) {
    sections.push({
      title: STRINGS.activity_log.label_older,
      data: older
    });
  }
  return sections;
}
