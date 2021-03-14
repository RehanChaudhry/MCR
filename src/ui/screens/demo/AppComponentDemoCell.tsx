import { FONT_SIZE } from "config";
import React, { FC } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppComponent } from "./AppComponentsDemo";

interface AppComponentDemoCellProps {
  item: AppComponent;
  onPress: (item: AppComponent) => void;
}

export type Props = AppComponentDemoCellProps;

export const AppComponentDemoCell: FC<Props> = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.container}>
        <Text style={styles.text}>{item.name}</Text>
        <View style={styles.iconContainer}>
          <Image
            style={styles.image}
            source={require("assets/images/chevron_right.png")}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16.0
  },
  iconContainer: {
    width: 14,
    height: 14
  },
  image: {
    width: "100%",
    height: "100%"
  },
  text: {
    fontSize: FONT_SIZE.md
  }
});

export default AppComponentDemoCell;
