import React, { FC } from "react";

function propsMatcher<PropType>() {
  // pass empty array as `propsNotToMatch` to never rerender/update
  // or pass keys in the array that you want to ignore
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
        if (!hasAllPropsMatched) {
          break;
        }
      }

      return hasAllPropsMatched;
    };
  }
  return of;
}

type Props = {
  // style?: any;
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
