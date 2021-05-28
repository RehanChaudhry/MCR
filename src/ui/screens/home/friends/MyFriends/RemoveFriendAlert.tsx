import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import RelationModel from "models/RelationModel";
import React, { FC, useCallback, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { MyFriendsContext } from "ui/screens/home/friends/MyFriendsProvider";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import AppPopUp from "ui/components/organisms/popup/AppPopUp";
import useUpdateRelation from "ui/screens/home/friends/useUpdateRelation";

type Props = {
  shouldShow: boolean;
  getSelectedItem: () => RelationModel | undefined;
  hideSelf: () => void;
};

const RemoveFriendAlert: FC<Props> = React.memo(
  ({ shouldShow, getSelectedItem, hideSelf }) => {
    const theme = usePreferredTheme();
    const { myFriends, setMyFriends } = useContext(MyFriendsContext);

    const onFriendRemoved = useCallback(
      (id: number) => {
        setMyFriends?.(myFriends?.filter((value) => value.id !== id));
      },
      [myFriends, setMyFriends]
    );

    const { shouldShowPb, updateRelation } = useUpdateRelation(
      "unfriend",
      "Unable to remove friend",
      hideSelf,
      () => {
        onFriendRemoved(getSelectedItem()?.id ?? -1);
      }
    );

    return (
      <AppPopUp
        isVisible={shouldShow}
        title="Remove Friend"
        message={`Are you sure you want to remove ${
          getSelectedItem()?.user?.getFullName() ?? "N/A"
        } from your friends list?`}
        customActionButtons={
          <View>
            <View
              style={[
                styles.separator,
                { backgroundColor: theme.themedColors.separator }
              ]}
            />
            <AppButton
              text="Yes, remove"
              style={styles.actionContainer}
              shouldShowProgressBar={shouldShowPb}
              onPress={() => {
                updateRelation(getSelectedItem());
              }}
              textStyle={[
                styles.actionStyle,
                {
                  color: theme.themedColors.danger,
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
export default RemoveFriendAlert;
