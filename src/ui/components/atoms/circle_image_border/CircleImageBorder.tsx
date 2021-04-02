import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Colors from "config/Colors";
import UserGroup from "assets/images/user_group.svg";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

type Props = {
  shouldNotOptimize?: boolean;
  imageUrl: string;
};

export const CircleImageBorder = optimizedMemo<Props>(({ imageUrl }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.circle}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.innerContainer}>
          <UserGroup width={14} height={14} style={styles.userGroup} />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  circle: {
    width: 50,
    height: 50,
    position: "absolute",
    overflow: "visible",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.white
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  innerContainer: {
    height: 20,
    width: 20,
    borderRadius: 20,
    marginLeft: 32,
    marginTop: 30,
    position: "absolute",

    backgroundColor: Colors.white
  },
  mainContainer: {
    width: 65,
    height: 65
  },
  userGroup: {
    alignSelf: "center"
  }
});
