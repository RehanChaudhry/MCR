import React from "react";
import { StyleSheet } from "react-native";
import Screen from "ui/components/atoms/Screen";

type Props = {};

export const MatchInfoView: React.FC<Props> = ({}: Props) => {
  return <Screen style={styles.container} />;
};

const styles = StyleSheet.create({
  container: { flex: 1 }
});
