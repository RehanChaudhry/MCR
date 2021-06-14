import moment from "moment";
import prettyMilliseconds from "pretty-ms";

export class PrettyTimeFormat {
  minutesAgoText: string = "";
  secondsAgoText: string = "";
  yearsAgoText: string = "";
  daysAgoText = "";
  hoursAgoText = "";

  constructor(
    minutesAgoText: string = " min ago",
    secondsAgoText: string = "s ago",
    yearsAgoText: string = "y ago",
    daysAgoText: string = "d ago",
    hoursAgoText: string = "h ago"
  ) {
    this.minutesAgoText = minutesAgoText;
    this.secondsAgoText = secondsAgoText;
    this.yearsAgoText = yearsAgoText;
    this.daysAgoText = daysAgoText;
    this.hoursAgoText = hoursAgoText;
  }

  getPrettyTime(date: string, compact: boolean = true): string {
    let millis = new Date().getTime() - moment(date).valueOf();
    let prettyTime = prettyMilliseconds(millis, { compact: compact });

    /* AppLog.logForComplexMessages(
      () =>
      "pretty date is : " + prettyTime + " and original date is : " + date
    );*/

    if (prettyTime[prettyTime.length - 1] === "y") {
      prettyTime = prettyTime.replace(/.$/, this.yearsAgoText);
    } else if (prettyTime[prettyTime.length - 1] === "d") {
      prettyTime = prettyTime.replace(/.$/, this.daysAgoText);
    } else if (prettyTime[prettyTime.length - 1] === "h") {
      prettyTime = prettyTime.replace(/.$/, this.hoursAgoText);
    } else if (prettyTime[prettyTime.length - 1] === "m") {
      prettyTime = prettyTime.replace(/.$/, this.minutesAgoText);
    } else if (prettyTime.slice(-2) === "ms") {
      prettyTime = "Just Now";
    } else if (prettyTime[prettyTime.length - 1] === "s") {
      prettyTime = prettyTime.replace(/.$/, this.secondsAgoText);
    }

    return prettyTime;
  }

  isOneDayAgo(date: string, compact: boolean = true): boolean {
    let millis = new Date().getTime() - moment(date).valueOf();
    let prettyTime = prettyMilliseconds(millis, { compact: compact });
    return prettyTime[prettyTime.length - 1] === "d";
  }
}
