import React from "react";
import { StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { SPACE } from "config";
import { User } from "models/User";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { ItemLikedBy } from "ui/components/molecules/announcement_footer/ItemlikedBy";

type Props = {
  data: User[] | undefined;
  pullToRefreshCallback: (onComplete?: () => void) => void;
  onEndReached: () => void;
  shouldShowProgressBar: boolean;
  isAllDataLoaded: boolean;
  error: string | undefined;
  onchatButtonClicked: (user: User) => void;
  moveToProfileScreen: (user: User) => void;
};

export const SeeLikesView = React.memo<Props>(
  ({
    data,
    pullToRefreshCallback,
    onEndReached,
    shouldShowProgressBar,
    isAllDataLoaded,
    error,
    onchatButtonClicked,
    moveToProfileScreen
  }) => {
    const renderItem = ({ item }: { item: User }) => {
      return (
        <ItemLikedBy
          item={new User(item)}
          onchatButtonClicked={onchatButtonClicked}
          onPress={moveToProfileScreen}
        />
      );
    };

    return (
      <Screen style={styles.container}>
        <FlatListWithPb
          removeClippedSubviews={true}
          shouldShowProgressBar={shouldShowProgressBar}
          data={data}
          style={[styles.list]}
          renderItem={renderItem}
          keyExtractor={(item: User) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          error={error}
          noRecordFoundText={"Be the first one to like!"}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparator} />
          )}
          onEndReached={onEndReached}
          isAllDataLoaded={isAllDataLoaded}
          pullToRefreshCallback={pullToRefreshCallback}
        />
      </Screen>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1
  },
  list: {
    flex: 1
  },
  messageContainer: {},
  listContainer: { padding: SPACE.lg },
  itemSeparator: {
    height: SPACE.lg
  }
});
