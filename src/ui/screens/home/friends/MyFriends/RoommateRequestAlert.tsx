import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import RelationModel, { Status } from "models/RelationModel";
import React, { FC, useCallback, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import AppPopUp from "ui/components/organisms/popup/AppPopUp";
import { MyFriendsContext } from "ui/screens/home/friends/FriendsController";
import useSendFriendOrRoommateRequest from "ui/screens/home/friends/useSendFriendOrRoommateRequest";

type Props = {
  shouldShow: boolean;
  getSelectedItem: () => RelationModel | undefined;
  hideSelf: () => void;
};

const RoommateRequestAlert: FC<Props> = React.memo(
  ({ shouldShow, getSelectedItem, hideSelf }) => {
    const theme = usePreferredTheme();

    const { myFriends, setMyFriends } = useContext(MyFriendsContext);

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

        setMyFriends?.(_myFriends);
      },
      [myFriends, setMyFriends]
    );

    const { shouldShowPb, sendRequest } = useSendFriendOrRoommateRequest(
      "Unable to send friend request",
      hideSelf,
      () => {
        changeStatus(getSelectedItem(), Status.PENDING);
      }
    );

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
                sendRequest(getSelectedItem());
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
