import React from "react";
import { StyleSheet } from "react-native";
import Screen from "ui/components/atoms/Screen";
import ProfileMatch from "models/ProfileMatch";
import DataGenerator from "utils/DataGenerator";
import ProfileMatchItem from "ui/components/organisms/profile_match_item/ProfileMatchItem";
import MatchesFilter from "ui/components/molecules/matches_filter/MatchesFilter";

type Props = {
  matches?: ProfileMatch[];
  pullToRefreshCallback: (onComplete: () => void) => void;
  onEndReached: () => void;
  isAllDataLoaded: boolean;
  postFriendRequest: (userId: number) => void;
  postMatchDismiss: (userId: number) => void;
};

export const MatchesView: React.FC<Props> = ({}: Props) => {
  const profileMatchesItem = (item: ProfileMatch) => (
    <ProfileMatchItem profileMatch={item} />
  );
  return (
    <Screen style={styles.container}>
      <MatchesFilter onFilterChange={(_, __) => {}} />
      {profileMatchesItem(DataGenerator.getProfileMatch(0))}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {}
});
