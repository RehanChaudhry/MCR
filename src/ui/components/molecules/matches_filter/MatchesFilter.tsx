import React, { useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { usePreferredTheme } from "hooks";
import SearchField from "ui/components/atoms/search_field/SearchField";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import EGender, { genders } from "models/enums/EGender";
import { AppDropdown } from "ui/components/organisms/app_dropdown/AppDropdown";
import Selector from "assets/images/selector.svg";
import { AppLog, shadowStyleProps } from "utils/Util";

interface Props {
  onFilterChange: (keyword?: string, gender?: EGender) => void;
}

const MatchesFilter: React.FC<Props> = ({ onFilterChange }: Props) => {
  const { themedColors } = usePreferredTheme();

  const keyword = useRef<string | undefined>();
  const gender = useRef<EGender>();

  const onGenderChange = useCallback(
    (item) => {
      AppLog.logForcefully(() => "in onGenderChange()...");

      gender.current = item.text as EGender;
      onFilterChange(keyword.current, gender.current);
    },
    [onFilterChange]
  );

  const onKeywordChange = useCallback(
    (textToSearch?: string) => {
      AppLog.logForcefully(() => "in onKeywordChange()...");
      keyword.current = textToSearch;
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
        preselectedItemString={genders[0].value}
        items={genders}
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
