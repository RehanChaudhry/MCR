import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { FC, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { ProfileRoutes } from "routes/ProfileRoutes";
import { ProfileStackParamList } from "routes/ProfileBottomBar";
import BottomBreadCrumbs, {
  Item
} from "ui/components/templates/bottom_bread_crumbs/BottomBreadCrumbs";
import { usePreferredTheme } from "hooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EScreen from "models/enums/EScreen";

type ProfileNavigationProp = BottomTabNavigationProp<ProfileStackParamList>;

type Props = {};

const ProfileController: FC<Props> = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  const safeAreaInsets = useSafeAreaInsets();

  const _items: Item[] = [
    {
      title: "View Profile",
      onPress: () => {
        navigation.jumpTo("ViewProfile", { isFrom: EScreen.HOME });
      }
    },
    {
      title: "Update Profile",
      onPress: () => {
        navigation.jumpTo("UpdateProfile", { isFrom: EScreen.HOME });
      }
    },
    {
      title: "Update Questionnaire",
      onPress: () => {
        navigation.jumpTo("UpdateQuestionnaire");
      }
    }
  ];

  const itemsRef = useRef(_items);

  const theme = usePreferredTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.themedColors.backgroundSecondary }
      ]}>
      <ProfileRoutes />
      <BottomBreadCrumbs data={itemsRef.current} />
      <View
        style={[
          styles.bottomSafeArea,
          {
            backgroundColor: theme.themedColors.background,
            height: safeAreaInsets.bottom
          }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1
  },
  bottomSafeArea: {
    width: "100%"
  }
});

export default ProfileController;
