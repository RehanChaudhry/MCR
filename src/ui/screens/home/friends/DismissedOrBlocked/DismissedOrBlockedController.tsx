import { COLORS, FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import {
  DismissedOrBlocked,
  DismissedOrBlockedResponseModel
} from "models/api_responses/DismissedOrBlockedResponseModel";
import React, { FC, useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useApi } from "repo/Client";
import FriendsApis from "repo/friends/FriendsApis";
import {
  Choice,
  SegmentedControl
} from "ui/components/molecules/segmented_control/SegmentedControl";
import AppPopUp from "ui/components/organisms/popup/AppPopUp";
import DataGenerator from "utils/DataGenerator";
import { AppLog } from "utils/Util";
import DismissedOrBlockedView from "./DismissedOrBlockedView";
import StaticContentResponseModel, {
  StaticContent
} from "models/api_responses/StaticContentResponseModel";
import StaticContentRequestModel, {
  StaticContentType
} from "models/api_requests/StaticContentRequestModel";
import OtherApis from "repo/home/OtherApis";
import { StackNavigationProp } from "@react-navigation/stack";
import { DismissedOrBlockStackParamList } from "routes/FriendsStack";
import { useNavigation } from "@react-navigation/native";
import EScreen from "models/enums/EScreen";

type Props = {};

type DismissBlockNavigationProp = StackNavigationProp<DismissedOrBlockStackParamList>;

const DismissedOrBlockedController: FC<Props> = () => {
  const [showRestoreAlert, setShowRestoreAlert] = useState<boolean>(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  const dismissBlockRootNavigation = useNavigation<DismissBlockNavigationProp>();

  const [dismissed, setDismissed] = useState<Array<DismissedOrBlocked>>(
    DataGenerator.getDismissedOrBlocked().data
  );

  const [blocked, setBlocked] = useState<Array<DismissedOrBlocked>>(
    DataGenerator.getDismissedOrBlocked().data
  );

  const dismissedApi = useApi<any, DismissedOrBlockedResponseModel>(
    FriendsApis.getDismissedOrBlocked
  );

  const blockedApi = useApi<any, DismissedOrBlockedResponseModel>(
    FriendsApis.getDismissedOrBlocked
  );

  // static content
  const [headerContent, setHeaderContent] = useState<StaticContent>();

  const staticContentApi = useApi<
    StaticContentRequestModel,
    StaticContentResponseModel
  >(OtherApis.staticContent);

  const getHeaderContent = useCallback(async () => {
    const {
      hasError,
      dataBody,
      errorBody
    } = await staticContentApi.request([
      { type: StaticContentType.DISMISSED_LIST }
    ]);
    if (hasError || dataBody === undefined) {
      AppLog.log("Unable to find header content " + errorBody);
      return;
    } else {
      setHeaderContent(dataBody.data);
    }
  }, [staticContentApi]);

  const moveToHeaderContent = useCallback(() => {
    dismissBlockRootNavigation.navigate("StaticContent", {
      isFrom: EScreen.MY_FRIENDS,
      staticContent: headerContent!
    });
  }, [dismissBlockRootNavigation, headerContent]);

  const handleDismissedResponse = async (onComplete?: () => void) => {
    const { hasError, dataBody, errorBody } = await dismissedApi.request(
      []
    );
    if (hasError || dataBody === undefined) {
      AppLog.log("Unable to find dismissed or blocked " + errorBody);
      return;
    } else {
      setDismissed(dataBody.data);
      onComplete?.();
    }
  };

  const handleBlockedResponse = async (onComplete?: () => void) => {
    const { hasError, dataBody, errorBody } = await blockedApi.request([]);
    if (hasError || dataBody === undefined) {
      AppLog.log("Unable to find dismissed or blocked " + errorBody);
      return;
    } else {
      setBlocked(dataBody.data);
      onComplete?.();
    }
  };

  AppLog.log(
    "handledismissedorblockedresponse: ",
    handleDismissedResponse,
    handleBlockedResponse
  );

  const theme = usePreferredTheme();

  const onTabChanged = (value: Choice, index: number) => {
    setSelectedTabIndex(index);
  };

  const restoreAlert = () => {
    return (
      <AppPopUp
        isVisible={showRestoreAlert}
        title={"Restore from Dismissed List"}
        message={
          "Are you sure you want to restore Aris Johnson from your dismissed list?"
        }
        actions={[
          {
            title: "Yes, restore",
            onPress: () => {
              setShowRestoreAlert(false);
            },
            style: {
              weight: "bold",
              style: {
                color: theme.themedColors.primary,
                textAlign: "center",
                fontSize: FONT_SIZE.lg
              }
            }
          },
          {
            title: "Cancel",
            onPress: () => {
              setShowRestoreAlert(false);
            }
          }
        ]}
      />
    );
  };

  useEffect(() => {
    getHeaderContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View>
          <View style={styles.segmentedControlContainer}>
            <SegmentedControl
              onChange={onTabChanged}
              values={[
                { label: "Dismissed", value: "0" },
                { label: "Blocked", value: "1" }
              ]}
            />
          </View>
          <View
            style={[
              styles.separator,
              { backgroundColor: theme.themedColors.separator }
            ]}
          />
        </View>
        {selectedTabIndex === 0 ? (
          <DismissedOrBlockedView
            headerTitle={headerContent?.title!}
            headerSubtitle={headerContent?.description!}
            learnMoreTitle={"Learnmore about dismissed list"}
            learnMoreAction={moveToHeaderContent}
            data={dismissed}
            onPressAction={(item: DismissedOrBlocked) => {
              AppLog.log("items: ", item);
              setShowRestoreAlert(true);
            }}
            onPressChat={(item: DismissedOrBlocked) => {
              AppLog.log("items: ", item);
            }}
            onPressCross={(item: DismissedOrBlocked) => {
              AppLog.log("items: ", item);
            }}
          />
        ) : (
          <DismissedOrBlockedView
            headerTitle={headerContent?.title!}
            headerSubtitle={headerContent?.description!}
            learnMoreTitle={"Learnmore about blocked list"}
            learnMoreAction={moveToHeaderContent}
            data={blocked}
            onPressAction={(item: DismissedOrBlocked) => {
              AppLog.log("items: ", item);
              setShowRestoreAlert(true);
            }}
            onPressChat={(item: DismissedOrBlocked) => {
              AppLog.log("items: ", item);
            }}
            onPressCross={(item: DismissedOrBlocked) => {
              AppLog.log("items: ", item);
            }}
          />
        )}
      </View>
      {restoreAlert()}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  segmentedControlContainer: {
    paddingLeft: SPACE.lg,
    paddingRight: SPACE.lg,
    paddingTop: SPACE.sm,
    paddingBottom: SPACE.sm,
    backgroundColor: COLORS.white
  },
  separator: {
    width: "100%",
    height: 0.5
  }
});

export default DismissedOrBlockedController;
