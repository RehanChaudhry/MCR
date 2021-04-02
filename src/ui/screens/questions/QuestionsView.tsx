import RightArrow from "assets/images/arrow_right.svg";
import RightArrowCircle from "assets/images/right_arrow_circle.svg";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import { usePreferredTheme } from "hooks";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
import EScreen from "models/enums/EScreen";
import Question from "models/Question";
import QuestionSection from "models/QuestionSection";
import React, { useRef } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { LinkButton } from "ui/components/molecules/link_button/LinkButton";
import QuestionHeader from "ui/components/molecules/question_header/QuestionHeader";
import {
  QuestionItem,
  SliderCallback
} from "ui/components/organisms/question_item/QuestionItem";
import { shadowStyleProps } from "utils/Util";
import Screen from "ui/components/atoms/Screen";
import SectionedList, {
  Section
} from "ui/components/organisms/sectioned_list/SectionedList";
import { moderateScale } from "config/Dimens";

type Props = {
  isFrom: EScreen;
  submitAnswersLoading: boolean;
  submitAnswers: () => void;
  questions: Section<QuestionSection, Question>[];
};

export const QuestionsView = ({
  isFrom,
  questions,
  submitAnswersLoading,
  submitAnswers
}: Props) => {
  const { themedColors } = usePreferredTheme();

  const listHeader = useRef(createListHeader(isFrom, themedColors));

  const listFooter = useRef(
    createListFooter(submitAnswersLoading, submitAnswers, themedColors)
  );

  return (
    <Screen shouldAddBottomInset={false}>
      <SectionedList<QuestionSection, Question>
        listHeaderComponent={listHeader.current}
        style={styles.sectionedList}
        list={questions}
        isCollapsable={true}
        headerView={headerView}
        bodyView={bodyView}
        listFooterComponent={listFooter.current}
      />
    </Screen>
  );
};

function bodyView(
  questions: Section<QuestionSection, Question>[],
  bodyItem: Question,
  parentIndex: number,
  index: number
) {
  const style: StyleProp<ViewStyle> =
    questions[parentIndex].data.length - 1 === index
      ? styles.lastBody
      : null;
  return (
    <QuestionItem
      question={bodyItem}
      initialValuesTopSlider={[bodyItem.answer?.answer ?? 5]}
      initialValuesBottomSlider={[
        bodyItem.answer?.minPreference ?? 3,
        bodyItem.answer?.maxPreference ?? 7
      ]}
      style={style}
      callback={(result: SliderCallback) => {
        bodyItem.answer = {
          answer: result.topRangeSliderResult[0],
          maxPreference: result.bottomRangeSliderResult[1],
          minPreference: result.bottomRangeSliderResult[0],
          noPreference: !result.isPreferenceActive
        };
      }}
      preferenceInitialValue={bodyItem.answer?.noPreference === false}
    />
  );
}

function headerView(
  header: QuestionSection,
  isSelected: boolean,
  _: number
) {
  return <QuestionHeader questionGroup={header} isExpanded={isSelected} />;
}

function createListHeader(isFrom: EScreen, themedColors: ColorPalette) {
  return (
    <View style={styles.headerContainer}>
      {isFrom === EScreen.WELCOME && (
        <AppLabel
          style={styles.infoText}
          text={STRINGS.questionnaire.info}
          numberOfLines={0}
        />
      )}
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
          headingFontWeight="bold"
          text={STRINGS.questionnaire.how_it_works_detail}
          textStyle={styles.infoCardText}
        />
        <LinkButton
          viewStyle={styles.buttonView}
          textStyle={styles.learnMore}
          text={STRINGS.questionnaire.learn_more}
          rightIcon={() => (
            <RightArrow
              width={moderateScale(16)}
              height={moderateScale(16)}
              fill={themedColors.primary}
            />
          )}
        />
      </View>
    </View>
  );
}

function createListFooter(
  submitAnswersLoading: boolean,
  submitAnswers: () => void,
  themedColors: ColorPalette
) {
  return (
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
        rightIcon={() => (
          <RightArrowCircle
            width={moderateScale(20)}
            height={moderateScale(20)}
            fill={themedColors.background}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionedList: { padding: SPACE.md },
  lastBody: {
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
    marginBottom: SPACE.sm
  },
  infoText: {
    fontSize: FONT_SIZE._2xsm,
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
    borderRadius: 10,
    marginBottom: SPACE.sm,
    padding: SPACE.md,

    // shadow
    ...shadowStyleProps
  },
  infoCardHeading: {
    fontSize: FONT_SIZE.sm
  },
  infoCardText: {
    fontSize: FONT_SIZE.xsm,
    marginTop: SPACE.sm
  },
  learnMore: {
    fontSize: FONT_SIZE.xsm,
    fontWeight: "bold",
    textAlign: "left"
  },
  saveButton: { fontWeight: "bold", fontSize: FONT_SIZE.xsm },
  saveButtonContainer: {},
  buttonView: {
    marginTop: SPACE.md
  }
});
