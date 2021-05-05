import { SPACE } from "config/Dimens";
import { useAuth } from "hooks";
import React from "react";
import { Image, ImageStyle, StyleProp, StyleSheet } from "react-native";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

interface OwnProps {
  shouldNotOptimize?: boolean;
  style?: StyleProp<ImageStyle>;
}

type Props = OwnProps;

export const UniImage = optimizedMemo<Props>(({ style }) => {
  const auth = useAuth();

  return (
    <Image
      style={[styles.image, style]}
      resizeMode="cover"
      source={{
        uri: auth.uni?.images?.[0]?.fileURL
      }}
    />
  );
});

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 1.394,
    marginTop: SPACE._2xl
  }
});
