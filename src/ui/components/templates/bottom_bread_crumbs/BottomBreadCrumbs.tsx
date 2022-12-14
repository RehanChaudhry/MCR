import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import BottomBreadCrumbsItem from "ui/components/templates/bottom_bread_crumbs/BottomBreadCrumbsItem";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { SPACE } from "config";

export type Item = {
  title: string;
  isDisable?: boolean;
  onPress: () => void;
};

type Props = {
  data: Item[];
};

const BottomBreadCrumbs: FC<Props> = ({ data }) => {
  const theme = usePreferredTheme();
  const [selectedId, setSelectedId] = useState(data[0].title);

  const renderItem = ({ item }: { item: Item }) => {
    const backgroundColor = item.isDisable
      ? theme.themedColors.interface[200]
      : item.title === selectedId
      ? theme.themedColors.primaryShade
      : theme.themedColors.interface[100];
    const textColor =
      item.title === selectedId
        ? theme.themedColors.primary
        : theme.themedColors.label;
    return (
      <BottomBreadCrumbsItem
        title={item.title}
        onPress={
          !item.isDisable
            ? () => {
                if (!item.isDisable) {
                  setSelectedId(item.title);
                  item.onPress();
                }
              }
            : undefined
        }
        style={{ backgroundColor, opacity: item.isDisable ? 0.5 : 1 }}
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
      <FlatListWithPb
        data={data}
        keyExtractor={(item, index) => item.title + index}
        renderItem={renderItem}
        horizontal={true}
        shouldShowProgressBar={true}
        style={styles.FlatList}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  FlatList: {
    paddingHorizontal: SPACE.sm,
    backgroundColor: "#FFFFFF"
  },
  horizontalLine: {
    height: 1
  }
});

export default BottomBreadCrumbs;
