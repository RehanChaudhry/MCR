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
  urlType?: URL_TYPES;
  shouldPlayVideo: boolean;
}

export enum URL_TYPES {
  LINK = "link",
  EMBEDDED = "embedded"
}

export const WebViewComponent = React.memo<WebViewProps>(
  ({ url, shouldPlayVideo }) => {
    AppLog.log(() => "should play video: " + shouldPlayVideo);
    const head = `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"> <style>body{margin:0}</style>`;
    const html = `<!DOCTYPE html><html><head>${head}</head><body>${url}</body></html>`;
    const theme = usePreferredTheme();
    // const [state, setState] = useState({
    //   height: 100,
    //   aspectRatio: 16 / 9
    // });

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

    // function parseMessage(data: any) {
    //   try {
    //     data = JSON.parse(data);
    //   } catch (ex) {
    //     data = null;
    //   }
    //   return data;
    // }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onWebViewMessage = (e) => {
      // if (!isObject(e.nativeEvent.data)) {
      //   AppLog.logForcefully(
      //     () => "onWebview Message : " + e.nativeEvent.data
      //   );
      //   setState({
      //     height: parseInt(e.nativeEvent.data),
      //     aspectRatio: null
      //   });
      // } else {
      //   let message = parseMessage(e.nativeEvent.data);
      //   if (e.nativeEvent.data && message.height) {
      //     AppLog.logForcefully(() => "webview height : " + message.height);
      //     setState({
      //       height: parseInt(message.height),
      //       aspectRatio: null
      //     });
      //   }
      // }
    };

    AppLog.logForcefully(() => "embedded data : " + url);
    return (
      <View>
        {shouldPlayVideo && (
          <AutoHeightWebView
            originWhitelist={["*"]}
            androidLayerType="hardware"
            mediaPlaybackRequiresUserAction={true}
            renderLoading={loadingIndicatorView}
            startInLoadingState={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsFullscreenVideo={true}
            scalesPageToFit={false}
            source={{
              html:
                `<style type="text/css">iframe{max-width: 100%; }</style>` +
                html,
              baseUrl: "https://www.instagram.com"
            }}
            injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)"
            onMessage={onWebViewMessage}
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
    marginTop: SPACE.md,
    width: "100%"
  }
});
