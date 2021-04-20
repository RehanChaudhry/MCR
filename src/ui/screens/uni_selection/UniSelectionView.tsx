import { SPACE } from "config";
import { usePreferredTheme } from "hooks";
import React, { FC, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import ListItemSeparator from "ui/components/atoms/ListItemSeparator";
import { AppInputField } from "ui/components/molecules/appinputfield/AppInputField";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import UniSelectionCell from "ui/components/organisms/uni_selection/UniSelectionCell";
import Search from "assets/images/search_icon.svg";
import { Uni } from "models/api_responses/UniSelectionResponseModel";
import Screen from "ui/components/atoms/Screen";
import { CardView } from "ui/components/atoms/CardView";
import Logo from "assets/images/mcr_logo.svg";

type Props = {
  unis?: Uni[];
  isLoading: boolean;
  isError?: string;
  didSelectItem: (item: Uni) => void;
};

const listItem = (item: Uni, onSelection: (item: Uni) => void) => {
  return <UniSelectionCell uni={item} onSelection={onSelection} />;
};

const UniSelectionView: FC<Props> = ({
  unis,
  isLoading,
  isError,
  didSelectItem
}) => {
  const theme = usePreferredTheme();

  const [filteredData, setFilteredData] = useState(unis);
  const [search, setSearch] = useState("");

  useLayoutEffect(() => {
    setFilteredData(unis);
  }, [unis]);

  const searchFilterFunction = (text: string) => {
    if (text) {
      const filteredUnis = unis?.filter(function (item) {
        return item.title.toLowerCase().indexOf(text.toLowerCase()) >= 0;
      });
      setFilteredData(filteredUnis);
      setSearch(text);
    } else {
      setFilteredData(unis);
      setSearch(text);
    }
  };

  return (
    <Screen
      style={[
        styles.container,
        { backgroundColor: theme.themedColors.backgroundSecondary }
      ]}
      topSafeAreaAndStatusBarColor={
        theme.themedColors.backgroundSecondary
      }>
      <View style={[styles.logoContainer]}>
        <Logo width={260} height={87} />
      </View>
      <CardView
        style={[
          styles.contentContainer,
          { backgroundColor: theme.themedColors.background }
        ]}>
        <View style={styles.searchFieldContainer}>
          <AppInputField
            viewStyle={[
              styles.searchField,
              { borderColor: theme.themedColors.border }
            ]}
            value={search}
            leftIcon={() => (
              <Search
                width={20}
                height={20}
                testID={"left-icon"}
                fill={theme.themedColors.interface[600]}
              />
            )}
            placeholder="Search university by name"
            onChangeText={(text) => searchFilterFunction(text)}
          />
        </View>
        <View style={styles.listContainer}>
          <FlatListWithPb
            error={isError}
            shouldShowProgressBar={isLoading}
            data={filteredData}
            renderItem={({ item }) => {
              return listItem(item, didSelectItem);
            }}
            style={styles.listStyle}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => <View style={styles.listHeader} />}
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
      </CardView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1
  },
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  image: {
    width: 260,
    height: 87
  },
  logoContainer: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center"
  },
  listContainer: {
    flex: 1
  },
  listHeader: {
    paddingTop: SPACE.md
  },
  listStyle: {
    flex: 1
  },
  searchFieldContainer: {
    paddingHorizontal: SPACE.lg,
    paddingTop: SPACE.lg,
    flexDirection: "row"
  },
  searchField: {
    borderWidth: 1
  },
  separator: {
    marginLeft: 68,
    marginRight: SPACE.lg
  }
});

export default UniSelectionView;
