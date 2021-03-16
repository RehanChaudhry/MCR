import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import SectionedList, {
  Section
} from "ui/components/organisms/sectioned_list/SectionedList";
import QuestionHeader from "ui/components/molecules/question_header/QuestionHeader";
import QuestionSection from "models/QuestionSection";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import Question from "models/Question";
import { QuestionItem } from "ui/components/organisms/question_item/QuestionItem";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { usePreferredTheme } from "hooks";
import { AppButton } from "ui/components/molecules/app_button/AppButton";

type Props = {
  submitAnswersLoading: boolean;
  submitAnswers: () => void;
  questions: Section<QuestionSection, Question>[];
};

export const QuestionsView = ({ questions }: Props) => {
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
        <AppButton text={STRINGS.questionnaire.learn_more} />
      </View>
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
  headerCard: {
    overflow: "hidden",
    borderRadius: 5,
    marginVertical: SPACE.sm,
    padding: SPACE.md,

    // shadow
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2
  },
  infoCardHeading: {
    fontSize: FONT_SIZE.md
  },
  infoCardText: {
    fontSize: FONT_SIZE.sm
  }
});
