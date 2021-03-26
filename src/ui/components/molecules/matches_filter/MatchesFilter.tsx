import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { usePreferredTheme } from "hooks";
import SearchField from "ui/components/atoms/search_field/SearchField";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import EGender, { genders } from "models/enums/EGender";
import { AppDropdown } from "ui/components/organisms/app_dropdown/AppDropdown";
import { moderateScale } from "config/Dimens";
import Selector from "assets/images/selector.svg";
import { shadowStyleProps } from "utils/Util";

interface Props {
  onFilterChange: (keyword?: string, gender?: EGender) => void;
}

const MatchesFilter: React.FC<Props> = ({ onFilterChange }: Props) => {
  const { themedColors } = usePreferredTheme();

  const keyword = useRef<string | undefined>();
  const gender = useRef<EGender>(EGender.ALL);

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
        searchIcon={true}
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
          <Selector fill={themedColors.interface[500]} />
        )}
        title={genders[0].title}
        items={genders}
        selectedItemCallback={(item) => {
          gender.current = item.id as EGender;
          onFilterChange(keyword.current, gender.current);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: SPACE.md,
    backgroundColor: "yellow",
    ...shadowStyleProps
  },
  search: {
    borderTopStartRadius: moderateScale(20),
    borderBottomStartRadius: moderateScale(20),
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
    height: moderateScale(40),
    flex: 3,
    borderEndWidth: StyleSheet.hairlineWidth
  },
  dropDown: {
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
    borderTopEndRadius: moderateScale(20),
    borderBottomEndRadius: moderateScale(20),
    height: moderateScale(40),
    flex: 2
  },
  searchText: { fontSize: FONT_SIZE._2xsm },
  genderText: { fontSize: FONT_SIZE._2xsm }
});

export default MatchesFilter;
