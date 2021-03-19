import React from "react";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import ArrowLeft from "assets/images/arrow_left.svg";
import { usePreferredTheme } from "hooks";

interface OwnProps {}

type Props = OwnProps;

export const SignInView = React.memo<Props>(() => {
  const theme = usePreferredTheme();
  return (
    <AppImageBackground
      containerShape={CONTAINER_TYPES.CIRCLE}
      icon={() => (
        <ArrowLeft
          width={20}
          height={20}
          fill={theme.themedColors.primary}
        />
      )}
    />
  );
});
