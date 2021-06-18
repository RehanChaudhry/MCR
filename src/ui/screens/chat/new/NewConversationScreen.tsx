import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { WriteMessage } from "ui/components/molecules/item_chat/WriteMessage";
import Screen from "ui/components/atoms/Screen";
import { AppLog, shadowStyleProps } from "utils/Util";
import { usePreferredTheme } from "hooks";
import { FONT_SIZE, SPACE } from "config/Dimens";
import {
  Choice,
  SegmentedControl
} from "ui/components/molecules/segmented_control/SegmentedControl";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { ItemConversation } from "ui/components/molecules/item_conversation/ItemConversation";
import Strings from "config/Strings";
import { ItemSuggestion } from "ui/components/molecules/item_conversation/ItemSuggestion";
import { User } from "models/User";

type Props = {
  data: User[] | undefined;
  removeItem: (itemToDelete: User) => void;
  suggestions: (keyword: string) => void;
  suggestionsList: User[] | undefined;
  addItem: (item: User) => void;
  setConversationType: (currentSegment: number) => void;
  showProgressbar: boolean;
  clearInputField: boolean;
};

export const NewConversationScreen = React.memo<Props>(
  ({
    data,
    removeItem,
    setConversationType,
    addItem,
    suggestions,
    suggestionsList,
    showProgressbar,
    clearInputField
  }) => {
    const { themedColors } = usePreferredTheme();
    const [placeHolderText, setPlaceHolderText] = useState<string>(
      Strings.newConversation.typingHint
    );

    function appInputCallback(text: string) {
      suggestions(text);
    }

    const renderItem = ({ item }: { item: User }) => {
      return (
        <ItemConversation
          item={item}
          // @ts-ignore
          onPress={(_item: User) => {
            removeItem(_item);
          }}
        />
      );
    };

    const renderSuggestionItems = ({ item }: { item: User }) => {
      return (
        <ItemSuggestion
          item={item}
          onPress={(currentItem: User) => {
            addItem(currentItem);
          }}
        />
      );
    };

    return (
      <Screen style={styles.container}>
        {/* Segment control*/}
        <View style={styles.segmentControlWrapper(themedColors)}>
          <SegmentedControl
            containerStyle={styles.segment}
            values={Strings.newConversation.segmentValues}
            onChange={(value: Choice, index: number) => {
              AppLog.log(
                () =>
                  "segment value : " + value + " and index is : " + index
              );
              setConversationType(index);
              index === 0
                ? setPlaceHolderText(Strings.newConversation.typingHint)
                : setPlaceHolderText(
                    Strings.newConversation.typingHintStaff
                  );
            }}
          />
        </View>
        {/* Segment control*/}

        <View style={styles.contentWrapper}>
          <AppLabel
            text={Strings.newConversation.createGroupText}
            style={styles.textStyle(themedColors)}
          />

          <FlatListWithPb
            shouldShowProgressBar={false}
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            style={[styles.list]}
            contentContainerStyle={{ paddingBottom: SPACE.lg }}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        {suggestionsList !== undefined && suggestionsList.length > 0 && (
          <View style={styles.suggestContainer}>
            <FlatListWithPb
              shouldShowProgressBar={false}
              data={suggestionsList}
              renderItem={renderSuggestionItems}
              showsVerticalScrollIndicator={false}
              style={[styles.suggestionList(themedColors)]}
              keyExtractor={(item) => item.id.toString()}
              keyboardShouldPersistTaps="always"
            />
          </View>
        )}

        <WriteMessage
          appInputFieldCallback={appInputCallback}
          appInputPlaceHolder={placeHolderText}
          showIcon={false}
          showProgressbar={showProgressbar}
          clearInputField={clearInputField}
          multiline={false}
        />
      </Screen>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1
  },
  segmentControlWrapper: (theme: ColorPalette) => {
    return {
      backgroundColor: theme.background,
      ...shadowStyleProps
    };
  },
  segment: {
    marginHorizontal: SPACE.md,
    marginBottom: SPACE.sm
  },
  contentWrapper: {
    flex: 1,
    marginTop: SPACE.lg
  },
  textStyle: (theme: ColorPalette) => {
    return {
      color: theme.interface["600"],
      fontSize: FONT_SIZE.sm,
      paddingHorizontal: SPACE.lg
    };
  },
  list: {
    flex: 1
  },
  suggestContainer: {
    position: "absolute",
    height: 200,
    bottom: 75,
    width: "100%",
    backgroundColor: "#00000000",
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  suggestionList: (theme: ColorPalette) => {
    return {
      backgroundColor: theme.background
    };
  }
});
