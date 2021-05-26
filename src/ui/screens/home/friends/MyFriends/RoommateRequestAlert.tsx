import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import { UpdateRelationApiRequestModel } from "models/api_requests/UpdateRelationApiRequestModel";
import { UpdateRelationApiResponseModel } from "models/api_responses/UpdateRelationApiResponseModel";
import RelationModel, { Status } from "models/RelationModel";
import React, { FC, useCallback, useContext, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useApi } from "repo/Client";
import RelationApis from "repo/home/RelationApis";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import AppPopUp from "ui/components/organisms/popup/AppPopUp";
import { MyFriendsContext } from "ui/screens/home/friends/MyFriends/MyFriendsController";
import { AppLog } from "utils/Util";

type Props = {
  shouldShow: boolean;
  getSelectedItem: () => RelationModel | undefined;
  hideSelf: () => void;
};

const RoommateRequestAlert: FC<Props> = React.memo(
  ({ shouldShow, getSelectedItem, hideSelf }) => {
    AppLog.log(
      "in RoommateRequestAlert, selectedItem: " +
        getSelectedItem()?.user?.firstName
    );

    const theme = usePreferredTheme();

    const { myFriends, setMyFriends } = useContext(MyFriendsContext);

    AppLog.log("User status: " + getSelectedItem()?.status);
    const changeStatus = useCallback(
      (friend: RelationModel | undefined, status: Status) => {
        if (!myFriends || !friend) {
          return;
        }

        let _myFriends = [...myFriends];
        let index = _myFriends.findIndex(
          (value) => value.id === friend.id
        );
        let updatedFriend: RelationModel = Object.assign(
          Object.create(friend),
          friend
        );
        updatedFriend.status = status;
        _myFriends.splice(index, 1, updatedFriend);

        AppLog.log("Changing friends to:" + JSON.stringify(_myFriends));

        setMyFriends(_myFriends);
      },
      [myFriends, setMyFriends]
    );

    const [shouldShowPb, setShouldShowPb] = useState(false);
    const sendRoommateRequestApi = useApi<
      UpdateRelationApiRequestModel,
      UpdateRelationApiResponseModel
    >(RelationApis.sendFriendOrRoommateRequest);

    async function sendRoommateRequest() {
      setShouldShowPb(true);

      const {
        hasError,
        errorBody,
        dataBody
      } = await sendRoommateRequestApi.request([
        {
          receiverId: getSelectedItem()?.user?.id?.toString() ?? ""
        }
      ]);

      if (hasError || dataBody === undefined) {
        Alert.alert("Unable to remove friend", errorBody);
        setShouldShowPb(false);
        return;
      } else {
        try {
          changeStatus(getSelectedItem(), Status.PENDING);
        } finally {
          hideSelf();
          setShouldShowPb(false);
        }
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