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

    const [
      createConversationText,
      setCreateConversationText
    ] = useState<string>(Strings.newConversation.createGroupText);

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
                  "NewConversationScreen => segment value : " +
                  value +
                  " and index is : " +
                  index
              );
              setConversationType(index);
              if (index === 0) {
                setCreateConversationText(
                  Strings.newConversation.createGroupText
                );
                setPlaceHolderText(Strings.newConversation.typingHint);
              } else {
                setCreateConversationText(
                  Strings.newConversation.createStaff
                );
                setPlaceHolderText(
                  Strings.newConversation.typingHintStaff
                );
              }
            }}
          />
        </View>
        {/* Segment control*/}

        <View style={styles.contentWrapper}>
          <AppLabel
            text={createConversationText}
            style={styles.textStyle(themedColors)}
            numberOfLines={0}
          />

          <FlatListWithPb
            shouldShowProgressBar={false}
            data={data}
            renderItem={renderItem}
            noRecordFoundText={
              "It’s nice to chat with someone. Say hello!\n" +
              "Create a new conversation and start talking to them."
            }
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            style={[styles.list]}
            contentContainerStyle={{ paddingBottom: SPACE.lg }}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        <WriteMessage
          suggestionsList={suggestionsList}
          addItem={addItem}
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
  }
});
