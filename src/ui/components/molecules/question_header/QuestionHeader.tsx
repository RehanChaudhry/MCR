import ChevronDown from "assets/images/chevron-down.svg";
import { FONT_SIZE, SPACE } from "config";
import { moderateScale } from "config/Dimens";
import { usePreferredTheme } from "hooks";
import QuestionGroup from "models/QuestionGroup";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Color, NumberProp } from "react-native-svg";
import {
  AppLabel,
  TEXT_TYPE
} from "ui/components/atoms/app_label/AppLabel";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import { SvgProp } from "utils/Util";

interface Props {
  questionGroup: QuestionGroup;
  isExpanded?: boolean;
}

const QuestionHeader = ({ isExpanded = false, questionGroup }: Props) => {
  const theme = usePreferredTheme();
  const chevronDownIcon: SvgProp = (
    color?: Color,
    width?: NumberProp,
    height?: NumberProp
  ) => {
    return <ChevronDown width={width} height={height} fill={color} />;
  };
  if (isExpanded) {
    return (
      <View
        style={[
          styles.expandedContainer,
          { backgroundColor: theme.themedColors.primaryBackground }
        ]}>
        <AppLabel
          style={styles.title}
          text={questionGroup.title}
          textType={TEXT_TYPE.BOLD}
        />
        <AppLabel
          style={[
            styles.description,
            { color: theme.themedColors.secondaryLabelColor }
          ]}
          text={questionGroup.description}
          numberOfLines={5}
        />
      </View>
    );
  } else {
    return (
      <View
        style={[
          styles.collapseContainer,
          { backgroundColor: theme.themedColors.primaryBackground }
        ]}>
        <AppLabel
          style={styles.title}
          text={questionGroup.title}
          textType={TEXT_TYPE.BOLD}
        />

        <AppImageBackground
          icon={chevronDownIcon}
          containerShape={CONTAINER_TYPES.CIRCLE}
          containerStyle={[
            styles.arrowContainer,
            {
              backgroundColor: theme.themedColors.secondaryBackground
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
    borderRadius: 5,
    marginVertical: SPACE.one,
    padding: SPACE.one,

    // shadow
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  expandedContainer: {
    flexDirection: "column",
    padding: SPACE.one,
    overflow: "hidden",
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    marginTop: SPACE.one

    // shadow
    // shadowColor: "#000000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 5
  },
  title: { fontSize: FONT_SIZE.md, padding: SPACE.one },
  description: { fontSize: FONT_SIZE.sm, padding: SPACE.one },
  arrowContainer: {
    width: moderateScale(30),
    height: moderateScale(30),
    marginRight: moderateScale(5)
  }
});

export default QuestionHeader;
