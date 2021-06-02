import React from "react";
import { StyleSheet } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { AppLog, shadowStyleProps } from "utils/Util";
import { StaticContent } from "models/api_responses/StaticContentResponseModel";
import { SPACE, STRINGS } from "config";
import WebView from "react-native-webview";

type Props = {
  staticContent: StaticContent;
};

export const StaticContentView = React.memo<Props>(({ staticContent }) => {
  AppLog.log("rendering StaticContentView");
  return (
    <Screen style={styles.container} shouldAddBottomInset={false}>
      <WebView
        originWhitelist={["*"]}
        source={{
          html: `<html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${
            staticContent.title
          }</title></head><body style="margin: 16px">${
            staticContent.content ?? STRINGS.common.not_found
          }</body></html>`
        }}
        containerStyle={styles.content}
      />
    </Screen>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    flex: 1,
    borderRadius: 12,
    margin: SPACE.lg,
    overflow: "hidden",
    ...shadowStyleProps
  },
  content: {}
});
