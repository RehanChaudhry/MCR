import { SPACE } from "config";
import { usePreferredTheme } from "hooks";
import React, { FC, useState } from "react";
import { View, StyleSheet } from "react-native";
import ListItemSeparator from "ui/components/atoms/ListItemSeparator";
import { AppInputField } from "ui/components/molecules/appinputfield/AppInputField";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import UniSelectionCell from "../../components/organisms/uni_selection/UniSelectionCell";
import Search from "assets/images/search_icon.svg";

type Props = {};

export interface Uni {
  id: string;
  name: string;
  location: string;
  logo: string;
}

const data: Uni[] = [
  {
    id: "1",
    name: "Ohio University",
    location: "Athens, Ohio",
    logo: ""
  },
  {
    id: "2",
    name: "Boise State University",
    location: "Boise, Idaho",
    logo: ""
  }
];

const listItem = ({ item }: { item: Uni }) => (
  <UniSelectionCell uni={item} />
);

const UniSelectionView: FC<Props> = () => {
  const theme = usePreferredTheme();

  const [filteredData, setFilteredData] = useState(data);
  const [search, setSearch] = useState("");

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = data.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(data);
      setSearch(text);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.themedColors.backgroundSecondary }
      ]}>
      <View style={[styles.logoContainer]} />
      <View
        style={[
          styles.contentContainer,
          { backgroundColor: theme.themedColors.background }
        ]}>
        <View style={styles.searchFieldContainer}>
          <AppInputField
            value={search}
            leftIcon={() => (
              <Search
                width={20}
                height={20}
                testID={"left-icon"}
                fill={theme.themedColors.interface[600]}
              />
            )}
            placeholder="Search univeristy by name"
            onChangeText={(text) => searchFilterFunction(text)}
          />
        </View>
        <View style={styles.listContainer}>
          <FlatListWithPb
            shouldShowProgressBar={false}
            data={filteredData}
            renderItem={listItem}
            style={styles.listStyle}
            ItemSeparatorComponent={() => (
              <ListItemSeparator
                style={[
                  styles.separator,
                  { backgroundColor: theme.themedColors.separator }
                ]}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1
  },
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32
  },
  logoContainer: {
    width: "100%",
    height: 200
  },
  searchFieldContainer: {
    paddingLeft: SPACE.lg,
    paddingRight: SPACE.lg,
    paddingTop: SPACE.lg
  },
  listContainer: {
    flex: 1
  },
  listStyle: {
    flex: 1
  },
  separator: {
    marginLeft: 68,
    marginRight: SPACE.lg
  }
});

export default UniSelectionView;
