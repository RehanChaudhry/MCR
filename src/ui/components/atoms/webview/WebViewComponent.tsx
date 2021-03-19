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
    const head = `<style>body{margin:0}</style><meta name="viewport" content="width=device-width, height=300px, initial-scale=1">`;
    const html = `<!DOCTYPE html><html><head>${head}</head><body>${url}</body></html>`;
    return (
      <View
        style={[
          style.container,
          urlType === URL_TYPES.LINK ? { height: 350 } : {}
        ]}>
        <WebView
          bounces={false}
          dataDetectorTypes="link"
          scalesPageToFit={false}
          scrollEnabled={false}
          automaticallyAdjustContentInsets={false}
          mediaPlaybackRequiresUserAction={true}
          source={
            urlType === URL_TYPES.LINK ? { uri: url } : { html: html }
          }
          style={style.container}
        />
      </View>
    );
  }
);

const style = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: SPACE.md,
    height: 150
  }
});
