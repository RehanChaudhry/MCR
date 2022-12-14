import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View
} from "react-native";
import { AppInputField } from "ui/components/molecules/appinputfield/AppInputField";
import { FONT_SIZE, SPACE } from "config";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import PaperAirplane from "assets/images/paper_airplane.svg";
import { AppLog, SvgProp } from "utils/Util";
import { usePreferredTheme } from "hooks";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
import { Color, NumberProp } from "react-native-svg";
import { useHeaderHeight } from "@react-navigation/stack";
import { User } from "models/User";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { ItemSuggestion } from "../item_conversation/ItemSuggestion";

export interface TypingComponentProps {
  btnImage?: SvgProp;
  appInputPlaceHolder: string;
  appInputFieldCallback?: (text: string) => void;
  btnPressCallback?: (text: string) => void;
  showIcon?: boolean;
  showProgressbar?: boolean;
  clearInputField?: boolean;
  multiline?: boolean;
  suggestionsList?: User[];
  addItem?: (item: User) => void;
}

export const WriteMessage = React.memo<TypingComponentProps>(
  ({
    btnImage,
    appInputPlaceHolder,
    appInputFieldCallback,
    btnPressCallback,
    showIcon = true,
    showProgressbar = false,
    clearInputField = false,
    multiline = true,
    addItem,
    suggestionsList
  }) => {
    const [initialText, setInitialText] = useState<string>("");
    const { themedColors } = usePreferredTheme();

    useEffect(() => {
      if (clearInputField) {
        setInitialText("");
      }
    }, [clearInputField]);

    const defaultIcon: SvgProp = (
      color?: Color,
      width?: NumberProp,
      height?: NumberProp
    ) => {
      AppLog.log(
        () =>
          "Write message view remove warning: " + color + width + height
      ); //just to avoid warning
      return (
        <PaperAirplane
          testID="icon"
          width={25}
          height={25}
          fill={themedColors.primary}
        />
      );
    };

    const renderSuggestionItems = ({ item }: { item: User }) => {
      return (
        <ItemSuggestion
          item={item}
          onPress={(currentItem: User) => {
            AppLog.logForcefully(() => "in item on press");
            addItem?.(currentItem);
          }}
        />
      );
    };

    return (
      <>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={useHeaderHeight()}>
          <View>
            <View style={[styles.container(themedColors)]}>
              <View
                style={[
                  styles.input,
                  { borderColor: themedColors.border }
                ]}>
                <AppInputField
                  multiline={multiline}
                  placeholderTextColor={themedColors.interface["600"]}
                  placeholder={appInputPlaceHolder}
                  onChangeText={(text: string) => {
                    setInitialText(text);
                    appInputFieldCallback?.(text);
                  }}
                  valueToShowAtStart={initialText}
                  style={[
                    styles.inputField(showProgressbar),
                    { color: themedColors.label }
                  ]}
                />

                {showProgressbar && (
                  <ActivityIndicator
                    testID="initial-loader"
                    size="small"
                    color={themedColors.primary}
                    style={[styles.initialPb]}
                  />
                )}
              </View>

              {showIcon && (
                <AppImageBackground
                  onPress={() => {
                    if (initialText !== "") {
                      setInitialText("");
                      btnPressCallback?.(initialText);
                    }
                  }}
                  icon={btnImage ?? defaultIcon}
                  containerShape={CONTAINER_TYPES.SQUARE}
                  containerStyle={styles.imgPaper(themedColors)}
                />
              )}
            </View>

            {Platform.OS === "ios" &&
              suggestionsList !== undefined &&
              suggestionsList.length > 0 && (
                <FlatListWithPb
                  shouldShowProgressBar={false}
                  data={suggestionsList}
                  renderItem={renderSuggestionItems}
                  showsVerticalScrollIndicator={true}
                  style={[styles.suggestionList(themedColors)]}
                  keyExtractor={(item) => item.id.toString()}
                  keyboardShouldPersistTaps="always"
                />
              )}
          </View>
        </KeyboardAvoidingView>
        {Platform.OS === "android" &&
          suggestionsList !== undefined &&
          suggestionsList.length > 0 && (
            <FlatListWithPb
              shouldShowProgressBar={false}
              data={suggestionsList}
              renderItem={renderSuggestionItems}
              showsVerticalScrollIndicator={true}
              style={[styles.suggestionList(themedColors)]}
              keyExtractor={(item) => item.id.toString()}
              keyboardShouldPersistTaps="always"
            />
          )}
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: (themedColors: ColorPalette) => {
    return {
      paddingVertical: SPACE.lg,
      paddingHorizontal: SPACE.md,
      flexDirection: "row",
      backgroundColor: themedColors.background,
      borderTopWidth: 0.5,
      borderTopColor: themedColors.interface["300"],
      alignItems: "center"
    };
  },
  imgPaper: (themedColors: ColorPalette) => {
    return {
      marginStart: SPACE.md,
      backgroundColor: themedColors.primaryShade,
      elevation: 0,
      marginTop: SPACE._2xs
    };
  },
  input: {
    flexDirection: "column",
    borderStyle: "solid",
    borderRadius: 5,
    fontSize: FONT_SIZE.xs,
    borderWidth: 1,
    flex: 1,
    height: 40,
    marginTop: SPACE._2xs
  },
  inputField: (showProgressbar: boolean) => {
    return {
      alignSelf: "center",
      paddingEnd: showProgressbar ? 40 / 2 + SPACE.md : 0
    };
  },
  initialPb: {
    width: 40 / 2,
    height: 40 / 2,
    alignSelf: "flex-end",
    paddingVertical: 40 / 2,
    right: SPACE.md,
    position: "absolute"
  },

  suggestionList: (theme: ColorPalette) => {
    return {
      position: "absolute",
      bottom: 75,
      width: "100%",
      maxHeight: 200,
      backgroundColor: theme.background,
      flexDirection: "column",
      justifyContent: "flex-end"
    };
  }
});
