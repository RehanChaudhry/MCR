import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { AppLog } from "utils/Util";
import { Section } from "ui/components/organisms/sectioned_list/SectionedList";
import QuestionSection from "models/QuestionSection";
import Question from "models/Question";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { useApi } from "repo/Client";
import { AnswerApiRequestModel } from "models/api_requests/AnswerApiRequestModel";
import { AnswerApiResponseModel } from "models/api_responses/AnswerApiResponseModel";
import ProfileApis from "repo/auth/ProfileApis";
import { usePreferredTheme, usePreventDoubleTap } from "hooks";
import { Alert, View } from "react-native";
import {
  QuestionsResponseModel,
  toAnswersRequest,
  toSections
} from "models/api_responses/QuestionsResponseModel";
import { QuestionsView } from "ui/screens/questions/QuestionsView";
import ProgressErrorView from "ui/components/templates/progress_error_view/ProgressErrorView";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { ProfileStackParamList } from "routes/ProfileBottomBar";
import { UpdateQuestionnaireStackParamList } from "routes/ProfileStack";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import EScreen from "models/enums/EScreen";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import { MatchesStackParamList } from "routes/MatchesStack";
import { WelcomeStackParamList } from "routes/WelcomeStack";
import RightArrow from "assets/images/right.svg";
import LeftArrow from "assets/images/left.svg";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { HomeDrawerParamList } from "routes";
import useLazyLoadInterface from "hooks/useLazyLoadInterface";

type WelcomeNavigationProp = StackNavigationProp<
  WelcomeStackParamList,
  "Questionnaire"
>;

type MatchesNavigationProp = StackNavigationProp<
  MatchesStackParamList,
  "Questionnaire"
>;

type ProfileNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "UpdateQuestionnaire"
>;

type HomeNavigationProp = DrawerNavigationProp<HomeDrawerParamList>;

type ProfileRouteProp = RouteProp<
  UpdateQuestionnaireStackParamList,
  "UpdateQuestionnaire"
>;

type Props = {};

const QuestionsController: FC<Props> = () => {
  AppLog.log("Opening QuestionsController");

  const { themedColors } = usePreferredTheme();

  const route = useRoute<ProfileRouteProp>();
  const homeNavigation = useNavigation<HomeNavigationProp>();
  const welcomeNavigation = useNavigation<WelcomeNavigationProp>();
  const profileNavigation = useNavigation<ProfileNavigationProp>();
  const matchesNavigation = useNavigation<MatchesNavigationProp>();

  const moveToHomeScreen = useCallback(() => {
    homeNavigation.reset({
      index: 0,
      routes: [{ name: "Matches" }]
    });
  }, [homeNavigation]);

  useLayoutEffect(() => {
    if (route.params.isFrom === EScreen.WELCOME) {
      welcomeNavigation.setOptions({
        headerLeft: () => (
          <HeaderLeftTextWithIcon
            text={"Back"}
            icon={() => {
              return (
                <LeftArrow
                  width={20}
                  height={20}
                  fill={themedColors.interface["700"]}
                />
              );
            }}
            onPress={() => {
              welcomeNavigation.pop();
            }}
          />
        ),
        headerRight: () => (
          <HeaderRightTextWithIcon
            text="Skip"
            fontWeight={"normal"}
            textStyle={{ color: themedColors.interface["700"] }}
            icon={() => {
              return (
                <RightArrow
                  width={20}
                  height={20}
                  fill={themedColors.interface["700"]}
                />
              );
            }}
            onPress={() => {
              moveToHomeScreen();
            }}
          />
        )
      });
    }

    if (route.params.isFrom === EScreen.MY_PROFILE) {
      profileNavigation.setOptions({
        headerLeft: () => <Hamburger />
      });
    }

    if (route.params.isFrom === EScreen.MATCH_INFO) {
      matchesNavigation.setOptions({
        headerLeft: () => (
          <HeaderLeftTextWithIcon
            onPress={() => {
              matchesNavigation.pop();
            }}
          />
        )
      });
    }
  }, [
    matchesNavigation,
    homeNavigation,
    profileNavigation,
    welcomeNavigation,
    themedColors.interface,
    route.params.isFrom,
    moveToHomeScreen
  ]);

  const requestModel = useRef<AnswerApiRequestModel>();

  const [questions, setQuestions] = useState<
    Section<QuestionSection, Question>[]
  >([]);

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
      requestModel.current!
    ]);
    if (hasError || dataBody === undefined) {
      Alert.alert("Unable to Submit answers.", errorBody);
      return;
    } else {
      // answers submitted. Proceed to next screen
    }
  });

  const submitAnswersCallback = useCallback(() => {
    requestModel.current = {
      answers: toAnswersRequest(questions)
    };
    handleSubmitAnswers();
  }, [handleSubmitAnswers, questions]);

  return (
    <>
      {useLazyLoadInterface(
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
            isFrom={route.params.isFrom}
            submitAnswers={submitAnswersCallback}
            questions={questions}
            submitAnswersLoading={answerApi.loading}
          />
        </ProgressErrorView>
      )}
    </>
  );
};

export default QuestionsController;
