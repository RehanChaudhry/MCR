import { SPACE } from "config";
import { usePreferredTheme } from "hooks";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacityProps,
  View
} from "react-native";
import { WebView } from "react-native-webview";
import { AppLog } from "utils/Util";

export interface WebViewProps extends TouchableOpacityProps {
  url: string;
  urlType: URL_TYPES;
  shouldPlayVideo: boolean;
}

export enum URL_TYPES {
  LINK = "link",
  EMBEDDED = "embedded"
}

export const WebViewComponent = React.memo<WebViewProps>(
  ({ url, urlType, shouldPlayVideo }) => {
    AppLog.logForcefully("should play video: " + shouldPlayVideo);
    const head = `<style>body{margin:0}</style><meta name="viewport" content="width=device-width, height=100%, initial-scale=1">`;
    const html = `<!DOCTYPE html><html><head>${head}</head><body>${url}</body></html>`;
    const theme = usePreferredTheme();
    function loadingIndicatorView() {
      return (
        <View style={style.webViewContainer}>
          <ActivityIndicator
            color={theme.themedColors.primary}
            size="small"
          />
        </View>
      );
    }
    return (
      <View
        style={[
          style.container,
          // urlType === URL_TYPES.LINK ? { height: 350 } : {},
          { backgroundColor: theme.themedColors.interface["200"] }
        ]}>
        {shouldPlayVideo && (
          <WebView
            originWhitelist={["*"]}
            bounces={false}
            mediaPlaybackRequiresUserAction={true}
            dataDetectorTypes="link"
            scalesPageToFit={false}
            scrollEnabled={false}
            coverScreen={false}
            renderLoading={loadingIndicatorView}
            automaticallyAdjustContentInsets={true}
            startInLoadingState={true}
            allowsFullscreenVideo
            useWebKit
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={
              urlType === URL_TYPES.LINK ? { uri: url } : { html: html }
            }
            style={[
              style.webViewContainer,
              { backgroundColor: theme.themedColors.interface["200"] }
            ]}
          />
        )}
      </View>
    );
  }
);

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: SPACE.md,
    height: 350
  },
  webViewContainer: {
    flex: 1,
    width: "100%",
    height: 350
  }
});
