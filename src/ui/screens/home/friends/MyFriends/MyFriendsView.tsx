import UserGroupIcon from "assets/images/icon_user_group.svg";
import { usePreferredTheme } from "hooks";
import {
  MyFriend,
  RELATION_REQUEST_STATUS
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
  isLoading: boolean;
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
    if (item.criteria.eligible) {
      if (item.status === RELATION_REQUEST_STATUS.PENDING) {
        return "Pending Request";
      } else if (item.status === RELATION_REQUEST_STATUS.ACCEPTED) {
        return "Roommate Request";
      } else {
        return "Unknown";
      }
    } else {
      return "Not Eligible";
    }
  };

  const actionButtonState: () => CONNECTION_ACTION_STATE = () => {
    if (item.criteria.eligible) {
      if (item.status === RELATION_REQUEST_STATUS.PENDING) {
        return CONNECTION_ACTION_STATE.READONLY;
      } else {
        return CONNECTION_ACTION_STATE.NORMAL;
      }
    } else {
      return CONNECTION_ACTION_STATE.DANGER;
    }
  };

  return (
    <ConnectionItem
      title={item.friend.firstName + " " + item.friend.lastName}
      subtitle={item.friend.matchGroupName}
      profileImage={item.friend.profilePicture.fileURL}
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
  isLoading,
  onPressAction,
  onPressChat,
  onPressCross,
  onPressReceivedFriendRequests
}) => {
  const theme = usePreferredTheme();
  return (
    <Screen shouldAddBottomInset={false}>
      <FlatListWithPb
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        shouldShowProgressBar={isLoading}
        ListHeaderComponent={() => (
          <ConnectionListHeader
            title="Received 2 new friend requests"
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
          return listItem(item, onPressChat, onPressAction, onPressCross);
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
