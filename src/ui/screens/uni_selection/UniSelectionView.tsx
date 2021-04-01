import { SPACE } from "config";
import { usePreferredTheme } from "hooks";
import React, { FC, useState } from "react";
import { View, StyleSheet } from "react-native";
import ListItemSeparator from "ui/components/atoms/ListItemSeparator";
import { AppInputField } from "ui/components/molecules/appinputfield/AppInputField";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import UniSelectionCell from "../../components/organisms/uni_selection/UniSelectionCell";
import Search from "assets/images/search_icon.svg";
import { Uni } from "models/api_responses/UniSelectionResponseModel";
import Screen from "ui/components/atoms/Screen";
import { CardView } from "ui/components/atoms/CardView";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import MRCLogo from "assets/images/mcr_logo.svg";

type Props = {
  unis: Uni[];
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

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = unis.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
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
      topSafeAreaBackgroundColor={theme.themedColors.backgroundSecondary}>
      <View style={[styles.logoContainer]}>
        <AppImageBackground
          containerShape={CONTAINER_TYPES.SQUARE}
          icon={() => <MRCLogo width={264} height={82} />}
        />
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
            placeholder="Search univeristy by name"
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
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
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
