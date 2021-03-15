import React, {
  FC,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { SectionedListView } from "./SectionedListView";
import { AppLog } from "utils/Util";
import { Section } from "ui/components/organisms/sectioned_list/SectionedList";
import QuestionSection from "models/QuestionSection";
import Question from "models/Question";
import { HomeStackParamList } from "routes";
import { StackNavigationProp } from "@react-navigation/stack";
import NoHeader from "ui/components/headers/NoHeader";
import { useNavigation } from "@react-navigation/native";
import { useApi } from "repo/Client";
import { AnswerApiRequestModel } from "models/api_requests/AnswerApiRequestModel";
import { AnswerApiResponseModel } from "models/api_responses/AnswerApiResponseModel";
import ProfileApis from "repo/auth/ProfileApis";
import { usePreventDoubleTap } from "hooks";
import { Alert } from "react-native";
import {
  QuestionsResponseModel,
  toAnswersRequest,
  toSections
} from "models/api_responses/QuestionsResponseModel";

type QuestionsNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "Questions"
>;

type Props = {};

const QuestionsController: FC<Props> = () => {
  AppLog.log("Opening QuestionsController");
  const requestModel = useRef<AnswerApiRequestModel>();

  const navigation = useNavigation<QuestionsNavigationProp>();

  const [questions, setQuestions] = useState<
    Section<QuestionSection, Question>[]
  >([]);

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

  useEffect(() => {
    handleGetQuestionsApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetQuestionsApi = async (onComplete?: () => void) => {
    const { hasError, dataBody, errorBody } = await questionApi.request(
      []
    );
    if (hasError || dataBody === undefined) {
      Alert.alert("Unable to find questions " + errorBody);
      return;
    } else {
      setQuestions(toSections(dataBody));
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
      Alert.alert("Unable to Sign In", errorBody);
      return;
    } else {
      // answers submitted. Proceed to next screen
    }
  });

  return (
    <SectionedListView
      submitAnswers={() => {
        requestModel.current = {
          data: toAnswersRequest(questions)
        };
        handleSubmitAnswers();
      }}
    />
  );
};

export default QuestionsController;
