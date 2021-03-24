import React from "react";
import { StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import ProfileMatch from "models/ProfileMatch";
import ProfileMatchItem from "ui/components/organisms/profile_match_item/ProfileMatchItem";
import MatchesFilter from "ui/components/molecules/matches_filter/MatchesFilter";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { SPACE } from "config";

type Props = {
  matches?: ProfileMatch[];
  pullToRefreshCallback: (onComplete: () => void) => void;
  onEndReached: () => void;
  isAllDataLoaded: boolean;
  postFriendRequest: (userId: number) => void;
  postMatchDismiss: (userId: number) => void;
};

export const MatchesView: React.FC<Props> = ({
  matches,
  pullToRefreshCallback,
  onEndReached,
  isAllDataLoaded,
  postFriendRequest,
  postMatchDismiss
}: Props) => {
  const renderItem = ({ item }: { item: ProfileMatch }) => (
    <ProfileMatchItem
      profileMatch={item}
      postFriendRequest={postFriendRequest}
      postMatchDismiss={postMatchDismiss}
    />
  );
  return (
    <Screen style={styles.container}>
      <MatchesFilter onFilterChange={(_, __) => {}} />
      <FlatListWithPb<ProfileMatch>
        style={styles.matchesList}
        shouldShowProgressBar={false}
        data={matches}
        renderItem={renderItem}
        contentContainerStyle={styles.matchesListContainer}
        ItemSeparatorComponent={() => (
          <View style={{ height: SPACE.md }} />
        )}
        onEndReached={onEndReached}
        pullToRefreshCallback={pullToRefreshCallback}
        isAllDataLoaded={isAllDataLoaded}
        keyExtractor={(item) => item.userId.toString()}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  matchesListContainer: { padding: SPACE.md },
  matchesList: { flex: 1 }
});
