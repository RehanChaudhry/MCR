import useLazyLoadInterface from "hooks/useLazyLoadInterface";
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
import {
  RouteProp,
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
import { usePreferredTheme, usePreventDoubleTap } from "hooks";
import { Alert, View } from "react-native";
import QuestionsResponseModel from "models/api_responses/QuestionsResponseModel";
import { QuestionsView } from "ui/screens/questions/QuestionsView";
import ProgressErrorView from "ui/components/templates/progress_error_view/ProgressErrorView";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
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
import { GetAnswersResponseModel } from "models/api_responses/GetAnswersResponseModel";
import StaticContentRequestModel, {
  StaticContentType
} from "models/api_requests/StaticContentRequestModel";
import StaticContentResponseModel, {
  StaticContent
} from "models/api_responses/StaticContentResponseModel";
import OtherApis from "repo/home/OtherApis";
import { ProfileStackParamList } from "routes/ProfileBottomBar";
import { ProfileRootStackParamList } from "routes/ProfileRootStack";
import { StackNavigationProp } from "@react-navigation/stack";

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

type ProfileRootNavigationProp = StackNavigationProp<ProfileRootStackParamList>;

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
  const profileRootNavigation = useNavigation<ProfileRootNavigationProp>();
  const homeNavigation = useNavigation<HomeNavigationProp>();
  const welcomeNavigation = useNavigation<WelcomeNavigationProp>();
  const profileNavigation = useNavigation<ProfileNavigationProp>();
  const matchesNavigation = useNavigation<MatchesNavigationProp>();

  const isQuestionAnswersFetched = useRef<boolean>(false);

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
      AppLog.log("Unable to find header content " + errorBody);
      return;
    } else {
      setHeaderContent(dataBody.data);
    }
  }, [staticContentApi]);

  const moveToHeaderContent = useCallback(
    (content: StaticContent) => {
      profileRootNavigation.navigate("StaticContent", {
        isFrom: route.params.isFrom,
        staticContent: content
      });
    },
    [route.params.isFrom, profileRootNavigation]
  );

  const [questions, setQuestions] = useState<
    Section<QuestionSection, Question>[]
  >([]);

  const questionApi = useApi<any, QuestionsResponseModel>(
    ProfileApis.questions
  );

  const getAnswersApi = useApi<any, GetAnswersResponseModel>(
    ProfileApis.getAnswers
  );

  const answerApi = useApi<AnswerApiRequestModel, AnswerApiResponseModel>(
    ProfileApis.answers
  );

  useEffect(() => {
    isQuestionAnswersFetched.current = false;
    getHeaderContent();
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
      await handleGetAnswersApi(
        new QuestionsResponseModel(dataBody.message, dataBody.data)
      );
      onComplete?.();
    }
  };

  const handleGetAnswersApi = async (
    questionsApiResponse?: QuestionsResponseModel,
    onComplete?: () => void
  ) => {
    const { hasError, dataBody, errorBody } = await getAnswersApi.request(
      []
    );
    if (hasError || dataBody === undefined) {
      // Alert.alert("Unable to find questions " + errorBody);
      AppLog.log("Unable to find answers " + errorBody);
      return;
    } else {
      questionsApiResponse?.assignAnswers(dataBody.data);
      isQuestionAnswersFetched.current = true;
      setQuestions(questionsApiResponse?.toSections() ?? []);
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
      if (route.params.isFrom === EScreen.WELCOME) {
        moveToHomeScreen();
      }
    }
  });

  const submitAnswersCallback = useCallback(() => {
    requestModel.current = {
      answers: toAnswersRequest(questions)
    };
    handleSubmitAnswers();
  }, [handleSubmitAnswers, questions]);

  return (
    <ProgressErrorView
      isLoading={!isQuestionAnswersFetched.current}
      error={
        questionApi.error || getAnswersApi.error || staticContentApi.error
      }
      errorView={(message) => {
        return (
          <View>
            <AppLabel text={message} />
          </View>
        );
      }}
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
