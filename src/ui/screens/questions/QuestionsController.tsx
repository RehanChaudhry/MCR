import useLazyLoadInterface from "hooks/useLazyLoadInterface";
import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { AppLog, SvgProp } from "utils/Util";
import { Section } from "ui/components/organisms/sectioned_list/SectionedList";
import QuestionSection from "models/QuestionSection";
import Question from "models/Question";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { useApi } from "repo/Client";
import {
  AnswerApiRequestModel,
  toAnswersRequest
} from "models/api_requests/AnswerApiRequestModel";
import { AnswerApiResponseModel } from "models/api_responses/AnswerApiResponseModel";
import ProfileApis from "repo/auth/ProfileApis";
import { usePreventDoubleTap } from "hooks";
import { Alert, BackHandler } from "react-native";
import QuestionsResponseModel, {
  toSections
} from "models/api_responses/QuestionsResponseModel";
import { QuestionsView } from "ui/screens/questions/QuestionsView";
import ProgressErrorView from "ui/components/templates/progress_error_view/ProgressErrorView";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import EScreen from "models/enums/EScreen";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import StaticContentRequestModel, {
  StaticContentType
} from "models/api_requests/StaticContentRequestModel";
import StaticContentResponseModel, {
  StaticContent
} from "models/api_responses/StaticContentResponseModel";
import OtherApis from "repo/home/OtherApis";
import { EWelcomeFlowStatus } from "models/api_responses/FetchMyProfileResponseModel";
import SkipTitleButton from "ui/components/molecules/skip_title_button/SkipTitleButton";
import SimpleToast from "react-native-simple-toast";
import { STRINGS } from "config";
import ErrorWithRetryView from "ui/components/molecules/ErrorWithRetryView";
import { Color, NumberProp } from "react-native-svg";
import Exclamation from "assets/images/exclamation.svg";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "routes/HomeStack";
import { WelcomeStackParamList } from "routes/WelcomeStack";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";

type WelcomeAndHomeNavigationProp = StackNavigationProp<
  HomeStackParamList & WelcomeStackParamList
>;

type ProfileRouteProp = RouteProp<WelcomeStackParamList, "Questionnaire">;

type Props = {};

const QuestionsController: FC<Props> = () => {
  AppLog.log(() => "Opening QuestionsController");

  const route = useRoute<ProfileRouteProp>();
  const navigation = useNavigation<WelcomeAndHomeNavigationProp>();

  const moveToHomeScreen = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Matches" }]
    });
  }, [navigation]);

  useEffect(() => {
    if (route.params.isFrom === EScreen.WELCOME) {
      const exitAppHandler = () => {
        BackHandler.exitApp();
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", exitAppHandler);
      return () =>
        BackHandler.removeEventListener(
          "hardwareBackPress",
          exitAppHandler
        );
    }
  }, [route.params.isFrom]);

  useFocusEffect(
    useCallback(() => {
      if (route.params.isFrom === EScreen.WELCOME) {
        navigation.setOptions({
          headerLeft: () => null,
          headerTitle: () => (
            <HeaderTitle text={STRINGS.questionnaire.title_update} />
          ),
          headerRight: () => (
            <SkipTitleButton
              onPress={moveToHomeScreen}
              updateProfileRequest={{
                questionnaireStatus: EWelcomeFlowStatus.SKIPPED
              }}
            />
          )
        });
      } else if (
        route.params.isFrom === EScreen.MATCH_INFO ||
        EScreen.ACTIVTY_LOG
      ) {
        navigation.setOptions({
          headerTitle: () => (
            <HeaderTitle text={STRINGS.questionnaire.title_update} />
          ),
          headerLeft: () => (
            <HeaderLeftTextWithIcon
              onPress={() => {
                navigation.pop();
              }}
            />
          )
        });
      } else {
        navigation.dangerouslyGetParent()?.setOptions({
          headerLeft: () => <Hamburger />,
          headerTitle: () => (
            <HeaderTitle text={STRINGS.questionnaire.title_update} />
          )
        });
      }
    }, [navigation, route.params.isFrom, moveToHomeScreen])
  );

  const requestModel = useRef<AnswerApiRequestModel>();

  // static content
  const [headerContent, setHeaderContent] = useState<StaticContent>();

  const staticContentApi = useApi<
    StaticContentRequestModel,
    StaticContentResponseModel
  >(OtherApis.staticContent);

  const getHeaderContent = useCallback(async () => {
    const {
      hasError,
      dataBody,
      errorBody
    } = await staticContentApi.request([
      { type: StaticContentType.QUESTIONNAIRE }
    ]);
    if (hasError || dataBody === undefined) {
      AppLog.log(() => "Unable to find header content " + errorBody);
      return;
    } else {
      setHeaderContent(dataBody.data);
    }
  }, [staticContentApi]);

  const moveToHeaderContent = useCallback(
    (content: StaticContent) => {
      navigation.navigate("StaticContent", {
        isFrom: route.params.isFrom,
        staticContent: content
      });
    },
    [route.params.isFrom, navigation]
  );

  const [questions, setQuestions] = useState<
    Section<QuestionSection, Question>[]
  >([]);

  const questionApi = useApi<any, QuestionsResponseModel>(
    ProfileApis.questions
  );

  const answerApi = useApi<AnswerApiRequestModel, AnswerApiResponseModel>(
    ProfileApis.answers
  );

  const requestGetQuestionsApi = useCallback(
    async (onComplete?: () => void) => {
      const { hasError, dataBody, errorBody } = await questionApi.request(
        []
      );
      if (hasError || dataBody === undefined) {
        // Alert.alert("Unable to find questions " + errorBody);
        AppLog.log(() => "Unable to find questions " + errorBody);
        return;
      } else {
        setQuestions(toSections(dataBody.data ?? []));
        onComplete?.();
      }
    },
    [questionApi]
  );

  const init = useCallback(() => {
    getHeaderContent();
    requestGetQuestionsApi();
  }, [getHeaderContent, requestGetQuestionsApi]);

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitAnswers = usePreventDoubleTap(async () => {
    if (requestModel.current === undefined) {
      return;
    }
    AppLog.log(() => "handleSubmitAnswers: ");
    const { hasError, errorBody, dataBody } = await answerApi.request([
      requestModel.current!
    ]);
    if (hasError || dataBody === undefined) {
      Alert.alert("Unable to Submit answers.", errorBody);
      return;
    } else {
      if (route.params.isFrom === EScreen.WELCOME) {
        SimpleToast.show(dataBody.message);
        moveToHomeScreen();
      } else {
        Alert.alert(
          STRINGS.questionnaire.popup.title_success,
          dataBody.message
        );
      }
    }
  });

  const submitAnswersCallback = useCallback(() => {
    requestModel.current = {
      answers: toAnswersRequest(questions)
    };
    handleSubmitAnswers();
  }, [handleSubmitAnswers, questions]);

  const errorImage: SvgProp = (
    color?: Color,
    width?: NumberProp,
    height?: NumberProp
  ) => <Exclamation fill={color} width={width} height={height} />;

  return (
    <ProgressErrorView
      isLoading={questionApi.loading}
      error={questionApi.error || staticContentApi.error}
      errorView={(message) => (
        <ErrorWithRetryView
          image={errorImage}
          text={message}
          retryCallback={init}
        />
      )}
      data={questions && headerContent}>
      {useLazyLoadInterface(
        <QuestionsView
          headerContent={headerContent!}
          moveToHeaderContent={moveToHeaderContent}
          isFrom={route.params.isFrom}
          submitAnswers={submitAnswersCallback}
          questions={questions}
          submitAnswersLoading={answerApi.loading}
        />,
        null,
        1000
      )}
    </ProgressErrorView>
  );
};

export default QuestionsController;
