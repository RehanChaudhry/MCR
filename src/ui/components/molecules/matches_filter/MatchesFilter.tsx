import React, { useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { usePreferredTheme } from "hooks";
import SearchField from "ui/components/atoms/search_field/SearchField";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import { AppDropdown } from "ui/components/organisms/app_dropdown/AppDropdown";
import Selector from "assets/images/selector.svg";
import { AppLog, shadowStyleProps } from "utils/Util";
import { MatchesGenderResponseModel } from "models/api_responses/MatchesGenderResponseModel";
import { DropDownItem } from "models/DropDownItem";

interface Props {
  onFilterChange: (keyword?: string, gender?: string) => void;
  matchesGenderFilter: MatchesGenderResponseModel;
}

const MatchesFilter: React.FC<Props> = ({
  onFilterChange,
  matchesGenderFilter
}: Props) => {
  const { themedColors } = usePreferredTheme();

  const keyword = useRef<string | undefined>();
  let genderDropDownItems: DropDownItem[] = [
    {
      text: "0",
      value: "All Genders"
    }
  ];

  const onGenderChange = useCallback(
    (item) => {
      AppLog.logForcefully(
        () => "in onGenderChange()..." + JSON.stringify(item)
      );

      onFilterChange(
        keyword.current,
        item.value === "All Genders" ? "" : item.value
      );
    },
    [onFilterChange]
  );

  const onKeywordChange = useCallback(
    (textToSearch?: string) => {
      AppLog.logForcefully(() => "in onKeywordChange()...");
      keyword.current = textToSearch;
      onFilterChange(keyword.current);
    },
    [onFilterChange]
  );

  matchesGenderFilter?.data !== undefined &&
    matchesGenderFilter?.data?.forEach((item) => {
      genderDropDownItems.push({
        text: item.id.toString(),
        value: item.title
      });
    });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themedColors.background }
      ]}>
      <SearchField
        style={[
          styles.search,
          {
            backgroundColor: themedColors.interface[100],
            borderColor: themedColors.separator
          }
        ]}
        textStyle={styles.searchText}
        placeholder={STRINGS.matches.placeholder_search_keyword}
        onChangeText={onKeywordChange}
        clearIcon={true}
        iconColor={themedColors.interface[500]}
      />
      <AppDropdown
        style={[
          styles.dropDown,
          { backgroundColor: themedColors.interface[100] }
        ]}
        textStyle={styles.genderText}
        shouldShowCustomIcon={true}
        dropDownIcon={() => (
          <Selector
            fill={themedColors.interface[500]}
            width={20}
            height={20}
          />
        )}
        preselectedItemString={genderDropDownItems[0].value}
        items={genderDropDownItems}
        selectedItemCallback={onGenderChange}
        shouldRunCallbackOnStart={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: SPACE.sm,
    paddingHorizontal: SPACE.md,
    backgroundColor: "yellow",
    ...shadowStyleProps
  },
  search: {
    borderTopStartRadius: 21,
    borderBottomStartRadius: 21,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
    height: 42,
    flex: 3,
    borderEndWidth: StyleSheet.hairlineWidth
  },
  dropDown: {
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
    borderTopEndRadius: 21,
    borderBottomEndRadius: 21,
    height: 42,
    flex: 2
  },
  searchText: { fontSize: FONT_SIZE.sm },
  genderText: { fontSize: FONT_SIZE.sm }
});

export default MatchesFilter;
