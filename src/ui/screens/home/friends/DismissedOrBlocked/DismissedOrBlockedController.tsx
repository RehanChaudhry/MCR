import { COLORS, FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import {
  DismissedOrBlocked,
  DismissedOrBlockedResponseModel
} from "models/api_responses/DismissedOrBlockedResponseModel";
import React, { FC, useState } from "react";
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

type Props = {};

const DismissedOrBlockedController: FC<Props> = () => {
  const [showRestoreAlert, setShowRestoreAlert] = useState<boolean>(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

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

  const onPressDismissedLearnMore = () => {};
  const onPressBlockedLearnMore = () => {};

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
            headerTitle={"How does it work?"}
            headerSubtitle={
              "Dismissed list users will be hide from your matches."
            }
            learnMoreTitle={"Learnmore about dismissed list"}
            learnMoreAction={onPressDismissedLearnMore}
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
            headerTitle={"How does it work?"}
            headerSubtitle={
              "Blocked list users will be hide from your matches and cannot send you messages either."
            }
            learnMoreTitle={"Learnmore about blocked list"}
            learnMoreAction={onPressBlockedLearnMore}
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
