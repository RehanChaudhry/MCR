import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { LoadMore } from "ui/components/atoms/app_load_more/LoadMore";
import { ThemeSwitcher } from "ui/components/templates/ThemeSwitcher";

type Props = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AppLoadMoreView: FC<Props> = (props) => {
  return (
    <ThemeSwitcher>
      <View style={style.container}>
        <LoadMore />
      </View>
    </ThemeSwitcher>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    alignItems: "center"
  },
  imageContainerStyle: {
    width: 25,
    height: 25
  },
  iconStyle: {
    width: 15,
    height: 15
  }
});
