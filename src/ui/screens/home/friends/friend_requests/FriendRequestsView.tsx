import { FriendRequest } from "models/api_responses/FriendRequestsResponseModel";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import ConnectRequestItem from "ui/components/organisms/friends/connect_request/ConnectRequestItem";

type Props = {
  data: FriendRequest[];
  onPressApproved: (item: FriendRequest) => void;
  onPressDeclined: (item: FriendRequest) => void;
};

const listItem = (
  item: FriendRequest,
  onPressApproved: (item: FriendRequest) => void,
  onPressDeclined: (item: FriendRequest) => void
) => {
  return (
    <ConnectRequestItem
      title={item.title}
      subtitle={item.subtitle}
      profileImage={""}
      onPressApproved={() => {
        onPressApproved(item);
      }}
      onPressReject={() => {
        onPressDeclined(item);
      }}
    />
  );
};

const FriendRequestsView: FC<Props> = ({
  data,
  onPressApproved,
  onPressDeclined
}) => {
  return (
    <Screen style={styles.container}>
      <FlatListWithPb
        style={styles.list}
        shouldShowProgressBar={false}
        renderItem={({ item }) => {
          return listItem(
            item,
            (onPressApproved = onPressApproved),
            (onPressDeclined = onPressDeclined)
          );
        }}
        data={data}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  list: {
    width: "100%",
    height: "100%"
  }
});

export default FriendRequestsView;
