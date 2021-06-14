import Env from "envs/env";
import React, { FC } from "react";
import { AppLog } from "utils/Util";

function propsMatcher<PropType>() {
  function of<Key extends keyof PropType>(propsNotToMatch?: Array<Key>) {
    return (prevProps: any, nextProps: any) => {
      let keys = Object.keys(nextProps) as Array<Key>;
      if (
        Env.SHOULD_OPTIMIZED_MEMO_ENABLED &&
        !prevProps.shouldNotOptimize &&
        propsNotToMatch &&
        propsNotToMatch.length > 0
      ) {
        keys = keys.filter(
          (value) => propsNotToMatch.indexOf(value) === -1
        );
      }

      let changedProp;
      let hasAllPropsMatched = true;
      for (let keyValue = 0; keyValue < keys.length; keyValue++) {
        hasAllPropsMatched =
          prevProps[keys[keyValue]] === nextProps[keys[keyValue]];
        if (!hasAllPropsMatched) {
          changedProp = keys[keyValue];
          break;
        }
      }

      if (nextProps.logKey) {
        AppLog.logForcefullyForComplexMessages(
          () =>
            `LogKey: ${
              nextProps.logKey
            } \n\nKeys To Matched: ${JSON.stringify(
              keys
            )} \n\nProp That Changed: ${changedProp} 
          \n\nRe-Render: ${!hasAllPropsMatched}`
        );
      }

      return hasAllPropsMatched;
    };
  }
  return of;
}

type Props = {
  // style?: any;
  shouldNotOptimize?: boolean;
};

export function optimizedMemo<MemoPropsType extends Props>(
  Component: FC<MemoPropsType>
): FC<MemoPropsType> {
  return React.memo<MemoPropsType>(
    Component,
    propsMatcher<MemoPropsType>()(["style" as keyof MemoPropsType])
  );
}

export function optimizedMemoWithStyleProp<MemoPropsType extends Props>(
  Component: FC<MemoPropsType>
) {
  function withStyleProps<Key extends keyof MemoPropsType>(
    styleProps: Array<Key>
  ): FC<MemoPropsType> {
    return React.memo<MemoPropsType>(
      Component,
      propsMatcher<MemoPropsType>()(styleProps)
    );
  }

  return withStyleProps;
}
