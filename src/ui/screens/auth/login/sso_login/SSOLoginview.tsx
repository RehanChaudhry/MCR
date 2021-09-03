import { useNavigation, useRoute } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import Colors from "config/Colors";
import React, { FC, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import WebView, { WebViewNavigation } from "react-native-webview";
import { AuthStackParamList } from "routes";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import { AppLog } from "utils/Util";
import ArrowLeft from "assets/images/arrow_left.svg";
import { usePreferredTheme } from "hooks";
import NoHeader from "ui/components/headers/NoHeader";
import Screen from "ui/components/atoms/Screen";
import { SPACE } from "config";

export type LoginScreenAuthStackScreenProps = StackScreenProps<
  AuthStackParamList,
  "Login"
>;

type Props = {};

const SSOLoginView: FC<Props> = () => {
  const { params }: any = useRoute<any>();

  const { themedColors } = usePreferredTheme();
  const navigation = useNavigation<
    LoginScreenAuthStackScreenProps["navigation"]
  >();

  // Add no toolbar
  useLayoutEffect(() => {
    navigation.setOptions(NoHeader.create());
  }, [navigation]);

  AppLog.logForcefully(() => "url to load on web view : " + params.url);

  const onNavigationStateChange = (navigationState: WebViewNavigation) => {
    AppLog.logForcefully(
      () => "navigationState " + JSON.stringify(navigationState)
    );
  };

  return (
    <Screen
      style={[
        styles.container,
        { backgroundColor: themedColors.backgroundSecondary }
      ]}
      topSafeAreaAndStatusBarColor={themedColors.backgroundSecondary}>
      <View style={styles.mainContainer}>
        <AppImageBackground
          containerShape={CONTAINER_TYPES.CIRCLE}
          icon={() => (
            <ArrowLeft
              width={20}
              height={20}
              fill={themedColors.primary}
            />
          )}
          containerStyle={styles.leftArrow}
          onPress={() => {
            navigation.goBack();
          }}
        />

        <WebView
          source={{ uri: params.url }}
          startInLoadingState
          javaScriptEnabledAndroid={true}
          javaScriptEnabled={true}
          onMessage={(event) => {
            AppLog.logForcefully(
              () =>
                "onMessage >>>" + JSON.stringify(event.nativeEvent.data)
            );
          }}
          onShouldStartLoadWithRequest={(request) => {
            // If we're loading the current URI, allow it to load
            AppLog.logForcefully(
              () =>
                "onShouldStartLoadWithRequest >>>>" +
                JSON.stringify(request)
            );
            return true;
          }}
          onNavigationStateChange={onNavigationStateChange}
          sharedCookiesEnabled={true}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  mainContainer: {
    flex: 1
  },
  leftArrow: {
    backgroundColor: Colors.white,
    elevation: 2,
    width: 32,
    height: 32,
    marginLeft: SPACE.lg,
    marginRight: SPACE.lg
  }
});

export default SSOLoginView;
