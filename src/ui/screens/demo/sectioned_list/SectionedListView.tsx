import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import SectionedList, {
  Section
} from "ui/components/organisms/sectioned_list/SectionedList";
import DataGenerator from "ui/screens/demo/sectioned_list/DataGenerator";
import QuestionHeader from "ui/components/molecules/question_header/QuestionHeader";
import QuestionSection from "models/QuestionSection";
import { SPACE } from "config";
import Question from "models/Question";
import QuestionRow from "ui/components/molecules/question_row/QuestionRow";
import { ThemeSwitcher } from "ui/components/templates/ThemeSwitcher";

type Props = {};

const sections: Section<
  QuestionSection,
  Question
>[] = DataGenerator.getSections();

export const SectionedListView = React.memo<Props>(() => {
  return (
    <ThemeSwitcher>
      <SectionedList<QuestionSection, Question>
        style={styles.sectionedList}
        list={sections}
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
            sections[parentIndex].data.length - 1 === index
              ? styles.lastBody
              : null;
          return <QuestionRow style={style} question={bodyItem} />;
        }}
      />
    </ThemeSwitcher>
  );
});

const styles = StyleSheet.create({
  sectionedList: { padding: SPACE.sm },
  bodyImage: { width: 100, height: 100, margin: 10 },
  headerImage: { width: 150, height: 150, margin: 10 },
  lastBody: {
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
    marginBottom: SPACE.sm
  }
});
