import ChevronDown from "assets/images/chevron-down.svg";
import { SPACE } from "config";
import { lineHeight, moderateScale } from "config/Dimens";
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
    return (
      <ChevronDown
        width={moderateScale(20)}
        height={moderateScale(20)}
        fill={color}
      />
    );
  };
  if (isExpanded) {
    return (
      <View
        style={[
          styles.expandedContainer,
          {
            backgroundColor: theme.themedColors.background,
            borderColor: theme.themedColors.separator
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
    borderRadius: moderateScale(6),
    paddingHorizontal: SPACE.lg,
    paddingVertical: SPACE.sm,

    ...shadowStyleProps
  },
  expandedContainer: {
    flexDirection: "column",
    padding: SPACE.lg,
    overflow: "hidden",
    borderTopStartRadius: moderateScale(6),
    borderTopEndRadius: moderateScale(6),
    borderBottomWidth: StyleSheet.hairlineWidth

    // shadow
    // ...shadowStyleProps
  },
  title: { fontSize: moderateScale(15) },
  description: {
    fontSize: moderateScale(13.0),
    marginTop: SPACE.sm,
    lineHeight: lineHeight
  },
  arrowContainer: {
    width: moderateScale(32),
    height: moderateScale(32)
  }
});

export default QuestionHeader;
