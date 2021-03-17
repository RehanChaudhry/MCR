import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import SectionedList, {
  Section
} from "ui/components/organisms/sectioned_list/SectionedList";
import QuestionSection from "models/QuestionSection";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import Question from "models/Question";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { usePreferredTheme } from "hooks";
import {
  AppButton,
  BUTTON_TYPES
} from "ui/components/molecules/app_button/AppButton";
import { Color, NumberProp } from "react-native-svg";
import RightArrow from "assets/images/arrow_right.svg";
import RightArrowCircle from "assets/images/right_arrow_circle.svg";
import QuestionHeader from "ui/components/molecules/question_header/QuestionHeader";
import { QuestionItem } from "ui/components/organisms/question_item/QuestionItem";
import { shadowStyleProps } from "utils/Util";

type Props = {
  submitAnswersLoading: boolean;
  submitAnswers: () => void;
  questions: Section<QuestionSection, Question>[];
};

export const QuestionsView = ({
  questions,
  submitAnswersLoading,
  submitAnswers
}: Props) => {
  const { themedColors } = usePreferredTheme();

  const listHeader = () => (
    <View style={styles.headerContainer}>
      <AppLabel
        style={styles.infoText}
        text={STRINGS.questionnaire.info}
        numberOfLines={0}
      />
      <View
        style={[
          styles.headerCard,
          {
            backgroundColor: themedColors.background,
            borderColor: themedColors.border
          }
        ]}>
        <HeadingWithText
          headingText={STRINGS.questionnaire.how_it_works}
          headingStyle={styles.infoCardHeading}
          text={STRINGS.questionnaire.how_it_works_detail}
          textStyle={styles.infoCardText}
        />
        <AppButton
          text={STRINGS.questionnaire.learn_more}
          textStyle={styles.learnMore}
          buttonType={BUTTON_TYPES.LINK}
          rightIcon={(
            color?: Color,
            width?: NumberProp,
            height?: NumberProp
          ) => (
            <RightArrow
              width={width}
              height={height}
              fill={themedColors.primary}
            />
          )}
        />
      </View>
    </View>
  );

  const listFooter = () => (
    <View style={styles.footerContainer}>
      <AppButton
        shouldShowProgressBar={submitAnswersLoading}
        onPress={submitAnswers}
        text={STRINGS.questionnaire.action_save}
        buttonStyle={[
          styles.saveButtonContainer,
          {
            backgroundColor: themedColors.primary
          }
        ]}
        textStyle={[styles.saveButton, { color: themedColors.background }]}
        rightIcon={(
          color?: Color,
          width?: NumberProp,
          height?: NumberProp
        ) => (
          <RightArrowCircle
            width={width}
            height={height}
            fill={themedColors.background}
          />
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionedList<QuestionSection, Question>
        listHeaderComponent={listHeader()}
        style={styles.sectionedList}
        list={questions}
        headerView={(
          header: QuestionSection,
          isSelected: boolean,
          _: number
        ) => (
          <QuestionHeader questionGroup={header} isExpanded={isSelected} />
        )}
        bodyView={(
          bodyItem: Question,
          parentIndex: number,
          index: number
        ) => {
          const style: StyleProp<ViewStyle> =
            questions[parentIndex].data.length - 1 === index
              ? styles.lastBody
              : null;
          return (
            <QuestionItem
              question={bodyItem}
              initialValuesTopSlider={[5]}
              initialValuesBottomSlider={[3, 7]}
              style={style}
              callback={() => {}}
              preferenceInitialValue={false}
            />
          );
        }}
        listFooterComponent={listFooter()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionedList: { padding: SPACE.md },
  lastBody: {
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
    marginBottom: SPACE.sm
  },
  container: {
    flexDirection: "column"
  },
  infoText: {
    fontSize: FONT_SIZE.sm,
    marginBottom: SPACE.md,
    textAlign: "center"
  },
  headerContainer: {
    flexDirection: "column"
  },
  footerContainer: {
    flexDirection: "column",
    marginTop: SPACE.md
  },
  headerCard: {
    overflow: "hidden",
    borderRadius: 5,
    marginVertical: SPACE.sm,
    padding: SPACE.md,

    // shadow
    ...shadowStyleProps
  },
  infoCardHeading: {
    fontSize: FONT_SIZE.md
  },
  infoCardText: {
    fontSize: FONT_SIZE.sm,
    marginTop: SPACE.sm
  },
  learnMore: {
    fontSize: FONT_SIZE.xsm,
    fontWeight: "bold",
    textAlign: "left"
  },
  saveButton: { fontSize: FONT_SIZE.xsm, fontWeight: "bold" },
  saveButtonContainer: { paddingHorizontal: SPACE.sm }
});
