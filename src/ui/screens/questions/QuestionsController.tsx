import React, { FC, useLayoutEffect, useRef, useState } from "react";
import { AppLog } from "utils/Util";
import { Section } from "ui/components/organisms/sectioned_list/SectionedList";
import QuestionSection from "models/QuestionSection";
import Question from "models/Question";
import { StackNavigationProp } from "@react-navigation/stack";
import NoHeader from "ui/components/headers/NoHeader";
import { useNavigation } from "@react-navigation/native";
import { useApi } from "repo/Client";
import { AnswerApiRequestModel } from "models/api_requests/AnswerApiRequestModel";
import { AnswerApiResponseModel } from "models/api_responses/AnswerApiResponseModel";
import ProfileApis from "repo/auth/ProfileApis";
import { usePreventDoubleTap } from "hooks";
import { Alert, View } from "react-native";
import {
  QuestionsResponseModel,
  toAnswersRequest,
  toSections
} from "models/api_responses/QuestionsResponseModel";
import { QuestionsView } from "ui/screens/questions/QuestionsView";
import ProgressErrorView from "ui/components/templates/progress_error_view/ProgressErrorView";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import DataGenerator from "utils/DataGenerator";
import { ProfileStackParamList } from "routes/ProfileBottomBar";

type QuestionsNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "UpdateQuestionnaire"
>;

type Props = {};

const questionSections = DataGenerator.getQuestionSections();

const QuestionsController: FC<Props> = () => {
  AppLog.log("Opening QuestionsController");
  const requestModel = useRef<AnswerApiRequestModel>();

  const navigation = useNavigation<QuestionsNavigationProp>();

  const [questions, setQuestions] = useState<
    Section<QuestionSection, Question>[]
  >(toSections(questionSections));

  // Add no toolbar
  useLayoutEffect(() => {
    navigation.setOptions(NoHeader.create());
  }, [navigation]);

  const questionApi = useApi<any, QuestionsResponseModel>(
    ProfileApis.questions
  );

  const answerApi = useApi<AnswerApiRequestModel, AnswerApiResponseModel>(
    ProfileApis.answers
  );

  // useEffect(() => {
  //   handleGetQuestionsApi();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleGetQuestionsApi = async (onComplete?: () => void) => {
    const { hasError, dataBody, errorBody } = await questionApi.request(
      []
    );
    if (hasError || dataBody === undefined) {
      // Alert.alert("Unable to find questions " + errorBody);
      AppLog.log("Unable to find questions " + errorBody);
      return;
    } else {
      setQuestions(toSections(dataBody.data));
      onComplete?.();
    }
  };

  const handleSubmitAnswers = usePreventDoubleTap(async () => {
    if (requestModel.current === undefined) {
      return;
    }
    AppLog.log("handleSubmitAnswers: ");
    const { hasError, errorBody, dataBody } = await answerApi.request([
      requestModel.current
    ]);
    if (hasError || dataBody === undefined) {
      Alert.alert("Unable to Submit answers.", errorBody);
      return;
    } else {
      // answers submitted. Proceed to next screen
    }
  });

  return (
    <ProgressErrorView
      isLoading={questionApi.loading}
      error={questionApi.error}
      errorView={(message) => {
        return (
          <View>
            <AppLabel text={message} />
          </View>
        );
      }}
      data={questions}>
      <QuestionsView
        submitAnswers={() => {
          requestModel.current = {
            data: toAnswersRequest(questions)
          };
          handleSubmitAnswers();
        }}
        questions={questions}
        submitAnswersLoading={answerApi.loading}
      />
    </ProgressErrorView>
  );
};

export default QuestionsController;
