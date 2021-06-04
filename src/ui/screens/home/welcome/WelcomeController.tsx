import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { WelcomeView } from "ui/screens/home/welcome/WelcomeView";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { usePreferredTheme, usePreventDoubleTap } from "hooks";
import RightArrow from "assets/images/right.svg";
import { WelcomeStackParamList } from "routes/WelcomeStack";
import EScreen from "models/enums/EScreen";
import { useApi } from "repo/Client";
import StaticContentResponseModel from "models/api_responses/StaticContentResponseModel";
import OtherApis from "repo/home/OtherApis";
import { AppLog } from "utils/Util";
import { StaticContentType } from "models/api_requests/StaticContentRequestModel";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import ProgressErrorView from "ui/components/templates/progress_error_view/ProgressErrorView";
import { View } from "react-native";

type WelcomeNavigationProp = StackNavigationProp<
  WelcomeStackParamList,
  "Welcome"
>;

type Props = {};

const WelcomeController: FC<Props> = () => {
  const navigation = useNavigation<WelcomeNavigationProp>();
  const theme = usePreferredTheme();
  const [
    staticContent,
    setStaticContent
  ] = useState<StaticContentResponseModel>();

  // Static Content API
  const staticContentApi = useApi<any, StaticContentResponseModel>(
    OtherApis.staticContent
  );

  const requestModel = {
    type: StaticContentType.WELCOME_GUIDE
  };

  const openUpdateProfileScreen = usePreventDoubleTap(() => {
    navigation.navigate("UpdateProfile", {
      isFrom: EScreen.WELCOME,
      updateProfile: false
    });
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightTextWithIcon
          onPress={openUpdateProfileScreen}
          text="Skip"
          textStyle={{ color: theme.themedColors.interface["700"] }}
          icon={() => {
            return (
              <RightArrow
                width={20}
                height={20}
                fill={theme.themedColors.interface["700"]}
              />
            );
          }}
        />
      ),
      headerTitleAlign: "center",
      headerTitle: () => <HeaderTitle text="Watch Video" />
    });
  }, [navigation, openUpdateProfileScreen, theme]);

  const handleGetStaticContentApi = async () => {
    const {
      hasError,
      dataBody,
      errorBody
    } = await staticContentApi.request([requestModel]);
    if (hasError || dataBody === undefined) {
      // Alert.alert("Unable to find questions " + errorBody);
      AppLog.log("Unable to find Static Content " + errorBody);
      return;
    } else {
      AppLog.logForcefully("data found ");
      setStaticContent(dataBody);
    }
  };

  useEffect(() => {
    AppLog.logForcefully("Wlcome COntroller use effect ");
    handleGetStaticContentApi().then().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProgressErrorView
      isLoading={staticContentApi.loading}
      error={staticContentApi.error}
      errorView={(message) => {
        return (
          <View>
            <AppLabel text={message} />
          </View>
        );
      }}
      data={staticContent}>
      <WelcomeView
        openUpdateProfileScreen={openUpdateProfileScreen}
        staticContent={staticContent?.data!!}
      />
    </ProgressErrorView>
  );
};

export default WelcomeController;
