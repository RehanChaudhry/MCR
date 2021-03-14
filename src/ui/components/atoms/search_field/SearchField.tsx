import { COLORS, FONTS, FONT_SIZE } from "config";
import { moderateScale } from "config/Dimens";
import useEffectWithSkipFirstTime from "hooks/useEffectWithSkipFirstTime";
import React, { useState } from "react";
import { usePreferredTheme } from "hooks";
import {
  Image,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";

interface OwnProps {
  style?: StyleProp<ViewStyle>;
  placeholder: string;
  onChangeText: (textToSearch?: string) => void;
  leftIcon: boolean;
  rightIcon: boolean;
  borderType?: BORDER_TYPE;
}

type Props = OwnProps;

export enum BORDER_TYPE {
  DASHED = "dashed",
  SOLID = "solid",
  DOTTED = "dotted"
}

export const SearchField = React.memo<Props>(
  ({
    placeholder,
    style,
    onChangeText,
    leftIcon,
    rightIcon,
    borderType
  }) => {
    const [currentSearchText, setCurrentSearchText] = useState("");
    const theme = usePreferredTheme();

    useEffectWithSkipFirstTime(() => {
      const timeoutRef = setTimeout(() => {
        onChangeText(currentSearchText);
      }, 1500);

      return () => {
        clearTimeout(timeoutRef);
      };
    }, [currentSearchText, onChangeText]);

    const getBorderStyle = () => {
      if (borderType === BORDER_TYPE.DASHED) {
        return styles.dashedBorderStyle;
      } else if (borderType === BORDER_TYPE.SOLID) {
        return styles.solidBorderStyle;
      } else if (borderType === BORDER_TYPE.DOTTED) {
        return styles.dottedBorderStyle;
      }
    };

    return (
      <View
        style={[
          getBorderStyle(),
          styles.container,
          {
            backgroundColor: theme.themedColors.primaryBackground,
            borderColor: theme.themedColors.primaryLabelColor
          },
          style
        ]}>
        {leftIcon && (
          <Image
            style={[
              styles.leftIcon,
              { tintColor: theme.themedColors.primaryLabelColor }
            ]}
            resizeMethod="scale"
            testID="left-icon"
            source={require("assets/images/search_icon.png")}
          />
        )}
        <TextInput
          value={currentSearchText}
          placeholderTextColor={COLORS.placeholderTextColor}
          placeholder={placeholder}
          numberOfLines={1}
          testID="SEARCH"
          style={[
            leftIcon ? styles.textInput : styles.textInput,
            { color: theme.themedColors.primaryLabelColor }
          ]}
          onChangeText={setCurrentSearchText}
        />

        {rightIcon && (
          <TouchableOpacity onPress={() => setCurrentSearchText("")}>
            <Image
              style={[
                styles.rightIcon,
                { tintColor: theme.themedColors.primaryLabelColor }
              ]}
              resizeMethod="scale"
              testID="right-icon"
              source={require("assets/images/cross.png")}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    height: 40,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 8,
    paddingTop: 2.5,
    paddingBottom: 2.5,
    borderRadius: 10,
    // shadow for ios
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    // shadow for android
    elevation: 2
  },
  leftIcon: {
    width: moderateScale(12),
    aspectRatio: 1,
    marginRight: 8
  },
  rightIcon: {
    width: moderateScale(12),
    height: moderateScale(12),
    aspectRatio: 1,
    marginLeft: 8
  },
  textInput: {
    fontFamily: FONTS.regular,
    flex: 1,
    fontSize: FONT_SIZE.md,
    padding: 0,
    color: COLORS.textColor1
  },
  textInputSmallFont: {
    fontFamily: FONTS.regular,
    flex: 1,
    fontSize: FONT_SIZE.sm,
    padding: 0,
    color: COLORS.textColor1
  },
  dashedBorderStyle: {
    borderStyle: "dashed",
    borderWidth: 1
  },
  solidBorderStyle: {
    borderStyle: "solid",
    borderWidth: 1
  },
  dottedBorderStyle: {
    borderStyle: "dotted",
    borderWidth: 1
  }
});
