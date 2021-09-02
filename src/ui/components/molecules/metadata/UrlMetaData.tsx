import { FONT_SIZE } from "config";
import { usePreferredTheme } from "hooks";
import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacityProps,
  View
} from "react-native";
import {
  LinkPreview,
  PreviewDataImage
} from "@flyerhq/react-native-link-preview";

export interface UrlMetaDataProps extends TouchableOpacityProps {
  url: string;
}

export const UrlMetaData = React.memo<UrlMetaDataProps>(({ url }) => {
  const theme = usePreferredTheme();
  return (
    <View style={styles.MainContainer}>
      <LinkPreview
        text={url}
        textContainerStyle={{ marginVertical: 0, marginHorizontal: 0 }}
        metadataTextContainerStyle={{ margin: 0, padding: 0 }}
        renderMinimizedImage={(image: PreviewDataImage) => (
          <Image source={{ uri: image.url }} style={styles.miniImage} />
        )}
        metadataContainerStyle={[
          styles.containerStyle,
          {
            backgroundColor: theme.themedColors.interface["200"],
            borderColor: theme.themedColors.interface["300"],
            borderWidth: 0.5
          }
        ]}
        renderImage={(image: PreviewDataImage) => (
          <Image source={{ uri: image.url }} style={styles.image} />
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  MainContainer: {},
  title: {
    fontSize: FONT_SIZE.xs
  },
  description: {
    paddingTop: 5,
    fontSize: FONT_SIZE.xs,
    fontWeight: "700"
  },
  containerStyle: {
    borderRadius: 10,
    width: "100%",
    height: 110,
    paddingStart: "33%",
    paddingEnd: "2%",
    marginTop: 10,
    paddingVertical: 10
  },
  image: {
    width: "30%",
    height: 110,
    overflow: "hidden",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    resizeMode: "cover",
    marginTop: 10,
    position: "absolute"
  },
  miniImage: {
    width: "45%",
    height: 110,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    resizeMode: "cover",
    position: "absolute"
  }
});
