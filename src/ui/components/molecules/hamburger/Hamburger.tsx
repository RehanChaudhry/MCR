import React, { FC } from "react";
import { Keyboard, Pressable, StyleSheet } from "react-native";
import Menu from "assets/images/menu.svg";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { usePreferredTheme } from "hooks";
import { HomeDrawerParamList } from "routes";
import { SPACE } from "config";

type Props = {};

type NavigationDrawerProp = DrawerNavigationProp<HomeDrawerParamList>;

const Hamburger: FC<Props> = () => {
  const theme = usePreferredTheme();
  const navigationDrawer = useNavigation<NavigationDrawerProp>();
  return (
    <Pressable
      style={styles.icon}
      onPress={() => {
        Keyboard.dismiss();
        navigationDrawer.openDrawer();
      }}>
      <Menu width={23} height={23} fill={theme.themedColors.primary} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: SPACE.md,
    paddingVertical: SPACE.md
  }
});

export default Hamburger;
