import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONT_SIZE } from "config";
import Colors from "config/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { HomeDrawerParamList } from "routes";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";

type ProfileNavigationProp = DrawerNavigationProp<
  HomeDrawerParamList,
  "Matches"
>;

type Props = {};

export const MatchesView = React.memo<Props>(() => {
  const navigation = useNavigation<ProfileNavigationProp>();
  return (
    <View style={styles.container}>
      <AppLabel style={[{ alignSelf: "center" }]} text="Matches" />
      <AppLabel
        style={[
          {
            alignSelf: "center",
            padding: 20,
            fontSize: FONT_SIZE.md,
            margin: 10,
            backgroundColor: Colors.grey3
          }
        ]}
        text="Open Drawer"
        weight="bold"
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: COLORS.backgroundColor,
    flex: 1
  }
});
