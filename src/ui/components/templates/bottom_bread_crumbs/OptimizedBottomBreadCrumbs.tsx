import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { SPACE } from "config";
import OptimizedBottomBreadCrumbsItem from "./OptimizedBottomBreadCrumbsItem";

export type OptimizedBBCItem<T> = {
  title: string;
  value?: T;
};

type Props<T> = {
  data: OptimizedBBCItem<T>[];
  onPress?: (value?: T) => void;
};

function OptimizedBottomBreadCrumbs<T>({ data, onPress }: Props<T>) {
  const theme = usePreferredTheme();
  const [selectedPosition, setSelectedPosition] = useState(0);

  const renderItem = ({
    item,
    index
  }: {
    item: OptimizedBBCItem<T>;
    index: number;
  }) => {
    const backgroundColor =
      index === selectedPosition
        ? theme.themedColors.primaryShade
        : theme.themedColors.interface[100];
    const textColor =
      index === selectedPosition
        ? theme.themedColors.primary
        : theme.themedColors.label;
    return (
      <OptimizedBottomBreadCrumbsItem
        title={item.title}
        onPress={() => {
          setSelectedPosition(index);
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
        {
          backgroundColor: theme.themedColors.background,
          borderColor: theme.themedColors.separator
        }
      ]}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.title + index}
        renderItem={renderItem}
        horizontal={true}
        contentContainerStyle={styles.flatList}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={styles.itemSeparator} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    justifyContent: "flex-end",
    borderWidth: StyleSheet.hairlineWidth
  },
  flatList: {
    paddingHorizontal: SPACE.md,
    paddingVertical: SPACE._2md,
    backgroundColor: "#FFFFFF"
  },
  itemSeparator: { width: SPACE._2md }
});

export default OptimizedBottomBreadCrumbs;
