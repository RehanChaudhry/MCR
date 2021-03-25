import { FONTS, FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import { shadowStyleProps } from "utils/Util";

type Props = {
  title: string;
  subtitle: string;
  profileImage: string;
  onPressReject: () => void;
  onPressApproved: () => void;
};

const ConnectRequestItem: FC<Props> = ({
  title,
  subtitle,
  // profileImage,
  onPressApproved,
  onPressReject
}) => {
  const theme = usePreferredTheme();
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
        </View>
        <View style={styles.actionsContainer}>
          <AppButton
            fontWeight={"semi-bold"}
            textStyle={[
              styles.actionButtonText,
              { color: theme.themedColors.primary }
            ]}
            buttonStyle={[
              styles.actionButton,
              { backgroundColor: theme.themedColors.primaryShade }
            ]}
            text={"Approve"}
            onPress={onPressApproved}
          />
          <View style={styles.spacer} />
          <AppButton
            fontWeight={"semi-bold"}
            textStyle={[
              styles.actionButtonText,
              { color: theme.themedColors.danger }
            ]}
            buttonStyle={[
              styles.actionButton,
              { backgroundColor: theme.themedColors.dangerShade }
            ]}
            text={"Reject"}
            onPress={onPressReject}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    flex: 0.5,
    height: 36
  },
  actionButtonText: {
    fontFamily: FONTS.semiBold,
    fontSize: FONT_SIZE.md
  },
  actionsContainer: {
    flexDirection: "row",
    paddingTop: SPACE.md
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
  subTitleText: {
    fontSize: FONT_SIZE.sm,
    marginTop: SPACE.xxsm
  },
  titleText: {
    fontSize: FONT_SIZE.lg
  },
  spacer: {
    padding: SPACE.xsm
  }
});

export default ConnectRequestItem;
