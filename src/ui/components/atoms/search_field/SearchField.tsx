import { COLORS, FONTS, FONT_SIZE, SPACE } from "config";
import useEffectWithSkipFirstTime from "hooks/useEffectWithSkipFirstTime";
import React, { useRef, useState } from "react";
import { usePreferredTheme } from "hooks";
import Search from "assets/images/search_icon.svg";
import Cross from "assets/images/cross.svg";
import {
  Keyboard,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { Color } from "react-native-svg";
import { optimizedMemoWithStyleProp } from "ui/components/templates/optimized_memo/optimized_memo";

interface OwnProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  placeholder: string;
  onChangeText: (textToSearch: string) => void;
  searchIcon?: React.ReactElement;
  iconColor?: Color;
  clearIcon: boolean;
  delayBeforeCallingOnChangeText?: number;
  shouldNotOptimize?: boolean;
}

type Props = OwnProps;

const SearchField = optimizedMemoWithStyleProp<Props>(
  ({
    placeholder,
    style,
    textStyle,
    onChangeText,
    searchIcon,
    iconColor,
    clearIcon,
    delayBeforeCallingOnChangeText = 1000
  }) => {
    const [currentSearchText, setCurrentSearchText] = useState("");
    const theme = usePreferredTheme();

    let _searchIcon = useRef(
      searchIcon ?? (
        <Search
          style={styles.leftIcon}
          testID={"left-icon"}
          fill={iconColor ?? theme.themedColors.interface[600]}
        />
      )
    );

    useEffectWithSkipFirstTime(() => {
      const timeoutRef = setTimeout(() => {
        onChangeText(currentSearchText);
      }, delayBeforeCallingOnChangeText);

      return () => {
        clearTimeout(timeoutRef);
      };
    });

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.themedColors.primary
          },
          style
        ]}>
        {_searchIcon.current}
        <TextInput
          value={currentSearchText}
          placeholderTextColor={theme.themedColors.interface[600]}
          placeholder={placeholder}
          numberOfLines={1}
          testID="SEARCH"
          style={[
            styles.textInput,
            { color: theme.themedColors.label },
            textStyle
          ]}
          onChangeText={setCurrentSearchText}
        />

        {clearIcon && currentSearchText !== "" && (
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              setCurrentSearchText("");
            }}>
            <Cross
              width={14}
              height={14}
              testID={"right-icon"}
              style={styles.rightIcon}
              fill={iconColor ?? theme.themedColors.interface[600]}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
)(["style", "textStyle"]);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    // paddingTop: SPACE.md - 1,
    // paddingBottom: SPACE.md - 1,
    paddingLeft: SPACE.md,
    paddingRight: SPACE.md,
    borderRadius: 10
  },
  leftIcon: {
    aspectRatio: 1,
    marginRight: SPACE._2md
  },
  rightIcon: {
    aspectRatio: 1,
    marginLeft: 8
  },
  textInput: {
    fontFamily: FONTS.regular,
    flex: 1,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textColor1
  },
  textInputSmallFont: {
    fontFamily: FONTS.regular,
    flex: 1,
    fontSize: FONT_SIZE.xs,
    padding: 0,
    color: COLORS.textColor1
  }
});

export default SearchField;
