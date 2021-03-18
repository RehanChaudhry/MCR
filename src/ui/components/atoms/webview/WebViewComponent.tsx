import { SPACE } from "config";
import React from "react";
import { StyleSheet, TouchableOpacityProps, View } from "react-native";
import { WebView } from "react-native-webview";

export interface WebViewProps extends TouchableOpacityProps {
  url: string;
  urlType: URL_TYPES;
}

export enum URL_TYPES {
  LINK = "link",
  EMBEDDED = "embedded"
}

export const WebViewComponent = React.memo<WebViewProps>(
  ({ url, urlType }) => {
    return (
      <View style={style.container}>
        <WebView
          cacheMode="LOAD_NO_CACHE"
          startInLoadingState={true}
          allowsInlineMediaPlayback={true}
          source={
            urlType === URL_TYPES.LINK ? { uri: url } : { html: url }
          }
        />
      </View>
    );
  }
);

const style = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: SPACE.md,
    height: 250
  }
});
