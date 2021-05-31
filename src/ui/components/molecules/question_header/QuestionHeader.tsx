import ChevronDown from "assets/images/chevron-down.svg";
import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import QuestionSection from "models/QuestionSection";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Color } from "react-native-svg";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import { shadowStyleProps, SvgProp } from "utils/Util";

interface Props {
  questionGroup: QuestionSection;
  isExpanded?: boolean;
}

const QuestionHeader: React.FC<Props> = ({
  isExpanded = false,
  questionGroup
}: Props) => {
  const theme = usePreferredTheme();
  const chevronDownIcon: SvgProp = (color?: Color) => {
    return <ChevronDown width={20} height={20} fill={color} />;
  };
  if (isExpanded) {
    return (
      <View
        style={[
          styles.expandedContainer,
          {
            backgroundColor: theme.themedColors.background,
            borderColor: theme.themedColors.interface[300]
          }
        ]}>
        <AppLabel
          style={styles.title}
          text={questionGroup.title}
          weight="semi-bold"
        />
        <AppLabel
          style={[
            styles.description,
            { color: theme.themedColors.interface[600] }
          ]}
          text={questionGroup.description}
          numberOfLines={0}
        />
      </View>
    );
  } else {
    return (
      <View
        style={[
          styles.collapseContainer,
          { backgroundColor: theme.themedColors.background }
        ]}>
        <AppLabel
          style={styles.title}
          text={questionGroup.title}
          weight="semi-bold"
        />

        <AppImageBackground
          icon={chevronDownIcon}
          containerShape={CONTAINER_TYPES.CIRCLE}
          containerStyle={[
            styles.arrowContainer,
            {
              backgroundColor: theme.themedColors.interface[300]
            }
          ]}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  collapseContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 6,
    paddingHorizontal: SPACE.lg,
    paddingVertical: SPACE.sm,
    ...shadowStyleProps
  },
  expandedContainer: {
    flexDirection: "column",
    padding: SPACE.lg,
    borderTopStartRadius: 6,
    borderTopEndRadius: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    ...shadowStyleProps
  },
  title: { fontSize: FONT_SIZE.base },
  description: {
    fontSize: FONT_SIZE.sm,
    marginTop: SPACE.sm
  },
  arrowContainer: {
    width: 28,
    height: 28
  }
});

export default QuestionHeader;
