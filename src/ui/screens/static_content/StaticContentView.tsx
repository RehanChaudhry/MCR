import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { AppLog, shadowStyleProps } from "utils/Util";
import { StaticContent } from "models/api_responses/StaticContentResponseModel";
import { SPACE } from "config";
import HtmlView from "react-native-htmlview";
import { usePreferredTheme } from "hooks";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";

type Props = {
  staticContent: StaticContent;
};

export const StaticContentView = React.memo<Props>(({ staticContent }) => {
  AppLog.log(
    () =>
      "rendering StaticContentView : " +
      JSON.stringify(String(staticContent.content))
  );

  const { themedColors } = usePreferredTheme();
  return (
    <Screen
      style={styles(themedColors).container}
      shouldAddBottomInset={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HtmlView
          addLineBreaks={true}
          value={String(staticContent.content).replace("</li>", "</li>")}
          stylesheet={styles(themedColors)}
        />
      </ScrollView>
    </Screen>
  );
});

const styles = (color: ColorPalette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: SPACE.lg
    },
    card: {
      flex: 1,
      borderRadius: 12,
      margin: SPACE.lg,
      overflow: "hidden",
      ...shadowStyleProps
    },
    content: {},
    ul: {
      fontSize: 18,
      paddingBottom: 10
    },
    ol: {
      fontSize: 18,
      paddingBottom: 0,
      marginBottom: 10
    },
    p: {
      fontSize: 18,
      marginBottom: -20,
      paddingBottom: 0,
      marginTop: 0
    },
    li: {
      fontSize: 18,
      paddingBottom: 0,
      marginBottom: 10
    },
    a: {
      color: color.primary
    },
    h4: {
      fontSize: 22
    }
  });
