import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import React from "react";
import { StyleSheet, TouchableOpacityProps, View } from "react-native";
import RNUrlPreview from "react-native-url-preview";

export interface UrlMetaDataProps extends TouchableOpacityProps {
  url: string;
}

export const UrlMetaData = React.memo<UrlMetaDataProps>(({ url }) => {
  const theme = usePreferredTheme();
  return (
    <View style={styles.MainContainer}>
      <RNUrlPreview
        text={url}
        titleStyle={[
          styles.title,
          { color: theme.themedColors.interface["700"] }
        ]}
        titleNumberOfLines={1}
        descriptionNumberOfLines={3}
        descriptionStyle={[
          styles.description,
          { color: theme.themedColors.label }
        ]}
        containerStyle={[
          styles.containerStyle,
          { backgroundColor: theme.themedColors.interface["200"] }
        ]}
        imageProps={{ resizeMode: "cover" }}
        imageStyle={styles.image}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  MainContainer: {
    marginTop: SPACE.md
  },
  title: {
    fontSize: FONT_SIZE._2xsm
  },
  description: {
    paddingTop: 5,
    fontSize: FONT_SIZE._2xsm,
    fontWeight: "700"
  },
  containerStyle: {
    borderRadius: 10,
    width: "100%",
    height: 110
  },
  image: {
    width: "40%",
    height: undefined,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10
  }
});
