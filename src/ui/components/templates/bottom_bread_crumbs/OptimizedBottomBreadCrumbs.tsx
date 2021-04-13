import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import BottomBreadCrumbsItem from "ui/components/templates/bottom_bread_crumbs/BottomBreadCrumbsItem";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { SPACE } from "config";

export type OptimizedBBCItem<T> = {
  title: string;
  value: T;
};

type Props<T> = {
  data: OptimizedBBCItem<T>[];
  onPress?: (value: T) => void;
};

function OptimizedBottomBreadCrumbs<T>({ data, onPress }: Props<T>) {
  const theme = usePreferredTheme();
  const [selectedId, setSelectedId] = useState(data[0].title);

  const renderItem = ({ item }: { item: OptimizedBBCItem<T> }) => {
    const backgroundColor =
      item.title === selectedId
        ? theme.themedColors.primaryShade
        : theme.themedColors.interface[100];
    const textColor =
      item.title === selectedId
        ? theme.themedColors.primary
        : theme.themedColors.label;
    return (
      <BottomBreadCrumbsItem
        title={item.title}
        onPress={() => {
          setSelectedId(item.title);
          onPress?.(item.value);
        }}
        style={{ backgroundColor }}
        textStyle={{ color: textColor }}
      />
    );
  };

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: theme.themedColors.background }
      ]}>
      <View
        style={[
          styles.horizontalLine,
          { backgroundColor: theme.themedColors.separator }
        ]}
      />
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.title + index}
        renderItem={renderItem}
        horizontal={true}
        style={styles.flatList}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  flatList: {
    paddingHorizontal: SPACE.sm,
    backgroundColor: "#FFFFFF"
  },
  horizontalLine: {
    height: 1
  }
});

export default OptimizedBottomBreadCrumbs;
