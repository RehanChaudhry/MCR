import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import SignOut from "assets/images/sign_out.svg";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE, SPACE } from "config";
import { useAuth, usePreferredTheme } from "hooks";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
import Matches from "assets/images/matches.svg";
import NewPaper from "assets/images/newspaper.svg";
import Announcement from "assets/images/announcements.svg";
import NavProfile from "assets/images/nav_profile.svg";
import NavChat from "assets/images/nav_chat.svg";
import Bell from "assets/images/bell.svg";
import Clock from "assets/images/clock.svg";
import Friend from "assets/images/user-group.svg";
import Settings from "assets/images/settings.svg";
import { AppProgressBar } from "ui/components/molecules/app_progress_bar/AppProgressBar";
import { Divider } from "react-native-elements";
import Colors from "config/Colors";
import { SvgProps } from "react-native-svg";
import { HomeDrawerParamList } from "routes";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import { profileCompletedPercentage } from "models/api_responses/FetchMyProfileResponseModel";
import useNotificationsCount from "ui/screens/home/friends/useNotificationsCount";
import TwoButtonsInfoAlert from "ui/components/organisms/popup/TwoButtonsInfoAlert";
import { useEffect } from "react";
import { setBadgeCount } from "react-native-notification-badge";
import { AppLog } from "utils/Util";
import { Platform } from "react-native";
import EIntBoolean from "models/enums/EIntBoolean";

type CustomDrawerProps = DrawerContentComponentProps & {
  currentItem: keyof HomeDrawerParamList;
  setCurrentItem: (name: keyof HomeDrawerParamList) => void;
  shouldNotOptimize?: boolean;
};
export const CustomDrawer = optimizedMemo<CustomDrawerProps>((props) => {
  const { currentItem, setCurrentItem } = props;

  // eslint-disable-next-line new-cap
  const ripple = TouchableNativeFeedback.Ripple("#adacac", false);

  const { notificationsCount } = useNotificationsCount();

  const { themedColors } = usePreferredTheme();
  const { state, navigation } = props;
  const auth = useAuth();
  const [shouldShowDialog, setShouldShowDialog] = useState(false);

  type ItemType<T> = {
    [K in keyof T]: {
      name: string;
      icon: React.FC<SvgProps>;
      shouldNotDrawView?: boolean;
    };
  };

  useEffect(() => {
    AppLog.logForcefully(
      () => "Notification count : " + notificationsCount
    );
    if (
      Platform.OS === "android" &&
      notificationsCount !== undefined &&
      notificationsCount > 0
    ) {
      AppLog.logForcefully(() => "In android's condition");
      import("react-native-app-badge").then((ShortcutBadge) => {
        ShortcutBadge.default.setCount(notificationsCount);
      });
    }

    Platform.OS === "ios" &&
      notificationsCount !== undefined &&
      notificationsCount > 0 &&
      setBadgeCount(notificationsCount).then().catch();
  }, [notificationsCount]);

  const DrawerItems: ItemType<HomeDrawerParamList> = {
    Matches: { name: "Matches", icon: Matches },
    Community: { name: "Community", icon: NewPaper },
    Announcement: { name: "Announcements", icon: Announcement },
    Profile: { name: "My Profile", icon: NavProfile },
    Friends: { name: "My Friends", icon: Friend },
    ChatList: { name: "Chat", icon: NavChat },
    Notification: { name: "Notifications", icon: Bell },
    ActivityLog: { name: "Activity Log", icon: Clock },
    Settings: {
      name: "Settings",
      icon: Settings,
      shouldNotDrawView: true
    },
    SignOut: { name: "Sign Out", icon: SignOut, shouldNotDrawView: true }
  };

  function defaultIcon<K extends keyof HomeDrawerParamList>(name: K) {
    const Icon: React.FC<SvgProps> =
      DrawerItems[name].icon ?? DrawerItems.Matches.icon;

    return (
      <Icon
        width={22}
        height={22}
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
                source={
                  auth.user?.profile?.profilePicture?.fileURL !== undefined
                    ? { uri: auth.user?.profile?.profilePicture.fileURL }
                    : require("assets/images/profile.png")
                }
              />
              <View style={styles.nameContainer}>
                <AppLabel
                  text={
                    auth.user?.profile?.firstName +
                    " " +
                    auth.user?.profile?.lastName
                  }
                  weight="semi-bold"
                  style={styles.name}
                />
                <View style={styles.settingContainer}>
                  <AppLabel
                    text={auth.user?.profile?.roleTitle}
                    style={styles.userRole}
                  />

                  <TouchableOpacity
                    style={styles.settingIconContainer}
                    onPress={() => {
                      navigation.navigate("Settings");
                      setCurrentItem("Settings");
                    }}>
                    <Settings
                      width={19}
                      height={19}
                      style={styles.settingIcon}
                      fill={themedColors.interface["600"]}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <AppProgressBar
              progressPercentage={profileCompletedPercentage(
                auth.user?.profile
              )}
              style={styles.userProgress}
            />
          </View>
          <Divider />
          {/*drawer header end*/}
          {/* Commented out because it is adding extra unwanted space below the divider */}
          {/* <DrawerContentScrollView {...props}> */}
          <View style={[styles.itemsContainer]}>
            {state.routes.map((route: any, index: number) => {
              // @ts-ignore
              if (DrawerItems[route.name].shouldNotDrawView) {
                return null;
              }

              // @ts-ignore
              if (
                auth.uni?.chatFeature === EIntBoolean.TRUE &&
                DrawerItems[route.name].name === "Chat"
              ) {
                return null;
              }
              return (
                <TouchableNativeFeedback
                  key={index}
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
                        currentItem === route.name ? "semi-bold" : "normal"
                      }
                    />

                    {index === 6 &&
                      notificationsCount !== undefined &&
                      notificationsCount !== 0 && (
                        <View style={styles.notifyContainer}>
                          <View style={styles.notifyCountBg}>
                            <AppLabel
                              text={notificationsCount.toString()}
                              weight="bold"
                              style={styles.notifyText}
                            />
                          </View>
                        </View>
                      )}
                  </View>
                </TouchableNativeFeedback>
              );
            })}
          </View>
          {/* </DrawerContentScrollView> */}
        </SafeAreaView>
      </ScrollView>

      {/*Footer start*/}
      {
        <TwoButtonsInfoAlert
          shouldShow={shouldShowDialog}
          message={"Are you sure you want to Sign Out!"}
          title={"Sign Out !"}
          onConfirmation={() => {
            setShouldShowDialog(false);
            auth.logOut();
          }}
          hideDialogue={() => setShouldShowDialog(false)}
        />
      }
      <TouchableNativeFeedback
        onPress={() => {
          setShouldShowDialog(true);
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
  settingIconContainer: {
    paddingTop: SPACE.sm,
    paddingBottom: SPACE.sm
  },
  name: {
    fontSize: FONT_SIZE.base
  },
  header: {
    paddingVertical: SPACE.lg,
    paddingHorizontal: SPACE.lg
  },
  userInfo: {
    flexDirection: "row"
  },
  userImg: {
    width: 45,
    height: 45,
    borderRadius: 10,
    overflow: "hidden"
  },
  nameContainer: {
    justifyContent: "center",
    paddingStart: SPACE.md,
    flexGrow: 1,
    flex: 1
  },
  userRole: {
    fontSize: FONT_SIZE.sm,
    textTransform: "capitalize"
  },
  settingContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  settingIcon: { marginLeft: 15 },
  userProgress: {
    paddingTop: SPACE.lg
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
      marginHorizontal: SPACE.lg,
      paddingVertical: SPACE._2md,
      paddingHorizontal: SPACE.lg,
      marginBottom: SPACE.md,
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
      paddingStart: SPACE._2md,
      fontSize: FONT_SIZE.base,
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
    borderRadius: 24 / 2,
    backgroundColor: Colors.red,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  notifyText: {
    color: "#fff",
    fontSize: FONT_SIZE.sm
  }
});
