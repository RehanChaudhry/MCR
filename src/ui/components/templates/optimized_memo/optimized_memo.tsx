import React, { FC } from "react";

function propsMatcher<PropType>() {
  function of<Key extends keyof PropType>(propsNotToMatch?: Array<Key>) {
    return (prevProps: any, nextProps: any) => {
      if (!propsNotToMatch) {
        return true;
      }

      let keys = Object.keys(nextProps) as Array<Key>;
      keys = keys.filter((value) => propsNotToMatch.indexOf(value) === -1);

      let hasAllPropsMatched = true;
      for (let keyValue = 0; keyValue < keys.length; keyValue++) {
        hasAllPropsMatched =
          prevProps[keys[keyValue]] === nextProps[keys[keyValue]];
      }

      return hasAllPropsMatched;
    };
  }
  return of;
}

type Props = {
  style?: any;
};

export function optimizedMemo<MemoPropsType extends Props>(
  Component: FC<MemoPropsType>
): FC<MemoPropsType> {
  return React.memo<MemoPropsType>(
    Component,
    propsMatcher<MemoPropsType>()(["style"])
  );
}
