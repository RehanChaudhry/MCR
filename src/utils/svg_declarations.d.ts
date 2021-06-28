declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<
    SvgProps & {
      fillPrimary?: string;
      fillSecondary?: string;
    }
  >;
  export default content;
}
