import React, { useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { usePreferredTheme } from "hooks";
import SearchField from "ui/components/atoms/search_field/SearchField";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import EGender, { genders } from "models/enums/EGender";
import { AppDropdown } from "ui/components/organisms/app_dropdown/AppDropdown";
import Selector from "assets/images/selector.svg";
import { shadowStyleProps } from "utils/Util";

interface Props {
  onFilterChange: (keyword?: string, gender?: EGender) => void;
}

const MatchesFilter: React.FC<Props> = ({ onFilterChange }: Props) => {
  const { themedColors } = usePreferredTheme();

  const keyword = useRef<string | undefined>();
  const gender = useRef<EGender>(EGender.ALL);

  const onChangeText = useCallback(
    (item) => {
      gender.current = item.id as EGender;
      onFilterChange(keyword.current, gender.current);
    },
    [onFilterChange]
  );

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
        onChangeText={(textToSearch?: string) => {
          keyword.current = textToSearch;
          onFilterChange(keyword.current, gender.current);
        }}
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
        title={genders[0].title}
        items={genders}
        selectedItemCallback={onChangeText}
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
