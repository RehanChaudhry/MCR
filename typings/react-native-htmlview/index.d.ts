declare module "react-native-htmlview" {
  import React from "react";
  import { ViewStyle } from "react-native";

  interface HtmlViewProps {
    [key: string]: number | string | boolean | undefined | Object;
    addLineBreaks?: boolean;
    bullet?: string;
    lineBreak?: string;
    NodeComponent?: () => void;
    nodeComponentProps?: Object;
    onError?: () => void;
    onLinkPress?: () => void;
    onLinkLongPress?: () => void;
    paragraphBreak?: string;
    renderNode?: () => void;
    RootComponent?: () => void;
    rootComponentProps?: Object;
    style?: Object | ViewStyle;
    stylesheet?: Object;
    TextComponent?: () => void;
    textComponentProps?: Object;
    value: string;
  }

  export default class HtmlView extends React.Component<HtmlViewProps> {}
}
