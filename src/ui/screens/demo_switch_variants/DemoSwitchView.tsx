import { StyleSheet } from "react-native";
import React from "react";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { DemoSwitchItem } from "./DemoSwitchItem";
import { ThemeSwitcher } from "ui/components/templates/ThemeSwitcher";
type Props = {
  data: Array<Object>;
};

const listItem = ({ item }: { item: any }) => (
  <DemoSwitchItem item={item} />
);

export const DemoSwitchView = React.memo<Props>(({ data }) => {
  return (
    <ThemeSwitcher>
      <FlatListWithPb
        shouldShowProgressBar={false}
        data={data}
        renderItem={listItem}
        style={styles.flatListStyle}
      />
    </ThemeSwitcher>
  );
});

const styles = StyleSheet.create({
  flatListStyle: {
    marginVertical: 0
  }
});
