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

      AppLog.log("---------------------------");

      if (key !== undefined) {
        AppLog.log("Changed props of " + key + ": ");
      } else {
        AppLog.log("Changed props: ");
      }

      keys.map((item, index) => {
        AppLog.log(item + " > " + values[index]);
      });

      AppLog.log("---------------------------");
    }

    prev.current = props;
  });
};
