import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import SectionedList, {
  Section
} from "ui/components/organisms/sectioned_list/SectionedList";
import QuestionHeader from "ui/components/molecules/question_header/QuestionHeader";
import QuestionSection from "models/QuestionSection";
import { SPACE } from "config";
import Question from "models/Question";
import { QuestionItem } from "ui/components/organisms/question_item/QuestionItem";

type Props = {
  submitAnswersLoading: boolean;
  submitAnswers: () => void;
  questions: Section<QuestionSection, Question>[];
};

export const QuestionsView = ({ questions }: Props) => {
  return (
    <View>
      <SectionedList<QuestionSection, Question>
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
  }
});
