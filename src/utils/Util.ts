/* eslint-disable @typescript-eslint/no-unused-vars */
// A utility class

import { Constants, SPACE } from "config";
import Env from "envs/env";
import { Color, NumberProp } from "react-native-svg";
import React from "react";
import { ViewStyle } from "react-native";
import moment from "moment";
import SimpleToast from "react-native-simple-toast";

export function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const AppLog = (function () {
  return {
    log: (onComputeMessage: () => string, ...optionalParams: any[]) => {
      if (Constants.SHOULD_PRINT_LOGS) {
        // eslint-disable-next-line no-console
        console.log(onComputeMessage(), ...optionalParams);
      }
    },
    logForcefully: (
      onComputeMessage: () => string,
      ...optionalParams: any[]
    ) => {
      if (Env.CURRENT !== "PROD") {
        // eslint-disable-next-line no-console
        console.log(onComputeMessage(), ...optionalParams);
      }
    },
    toastDebug: (message?: any, ...optionalParams: any[]) => {
      if (Env.CURRENT !== "PROD") {
        // eslint-disable-next-line no-console
        console.warn(message, ...optionalParams);
        SimpleToast.show(message, SimpleToast.SHORT);
      }
    },
    warn: (message?: any, ...optionalParams: any[]) => {
      if (Constants.SHOULD_PRINT_LOGS) {
        // eslint-disable-next-line no-console
        console.warn(message, ...optionalParams);
      }
    },
    bug: (message?: any, ...optionalParams: any[]) => {
      if (Constants.SHOULD_PRINT_LOGS) {
        // eslint-disable-next-line no-console
        console.warn(message, ...optionalParams);
        // eslint-disable-next-line no-console
        console.error(message, ...optionalParams);
      }
    }
  };
})();

export const DateUtils = {
  diffInHours: (previousDate: Date, newDate: Date = new Date()) => {
    let d1: any = new Date(newDate);
    let d2: any = new Date(previousDate);
    let diff = Math.abs(d1 - d2);
    const hours = diff / (1000 * 60 * 60); //in milliseconds

    return parseInt(hours.toFixed(0));
  },

  getHoursDiff(date: Date): number {
    return DateUtils.diffInHours(date ?? new Date());
  }
};

const epochs: [string, number][] = [
  ["year", 31536000],
  ["month", 2592000],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1]
];

const between = (x: number, min: number, max: number) =>
  x >= min && x < max;

const getDuration: (
  timeAgoInSeconds: number
) => { interval: number; epoch: string } | undefined = (
  timeAgoInSeconds: number
) => {
  for (let [name, seconds] of epochs) {
    const interval = Math.floor(timeAgoInSeconds / seconds);
    if (interval >= 1) {
      return {
        interval: interval,
        epoch: name
      };
    }
  }
  return undefined;
};

export const timeAgo = (date: Date, minScale: string, format: string) => {
  const timeAgoInSeconds = Math.floor(
    (+new Date() - +new Date(date)) / 1000
  );
  if (between(timeAgoInSeconds, 0, 86400)) {
    const duration = getDuration(timeAgoInSeconds);
    const suffix = duration!.interval === 1 ? "" : "s";
    return `${duration!.interval} ${duration!.epoch}${suffix} ago`;
  } else {
    return moment(date).format(format);
  }
};

export enum TruncateEnum {
  SHORT = 11,
  MEDIUM = 15,
  LONG = 20
}
export const truncateString = function (
  textToTruncate: string,
  truncateLength: TruncateEnum
) {
  return textToTruncate.substring(0, truncateLength);
};

/***
 * @example parameterizedString("my name is %s1 and surname is %s2", "John", "Doe");
 * @return "my name is John and surname is Doe"
 *
 * @firstArgument {String} like "my name is %s1 and surname is %s2"
 * @otherArguments {String | Number}
 * @returns {String}
 */
export const parameterizedString = (...args: string[]) => {
  const str = args[0];
  const params = args.filter((arg: string, index: number) => index !== 0);
  if (!str) {
    return "";
  }
  return str.replace(/%s[0-9]+/g, (matchedStr: string) => {
    const variableIndex =
      Number.parseInt(matchedStr.replace("%s", "")) - 1;
    return params[variableIndex];
  });
};

export const capitalizeWords = (str: string) =>
  str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function delay<T, U, V>(t: T, v?: V) {
  return new Promise<U>(function (resolve) {
    setTimeout(resolve.bind(null), t);
  });
}

export const pattern = new RegExp(
  "^(http|https|ftp)://([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&amp;%$-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9-]+.)*[a-zA-Z0-9-]+.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(/($|[a-zA-Z0-9.,?'\\+&amp;%$#=~_-]+))*$"
);

export const iframePattern = new RegExp(
  "(?:<iframe[^>]*)(?:(?:\\/>)|(?:>.*?<\\/iframe>))"
);

export const loginRegx = new RegExp(
  "(?=.*[0-9])(?=.*[A-Z])[A-Za-z\\d]{8,}$"
);

export type SvgProp = (
  color?: Color,
  width?: NumberProp,
  height?: NumberProp
) => React.ReactElement;

export const shadowStyleProps: ViewStyle = {
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.3,
  shadowRadius: 2,
  elevation: 2
};

export const listItemSeparator: ViewStyle = {
  height: SPACE.lg
};

export const listContentContainerStyle: ViewStyle = {
  paddingVertical: SPACE.lg
};
