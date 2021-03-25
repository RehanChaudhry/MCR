import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { shadowStyleProps } from "utils/Util";
import RightArrowIcon from "assets/images/arrow_right.svg";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  title: string;
  subtitle: string;
  learnMoreTitle: string;
  learnMoreAction: () => void;
};

const DismissedOrBlockedListHeader: FC<Props> = ({
  title,
  subtitle,
  learnMoreTitle,
  learnMoreAction
}) => {
  const theme = usePreferredTheme();
  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.contentContainer,
          { backgroundColor: theme.themedColors.background }
        ]}>
        <AppLabel
          style={[styles.title, { color: theme.themedColors.label }]}
          weight="semi-bold"
          text={title}
        />
        <AppLabel
          style={[
            styles.subTitle,
            { color: theme.themedColors.labelSecondary }
          ]}
          numberOfLines={0}
          text={subtitle}
        />
        <TouchableOpacity
          style={styles.actionContainer}
          onPress={learnMoreAction}>
          <AppLabel
            style={[
              styles.actionContainer,
              { color: theme.themedColors.primary }
            ]}
            weight={"bold"}
            text={learnMoreTitle + " "}
          />
          <RightArrowIcon fill={theme.themedColors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: SPACE.lg,
    paddingBottom: SPACE.sm,
    paddingLeft: SPACE.lg,
    paddingRight: SPACE.lg
  },
  contentContainer: {
    flexDirection: "column",
    borderRadius: 12,
    padding: SPACE.lg,
    ...shadowStyleProps
  },
  title: {
    fontSize: FONT_SIZE.lg,
    marginBottom: SPACE.sm
  },
  subTitle: {
    fontSize: FONT_SIZE.md,
    marginBottom: SPACE.sm
  },
  buttonTitle: {
    fontSize: FONT_SIZE.md
  },
  actionContainer: {
    flexDirection: "row"
  }
});

export default DismissedOrBlockedListHeader;
