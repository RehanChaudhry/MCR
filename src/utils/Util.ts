// A utility class

import { Constants } from "config";
import { Color, NumberProp } from "react-native-svg";
import React from "react";
import { ViewStyle } from "react-native";

export const AppLog = (function () {
  return {
    log: (message?: any, ...optionalParams: any[]) => {
      if (Constants.SHOULD_PRINT_LOGS) {
        // eslint-disable-next-line no-console
        console.log(message, ...optionalParams);
      }
    },
    logForcefully: (message?: any, ...optionalParams: any[]) => {
      // eslint-disable-next-line no-console
      console.log(message, ...optionalParams);
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
