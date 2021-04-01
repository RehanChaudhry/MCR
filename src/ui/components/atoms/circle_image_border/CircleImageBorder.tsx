import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "config/Colors";
import UserPic from "assets/images/user_pic.svg";
import UserGroup from "assets/images/user_group.svg";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

type Props = {
  shouldNotOptimize?: boolean;
};

export const CircleImageBorder = optimizedMemo<Props>(() => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.circle}>
        <UserPic width={50} height={50} />
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
