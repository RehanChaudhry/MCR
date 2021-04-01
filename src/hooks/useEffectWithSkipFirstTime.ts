import { EffectCallback, useEffect, useRef } from "react";

//remove dependencies, since dependencies are not needed it will work anyway after skipping first time.

export default (effect: EffectCallback) => {
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    return effect();
  }, [effect]);
};
