import React from "react";
import { StyleSheet, TouchableOpacityProps } from "react-native";
import { WebView } from "react-native-webview";

export interface WebViewProps extends TouchableOpacityProps {
  url: string;
}

export const WebViewComponent = React.memo<WebViewProps>(({ url }) => {
  return <WebView style={style.container} source={{ uri: url }} />;
});

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: 200
  }
});
