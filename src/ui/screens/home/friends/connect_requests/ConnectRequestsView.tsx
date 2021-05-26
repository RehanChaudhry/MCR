import { SPACE, STRINGS } from "config";
import RelationModel from "models/RelationModel";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import ConnectRequestItem from "ui/components/organisms/friends/connect_request/ConnectRequestItem";

type Props = {
  data: RelationModel[] | undefined;
  onPressApproved: (item: RelationModel) => void;
  onPressDeclined: (item: RelationModel) => void;
  onPressApprovedShowPb: boolean;
  onPressDeclinedShowPb: boolean;
  isLoading: boolean;
  canLoadMore: boolean;
  error?: string;
  onPullToRefresh: (onComplete?: () => void) => void;
  onEndReached: () => void;
};

const listItem = (
  item: RelationModel,
  onPressApproved: (item: RelationModel) => void,
  onPressDeclined: (item: RelationModel) => void,
  onPressApprovedShowPb: boolean,
  onPressDeclinedShowPb: boolean
) => {
  const _item = new RelationModel(item);
  return (
    <ConnectRequestItem
      title={_item.user?.getFullName() ?? ""}
      subtitle={`${_item.user?.hometown ?? STRINGS.common.not_found}, ${
        _item.user?.major ?? STRINGS.common.not_found
      }`}
      profileImage={_item.user?.profilePicture?.fileURL ?? ""}
      onPressApproved={() => {
        onPressApproved(_item);
      }}
      onPressApprovedShowPb={onPressApprovedShowPb}
      onPressReject={() => {
        onPressDeclined(_item);
      }}
      onPressDeclinedShowPb={onPressDeclinedShowPb}
    />
  );
};

const ConnectRequestsView: FC<Props> = ({
  data,
  onPressApproved,
  onPressDeclined,
  isLoading,
  canLoadMore,
  error,
  onPullToRefresh,
  onEndReached,
  onPressApprovedShowPb,
  onPressDeclinedShowPb
}) => {
  return (
    <Screen style={styles.container}>
      <FlatListWithPb
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => {
          return <View style={styles.header} />;
        }}
        style={styles.list}
        shouldShowProgressBar={isLoading}
        isAllDataLoaded={!canLoadMore}
        onEndReached={onEndReached}
        pullToRefreshCallback={onPullToRefresh}
        error={error}
        renderItem={({ item }) => {
          return listItem(
            item,
            onPressApproved,
            onPressDeclined,
            onPressApprovedShowPb,
            onPressDeclinedShowPb
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
  header: {
    padding: SPACE._2xs
  },
  list: {
    width: "100%",
    height: "100%"
  }
});

export default ConnectRequestsView;
