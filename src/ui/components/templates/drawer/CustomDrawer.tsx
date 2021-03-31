import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-navigation";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView
} from "@react-navigation/drawer";
import SignOut from "assets/images/sign_out.svg";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
import Matches from "assets/images/matches.svg";
import NewPaper from "assets/images/newspaper.svg";
import Announcement from "assets/images/announcements.svg";
import NavProfile from "assets/images/nav_profile.svg";
import NavChat from "assets/images/nav_chat.svg";
import Bell from "assets/images/bell.svg";
import Friend from "assets/images/user-group.svg";
import Settings from "assets/images/settings.svg";
import { moderateScale } from "config/Dimens";
import { AppProgressBar } from "ui/components/molecules/app_progress_bar/AppProgressBar";
import { Divider } from "react-native-elements";
import Colors from "config/Colors";
import { SvgProps } from "react-native-svg";
import { HomeDrawerParamList } from "routes";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

type CustomDrawerProps = DrawerContentComponentProps & {
  currentItem: string;
  setCurrentItem: (name: string) => void;
};
export const CustomDrawer = optimizedMemo<CustomDrawerProps>((props) => {
  const { currentItem, setCurrentItem } = props;
  // eslint-disable-next-line new-cap
  const ripple = TouchableNativeFeedback.Ripple("#adacac", false);
  const { themedColors } = usePreferredTheme();
  const { state, navigation } = props;

  type ItemType<T> = {
    [K in keyof T]: {
      name: string;
      icon: React.FC<SvgProps>;
      shouldNotDrawView?: boolean;
    };
  };

  const DrawerItems: ItemType<HomeDrawerParamList> = {
    Matches: { name: "Matches", icon: Matches },
    Community: { name: "Community", icon: NewPaper },
    Announcement: { name: "Announcements", icon: Announcement },
    Profile: { name: "My Profile", icon: NavProfile },
    Friends: { name: "My Friends", icon: Friend },
    ChatList: { name: "Chat", icon: NavChat },
    Notification: { name: "Notifications", icon: Bell },
    Settings: { name: "Settings", icon: Bell, shouldNotDrawView: true }
  };

  function defaultIcon<K extends keyof HomeDrawerParamList>(name: K) {
    const Icon: React.FC<SvgProps> =
      DrawerItems[name].icon ?? DrawerItems.Matches.icon;

    return (
      <Icon
        width={20}
        height={20}
        fill={
          currentItem === name
            ? themedColors.primary
            : themedColors.interface["600"]
        }
      />
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
          {/*drawer header start*/}
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <Image
                style={styles.userImg}
                source={require("assets/images/d_user_pic1.png")}
              />
              <View style={styles.nameContainer}>
                <AppLabel text="Zayn Mayes" weight="semi-bold" />
                <View style={styles.settingContainer}>
                  <AppLabel text="student" style={styles.userRole} />

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Settings");
                      setCurrentItem("Settings");
                    }}>
                    <Settings
                      width={moderateScale(20)}
                      height={moderateScale(20)}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <AppProgressBar
              progressPercentage={65}
              style={styles.userProgress}
            />
          </View>
          <Divider />
          {/*drawer header end*/}

          <DrawerContentScrollView {...props}>
            <View style={[styles.itemsContainer]}>
              {state.routes.map((route: any, index: number) => {
                // @ts-ignore
                if (DrawerItems[route.name].shouldNotDrawView) {
                  return null;
                }

                return (
                  <TouchableNativeFeedback
                    onPress={() => {
                      setCurrentItem(route.name);
                      navigation.navigate(route.name);
                    }}
                    background={ripple}>
                    <View
                      style={[
                        styles.customItem(
                          themedColors,
                          currentItem,
                          route.name
                        )
                      ]}>
                      {defaultIcon(route.name)}
                      <AppLabel
                        key={route.key}
                        // @ts-ignore
                        text={DrawerItems[route.name].name}
                        style={styles.itemText(
                          themedColors,
                          currentItem,
                          route.name
                        )}
                        weight={
                          currentItem === route.name
                            ? "semi-bold"
                            : "normal"
                        }
                      />

                      {/* just showing on notifications for design build*/}
                      {index === 6 && (
                        <View style={styles.notifyContainer}>
                          <View style={styles.notifyCountBg}>
                            <AppLabel
                              text="3"
                              weight="semi-bold"
                              style={styles.notifyText}
                            />
                          </View>
                        </View>
                      )}
                      {/* just showing on notifications for design build*/}
                    </View>
                  </TouchableNativeFeedback>
                );
              })}
            </View>
          </DrawerContentScrollView>
        </SafeAreaView>
      </ScrollView>

      {/*Footer start*/}
      <TouchableNativeFeedback
        onPress={() => {
          setCurrentItem("SignOut");
          //  navigation.navigate(route.name);
        }}
        background={ripple}>
        <View
          style={styles.customItem(themedColors, currentItem, "SignOut")}>
          <SignOut
            width={20}
            height={20}
            fill={
              currentItem === "SignOut"
                ? themedColors.primary
                : themedColors.interface["600"]
            }
          />
          <AppLabel
            text="Sign Out"
            style={styles.itemText(themedColors, currentItem, "SignOut")}
            weight={currentItem === "SignOut" ? "semi-bold" : "normal"}
          />
        </View>
      </TouchableNativeFeedback>
      {/*Footer end*/}
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    paddingVertical: SPACE.md,
    paddingHorizontal: SPACE.md
  },
  userInfo: {
    flexDirection: "row"
  },
  userImg: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: 10,
    overflow: "hidden"
  },
  nameContainer: {
    justifyContent: "center",
    paddingStart: SPACE.md,
    flexGrow: 1
  },
  userRole: {
    fontSize: FONT_SIZE._2xsm,
    textTransform: "capitalize"
  },
  settingContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  userProgress: {
    paddingTop: SPACE.md
  },
  itemsContainer: {
    paddingVertical: SPACE.md
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5
  },
  container: { flex: 1 },

  customItem: (
    theme: ColorPalette,
    currentSelected: string,
    routeName: string
  ) => {
    return {
      marginHorizontal: SPACE.md,
      paddingVertical: SPACE.md,
      paddingHorizontal: SPACE.lg,
      marginBottom: SPACE.sm,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor:
        currentSelected === routeName
          ? theme.primaryShade
          : theme.transparent,
      borderRadius: 4,
      borderColor:
        currentSelected === routeName
          ? theme.primaryShade
          : theme.transparent
    };
  },
  itemText: (
    theme: ColorPalette,
    currentSelected: string,
    routeName: string
  ) => {
    return {
      paddingStart: SPACE.md,
      fontSize: FONT_SIZE.xsm,
      color:
        currentSelected === routeName
          ? theme.primary
          : theme.interface["600"]
    };
  },
  notifyContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    flexDirection: "row"
  },
  notifyCountBg: {
    borderRadius: 18 / 2,
    backgroundColor: Colors.red,
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center"
  },
  notifyText: {
    color: "#fff",
    fontSize: FONT_SIZE._3xm
  }
});
