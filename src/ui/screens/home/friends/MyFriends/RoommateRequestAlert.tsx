import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import { UpdateRelationApiRequestModel } from "models/api_requests/UpdateRelationApiRequestModel";
import { UpdateRelationApiResponseModel } from "models/api_responses/UpdateRelationApiResponseModel";
import RelationModel from "models/RelationModel";
import React, { FC, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import RoomApis from "repo/auth/RoomApis";
import { useApi } from "repo/Client";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import AppPopUp from "ui/components/organisms/popup/AppPopUp";
import { AppLog } from "utils/Util";

type Props = {
  shouldShow: boolean;
  getSelectedItem: () => RelationModel | undefined;
  hideSelf: () => void;
};

const RoommateRequestAlert: FC<Props> = React.memo(
  ({ shouldShow, getSelectedItem, hideSelf }) => {
    AppLog.log("in RemoveFriendAlert");

    const theme = usePreferredTheme();

    const [shouldShowPb, setShouldShowPb] = useState(false);
    const sendRoommateRequestApi = useApi<
      UpdateRelationApiRequestModel,
      UpdateRelationApiResponseModel
    >(RoomApis.sendFriendOrRoommateRequest);

    async function sendRoommateRequest() {
      setShouldShowPb(true);

      const {
        hasError,
        errorBody,
        dataBody
      } = await sendRoommateRequestApi.request([
        {
          recieverId: getSelectedItem()?.id?.toString() ?? ""
        }
      ]);

      if (hasError || dataBody === undefined) {
        Alert.alert("Unable to remove friend", errorBody);
        setShouldShowPb(false);
        return;
      }
    }

    return (
      <AppPopUp
        isVisible={shouldShow}
        title={"Roommate Request"}
        message={`Are you sure you want to send roommate request to ${
          getSelectedItem()?.user?.getFullName() ?? "N/A"
        }?`}
        customActionButtons={
          <View>
            <View
              style={[
                styles.separator,
                { backgroundColor: theme.themedColors.separator }
              ]}
            />
            <AppButton
              text="Yes, send request"
              style={styles.actionContainer}
              shouldShowProgressBar={shouldShowPb}
              onPress={() => {
                sendRoommateRequest();
              }}
              textStyle={[
                styles.actionStyle,
                {
                  color: theme.themedColors.primary,
                  textAlign: "center",
                  fontSize: FONT_SIZE.base
                }
              ]}
              fontWeight="semi-bold"
            />
            <View
              style={[
                styles.separator,
                { backgroundColor: theme.themedColors.separator }
              ]}
            />
            <AppButton
              text="Cancel"
              style={styles.actionContainer}
              onPress={() => {
                hideSelf();
              }}
              textStyle={[
                styles.actionStyle,
                {
                  color: theme.themedColors.label,
                  fontSize: FONT_SIZE.base
                }
              ]}
            />
          </View>
        }
      />
    );
  }
);

const styles = StyleSheet.create({
  actionStyle: {
    textAlign: "center",
    fontSize: FONT_SIZE.lg
  },
  actionContainer: {
    padding: SPACE.md
  },
  separator: {
    height: 0.5
  }
});
export default RoommateRequestAlert;
