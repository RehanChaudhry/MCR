import { FONTS, SPACE, FONT_SIZE } from "config";
import { usePreferredTheme } from "hooks";
import React, { FC } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import { shadowStyleProps } from "utils/Util";
import Cross from "assets/images/ic_cross.svg";
import ChatRound from "assets/images/chat_round.svg";
import InfoIcon from "assets/images/info_circle.svg";
import RequestStateIcon from "assets/images/request_state_icon.svg";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgProp } from "utils/Util";

export enum CONNECTION_ACTION_STATE {
  NORMAL = "normal",
  READONLY = "readonly",
  DANGER = "dander"
}

type Props = {
  title: string;
  subtitle: string;
  profileImage: string;
  actionButtonTitle: string;
  actionButtonState: CONNECTION_ACTION_STATE;
  shouldShowTopActionable: boolean;
  shouldShowLeftInfoIcon?: boolean;
  onPressAction: () => void;
  onPressChat: () => void;
  onPressCross?: () => void;
};

const ConnectionItem: FC<Props> = ({
  title,
  subtitle,
  // profileImage,
  actionButtonTitle,
  actionButtonState,
  shouldShowLeftInfoIcon = false,
  shouldShowTopActionable,
  onPressAction,
  onPressChat,
  onPressCross
}) => {
  const theme = usePreferredTheme();

  const actionButtonStyle = () => {
    switch (actionButtonState) {
      case CONNECTION_ACTION_STATE.NORMAL:
        return {
          backgroundColor: theme.themedColors.primaryShade,
          color: theme.themedColors.primary
        };
      case CONNECTION_ACTION_STATE.READONLY:
        return {
          backgroundColor: theme.themedColors.interface[200],
          color: theme.themedColors.interface[600]
        };
      case CONNECTION_ACTION_STATE.DANGER:
        return {
          backgroundColor: theme.themedColors.dangerShade,
          color: theme.themedColors.danger
        };
    }
  };

  const infoIcon: SvgProp = () => {
    return (
      <InfoIcon width={18} height={18} fill={actionButtonStyle().color} />
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.contentContainer,
          { backgroundColor: theme.themedColors.background }
        ]}>
        <View style={styles.infoContainer}>
          <AppImageBackground
            style={styles.profileImage}
            containerShape={CONTAINER_TYPES.CIRCLE}
          />
          <View style={styles.infoTextContainer}>
            <AppLabel
              style={[
                styles.titleText,
                { color: theme.themedColors.label }
              ]}
              text={title}
            />
            <AppLabel
              style={[
                styles.subTitleText,
                { color: theme.themedColors.labelSecondary }
              ]}
              text={subtitle}
            />
          </View>
          <View style={styles.spacer} />
          {shouldShowTopActionable && (
            <View style={styles.iconsContainer}>
              <Pressable style={styles.iconContainer} onPress={() => {}}>
                <RequestStateIcon
                  fill={
                    actionButtonState === CONNECTION_ACTION_STATE.DANGER
                      ? theme.themedColors.danger
                      : theme.themedColors.success
                  }
                />
              </Pressable>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={onPressCross}>
                <Cross fill={theme.themedColors.interface[400]} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={onPressChat}>
            <AppImageBackground
              containerStyle={styles.chatButton}
              containerShape={CONTAINER_TYPES.SQUARE}
              icon={() => (
                <ChatRound
                  fill={theme.themedColors.interface[800]}
                  width={24}
                  height={24}
                />
              )}
            />
          </TouchableOpacity>
          <AppButton
            leftIcon={shouldShowLeftInfoIcon ? infoIcon : undefined}
            isDisable={
              actionButtonState === CONNECTION_ACTION_STATE.READONLY
            }
            fontWeight={"semi-bold"}
            textStyle={[
              styles.actionButtonText,
              { color: actionButtonStyle().color }
            ]}
            buttonStyle={[
              styles.actionButton,
              { backgroundColor: actionButtonStyle().backgroundColor }
            ]}
            text={actionButtonTitle}
            onPress={onPressAction}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    flex: 1,
    marginRight: SPACE.md,
    height: 36
  },
  actionButtonText: {
    fontFamily: FONTS.semiBold,
    fontSize: FONT_SIZE.xsm
  },
  actionsContainer: {
    flexDirection: "row-reverse",
    paddingTop: SPACE.md
  },
  chatButton: {
    width: 36,
    height: 36
  },
  container: {
    paddingTop: SPACE.sm,
    paddingBottom: SPACE.sm,
    paddingLeft: SPACE.lg,
    paddingRight: SPACE.lg
  },
  contentContainer: {
    flexDirection: "column",
    borderRadius: 12,
    padding: SPACE.md,
    ...shadowStyleProps
  },
  iconsContainer: {
    flexDirection: "row"
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center"
  },
  infoContainer: {
    flexDirection: "row"
  },
  infoTextContainer: {
    flexDirection: "column",
    paddingLeft: SPACE.sm
  },
  profileImage: {
    width: 48,
    height: 48
  },
  spacer: {
    flex: 1
  },
  subTitleText: {
    fontSize: FONT_SIZE._2xsm,
    marginTop: SPACE.xxsm
  },
  titleText: {
    fontSize: FONT_SIZE.lg
  }
});

export default ConnectionItem;
