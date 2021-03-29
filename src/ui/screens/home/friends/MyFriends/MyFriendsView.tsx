import UserGroupIcon from "assets/images/icon_user_group.svg";
import { usePreferredTheme } from "hooks";
import {
  MyFriend,
  ROOMMATE_REQUEST_STATE
} from "models/api_responses/MyFriendsResponseModel";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import ConnectionItem, {
  CONNECTION_ACTION_STATE
} from "ui/components/organisms/friends/connection/ConnectionItem";
import ConnectionListHeader from "ui/components/organisms/friends/connection/ConnectionListHeader";

type Props = {
  data: MyFriend[];
  onPressChat: (item: MyFriend) => void;
  onPressAction: (item: MyFriend) => void;
  onPressCross: (item: MyFriend) => void;
  onPressReceivedFriendRequests: () => void;
};

const listItem = (
  item: MyFriend,
  onPressChat: (item: MyFriend) => void,
  onPressAction: (item: MyFriend) => void,
  onPressCross: (item: MyFriend) => void
) => {
  const actionButtonTitle: () => string = () => {
    switch (item.requestState) {
      case ROOMMATE_REQUEST_STATE.NONE:
        return "Roommate Request";
      case ROOMMATE_REQUEST_STATE.NOT_ELIGIBLE:
        return "Not Eligible";
      case ROOMMATE_REQUEST_STATE.REQUEST_SENT:
        return "Pending";
    }
  };

  const actionButtonState: () => CONNECTION_ACTION_STATE = () => {
    switch (item.requestState) {
      case ROOMMATE_REQUEST_STATE.NONE:
        return CONNECTION_ACTION_STATE.NORMAL;
      case ROOMMATE_REQUEST_STATE.NOT_ELIGIBLE:
        return CONNECTION_ACTION_STATE.DANGER;
      case ROOMMATE_REQUEST_STATE.REQUEST_SENT:
        return CONNECTION_ACTION_STATE.READONLY;
    }
  };

  return (
    <ConnectionItem
      title={item.title}
      subtitle={item.subtitle}
      profileImage={item.profileImage}
      actionButtonTitle={actionButtonTitle()}
      actionButtonState={actionButtonState()}
      shouldShowTopActionable={true}
      shouldShowLeftInfoIcon={
        actionButtonState() === CONNECTION_ACTION_STATE.DANGER
      }
      onPressAction={() => {
        onPressAction(item);
      }}
      onPressChat={() => {
        onPressChat(item);
      }}
      onPressCross={() => {
        onPressCross(item);
      }}
    />
  );
};

const MyFriendsView: FC<Props> = ({
  data,
  onPressAction,
  onPressChat,
  onPressCross,
  onPressReceivedFriendRequests
}) => {
  const theme = usePreferredTheme();
  return (
    <Screen shouldAddBottomInset={false}>
      <FlatListWithPb
        style={styles.list}
        shouldShowProgressBar={false}
        ListHeaderComponent={() => (
          <ConnectionListHeader
            title="Received 2 new friends request"
            detail={
              "You have currently 7 friends and received 2 new friend requests."
            }
            icon={() => (
              <UserGroupIcon
                fill={theme.themedColors.labelSecondary}
                width={18}
                height={18}
              />
            )}
            onPressAction={onPressReceivedFriendRequests}
          />
        )}
        renderItem={({ item }) => {
          return listItem(
            item,
            (onPressAction = onPressAction),
            (onPressChat = onPressChat),
            (onPressCross = onPressCross)
          );
        }}
        data={data}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
    height: "100%"
  }
});

export default MyFriendsView;
