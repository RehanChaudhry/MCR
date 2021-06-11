import { FONT_SIZE, SPACE, STRINGS } from "config";
import { usePreferredTheme } from "hooks";
import RelationModel from "models/RelationModel";
import React, { FC, useCallback, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { MyFriendsContext } from "ui/screens/home/friends/AppDataProvider";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import AppPopUp from "ui/components/organisms/popup/AppPopUp";
import useUpdateRelation from "ui/screens/home/friends/useUpdateRelation";

type Props = {
  shouldShow: boolean;
  getSelectedItem: () => RelationModel | undefined;
  hideSelf: () => void;
  title?: string;
  message?: string;
};

const ThreeButtonsAlert: FC<Props> = React.memo(
  ({ shouldShow, getSelectedItem, hideSelf, title, message }) => {
    const theme = usePreferredTheme();
    const { matches, setMatches, resetData } = useContext(
      MyFriendsContext
    );

    const onMatchRemoved = useCallback(
      (id: number) => {
        setMatches?.(matches?.filter((value) => value.userId !== id));
        resetData();
      },
      [matches, setMatches, resetData]
    );

    const {
      shouldShowPb: shouldShowDismissedPb,
      updateRelation: updateRelationDismissed
    } = useUpdateRelation(
      "dismissed",
      "Unable to dismissed the match",
      hideSelf,
      () => {
        onMatchRemoved(getSelectedItem()?.userId ?? -1);
      }
    );

    const {
      shouldShowPb: shouldShowBlockedPb,
      updateRelation: updateRelationBlocked
    } = useUpdateRelation(
      "blocked",
      "Unable to blocked friend",
      hideSelf,
      () => {
        onMatchRemoved(getSelectedItem()?.userId ?? -1);
      }
    );

    return (
      <AppPopUp
        isVisible={shouldShow}
        title={title}
        message={message}
        customActionButtons={
          <View>
            <View
              style={[
                styles.separator,
                { backgroundColor: theme.themedColors.separator }
              ]}
            />
            <AppButton
              text={STRINGS.dialogs.dismiss_block.dismiss}
              style={styles.actionContainer}
              shouldShowProgressBar={shouldShowDismissedPb}
              onPress={() => {
                updateRelationDismissed(getSelectedItem());
              }}
              textStyle={[
                styles.actionStyle,
                {
                  color: theme.themedColors.warn,
                  textAlign: "center",
                  fontSize: FONT_SIZE.base
                }
              ]}
              fontWeight="semi-bold"
            />
            <View
              style={[
                styles.separator,
                { backgroundColor: theme.themedColors.separator }
              ]}
            />
            <AppButton
              text={STRINGS.dialogs.dismiss_block.block}
              style={styles.actionContainer}
              shouldShowProgressBar={shouldShowBlockedPb}
              onPress={() => {
                updateRelationBlocked(getSelectedItem());
              }}
              textStyle={[
                styles.actionStyle,
                {
                  color: theme.themedColors.danger,
                  textAlign: "center",
                  fontSize: FONT_SIZE.base
                }
              ]}
              fontWeight="semi-bold"
            />
            <View
              style={[
                styles.separator,
                { backgroundColor: theme.themedColors.separator }
              ]}
            />
            <AppButton
              text="Cancel"
              style={styles.actionContainer}
              onPress={() => {
                hideSelf();
              }}
              textStyle={[
                styles.actionStyle,
                {
                  color: theme.themedColors.label,
                  fontSize: FONT_SIZE.base
                }
              ]}
            />
          </View>
        }
      />
    );
  }
);

const styles = StyleSheet.create({
  actionStyle: {
    textAlign: "center",
    fontSize: FONT_SIZE.lg
  },
  actionContainer: {
    padding: SPACE.md
  },
  separator: {
    height: 0.5
  }
});
export default ThreeButtonsAlert;
