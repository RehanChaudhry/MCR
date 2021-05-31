import { SPACE } from "config";
import RelationModel from "models/RelationModel";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import ConnectRequestItem from "ui/components/organisms/friends/connect_request/ConnectRequestItem";

type Props = {
  data: RelationModel[] | undefined;
  removeItemFromList: (item: RelationModel) => void;
  isLoading: boolean;
  canLoadMore: boolean;
  error?: string;
  onPullToRefresh: (onComplete?: () => void) => void;
  onEndReached: () => void;
};

const listItem = (
  item: RelationModel,
  removeItemFromList: (item: RelationModel) => void
) => {
  const _item = new RelationModel(item);
  return (
    <ConnectRequestItem
      item={_item}
      removeItemFromList={removeItemFromList}
    />
  );
};

const ConnectRequestsView: FC<Props> = ({
  data,
  removeItemFromList,
  isLoading,
  canLoadMore,
  error,
  onPullToRefresh,
  onEndReached
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
          return listItem(item, removeItemFromList);
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
