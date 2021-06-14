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
import { AppLog, shadowStyleProps } from "utils/Util";
import Screen from "ui/components/atoms/Screen";
import SectionedList, {
  Section
} from "ui/components/organisms/sectioned_list/SectionedList";
import { StaticContent } from "models/api_responses/StaticContentResponseModel";

type Props = {
  headerContent: StaticContent;
  moveToHeaderContent: (staticContent: StaticContent) => void;
  isFrom: EScreen;
  submitAnswersLoading: boolean;
  submitAnswers: () => void;
  questions: Section<QuestionSection, Question>[];
};

export const QuestionsView = ({
  headerContent,
  moveToHeaderContent,
  isFrom,
  questions,
  submitAnswersLoading,
  submitAnswers
}: Props) => {
  AppLog.logForComplexMessages(() => "rendering QuestionsView");
  const { themedColors } = usePreferredTheme();

  const listHeader = useRef(
    createListHeader(
      headerContent,
      moveToHeaderContent,
      isFrom,
      themedColors
    )
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
        listFooterComponent={createListFooter(
          submitAnswersLoading,
          submitAnswers,
          themedColors
        )}
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
        bodyItem.answer?.minPreference ?? 4,
        bodyItem.answer?.maxPreference ?? 7
      ]}
      style={style}
      callback={(result: SliderCallback) => {
        bodyItem.answer = {
          questionId: bodyItem.id,
          answer: result.topRangeSliderResult[0],
          maxPreference: result.bottomRangeSliderResult[1],
          minPreference: result.bottomRangeSliderResult[0],
          noPreference: result.isPreferenceActive ? 1 : 0
        };
      }}
      preferenceInitialValue={bodyItem.answer?.noPreference === 1}
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

function createListHeader(
  headerContent: StaticContent,
  moveToHeaderContent: (staticContent: StaticContent) => void,
  isFrom: EScreen,
  themedColors: ColorPalette
) {
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
          headingText={headerContent.title ?? STRINGS.common.not_found}
          headingStyle={styles.infoCardHeading}
          headingFontWeight="semi-bold"
          text={headerContent.description ?? STRINGS.common.not_found}
          textStyle={[
            styles.infoCardText,
            { color: themedColors.interface[600] }
          ]}
        />
        <LinkButton
          viewStyle={styles.buttonView}
          textStyle={styles.learnMore}
          text={STRINGS.questionnaire.learn_more}
          fontWeight={"bold"}
          rightIcon={() => (
            <RightArrow
              width={16}
              height={16}
              fill={themedColors.primary}
            />
          )}
          onPress={() => {
            moveToHeaderContent(headerContent);
          }}
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
        fontWeight={"semi-bold"}
        textStyle={[styles.saveButton, { color: themedColors.background }]}
        loaderColor={themedColors.background}
        rightIcon={() => (
          <RightArrowCircle
            width={13}
            height={13}
            fill={themedColors.background}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionedList: { padding: SPACE.lg },
  lastBody: {
    borderBottomStartRadius: 6,
    borderBottomEndRadius: 6
  },
  infoText: {
    fontSize: FONT_SIZE.sm,
    marginBottom: SPACE.lg,
    textAlign: "center"
  },
  headerContainer: {
    flexDirection: "column",
    ...shadowStyleProps
  },
  footerContainer: {
    flexDirection: "column"
  },
  headerCard: {
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: SPACE.lg,
    padding: SPACE.lg,

    // shadow
    ...shadowStyleProps
  },
  infoCardHeading: {
    fontSize: FONT_SIZE.base
  },
  infoCardText: {
    fontSize: FONT_SIZE.sm,
    marginTop: SPACE.sm
  },
  learnMore: {
    fontSize: FONT_SIZE.sm,
    textAlign: "left"
  },
  saveButton: { fontSize: FONT_SIZE.base },
  saveButtonContainer: {},
  buttonView: {
    marginTop: SPACE.lg
  }
});
