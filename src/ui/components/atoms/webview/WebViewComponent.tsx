import { SPACE } from "config";
import { usePreferredTheme } from "hooks";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacityProps,
  View
} from "react-native";
import AutoHeightWebView from "react-native-autoheight-webview";
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
    AppLog.log(() => "should play video: " + shouldPlayVideo);
    const head = `<style>body{margin:0}</style>`;
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

    AppLog.logForcefully(() => "embedded data : " + url);
    return (
      <View>
        {shouldPlayVideo && (
          <AutoHeightWebView
            originWhitelist={["*"]}
            bounces={false}
            mediaPlaybackRequiresUserAction={true}
            renderLoading={loadingIndicatorView}
            automaticallyAdjustContentInsets={true}
            startInLoadingState={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsFullscreenVideo={true}
            source={
              urlType === URL_TYPES.LINK
                ? { uri: url }
                : {
                    html:
                      `<style type="text/css">iframe{max-width: 100%; max-height: fit-content;}</style>` +
                      html
                  }
            }
            style={[
              style.webViewContainer
              // { backgroundColor: theme.themedColors.interface["200"] }
            ]}
          />
        )}
      </View>
    );
  }
);

const style = StyleSheet.create({
  container: {
    marginTop: SPACE.md
  },
  webViewContainer: {
    width: "100%",
    marginTop: SPACE.md
  }
});
