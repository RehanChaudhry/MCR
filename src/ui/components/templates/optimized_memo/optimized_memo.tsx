import React, { FC } from "react";

function propsMatcher<PropType>() {
  function of<Key extends keyof PropType>(propsNotToMatch?: Array<Key>) {
    return (prevProps: any, nextProps: any) => {
      let keys = Object.keys(nextProps) as Array<Key>;
      if (
        !prevProps.shouldNotOptimize &&
        propsNotToMatch &&
        propsNotToMatch.length > 0
      ) {
        keys = keys.filter(
          (value) => propsNotToMatch.indexOf(value) === -1
        );
      }

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
