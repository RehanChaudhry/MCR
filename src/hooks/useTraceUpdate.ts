import { useEffect, useRef } from "react";
import { AppLog } from "utils/Util";

interface ObjectDict {
  [index: string]: any;
}

export default (props: any, key?: string) => {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce(
      (lookup: ObjectDict, [_key, value]) => {
        if (prev.current[_key] !== value) {
          lookup[_key] = [prev.current[_key], value];
        }
        return lookup;
      },
      {}
    );

    if (Object.keys(changedProps).length > 0) {
      const keys = Object.keys(changedProps);
      const values = Object.values(changedProps);

      AppLog.logForComplexMessages(() => "---------------------------");

      if (key !== undefined) {
        AppLog.logForComplexMessages(
          () => "Changed props of " + key + ": "
        );
      } else {
        AppLog.logForComplexMessages(() => "Changed props: ");
      }

      keys.map((item, index) => {
        AppLog.logForComplexMessages(() => item + " > " + values[index]);
      });

      AppLog.logForComplexMessages(() => "---------------------------");
    }

    prev.current = props;
  });
};
