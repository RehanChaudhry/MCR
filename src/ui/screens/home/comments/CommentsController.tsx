import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Close from "assets/images/close.svg";
import Strings from "config/Strings";
import { usePreferredTheme } from "hooks";
import ChatItem from "models/ChatItem";
import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { View } from "react-native";
import { useApi } from "repo/Client";
import { CommunityStackParamList } from "routes/CommunityStack";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import ProgressErrorView from "ui/components/templates/progress_error_view/ProgressErrorView";
import { CommentsView } from "ui/screens/home/comments/CommentsView";
import { AppLog } from "utils/Util";
import CommentsRequestModel from "models/api_requests/CommentsRequestModel";
import CommunityAnnouncementApis from "repo/home/CommunityAnnouncementApis";
import {
  Comment,
  CommentsResponseModel
} from "models/api_responses/CommentsResponseModel";

type CommunityNavigationProp = StackNavigationProp<
  CommunityStackParamList,
  "Comments"
>;

type CommentsParams = RouteProp<CommunityStackParamList, "Comments">;

type Props = {
  route: CommentsParams;
  navigation: CommunityNavigationProp;
};

export const CommentsController: FC<Props> = (Props) => {
  const navigation = useNavigation<typeof Props.navigation>();
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);
  const [shouldShowProgressBar, setShouldShowProgressBar] = useState(true);
  const isFetchingInProgress = useRef(false);
  const [comments, _comments] = useState<Comment[]>([]);
  const { params }: any = useRoute<typeof Props.route>();
  const { themedColors } = usePreferredTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerTitle: () => <HeaderTitle text={Strings.comments.comments} />,
      headerLeft: () => (
        <HeaderLeftTextWithIcon
          text={Strings.chatThreadScreen.titleLeft}
          onPress={() => {
            navigation.goBack();
          }}
          icon={() => (
            <Close width={15} height={15} fill={themedColors.primary} />
          )}
        />
      )
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestModel = useRef<CommentsRequestModel>({
    paginate: true,
    page: 1,
    limit: 10,
    postId: params?.postId
  });

  const getComments = useApi<CommentsRequestModel, CommentsResponseModel>(
    CommunityAnnouncementApis.getComments
  );

  const handleGetCommentsApi = useCallback(async () => {
    if (isFetchingInProgress.current) {
      return;
    }

    isFetchingInProgress.current = true;
    setShouldShowProgressBar(true);

    const { hasError, dataBody, errorBody } = await getComments.request([
      requestModel
    ]);

    setShouldShowProgressBar(false);
    isFetchingInProgress.current = false;

    if (hasError || dataBody === undefined) {
      AppLog.logForcefully("Unable to find chats " + errorBody);
      return;
    } else {
      // to handle pull to refresh
      if (requestModel.current.page === 1) {
        _comments([]);
      }

      _comments((prevState) => {
        return [
          ...(prevState === undefined || requestModel.current.page === 1
            ? []
            : prevState),
          ...dataBody.data
        ];
      });

      setIsAllDataLoaded(
        dataBody.data.length < requestModel.current.limit
      );
    }

    /*AppLog.logForcefully("Find chats" + errorBody);
      setComments(dataBody.data);
      onComplete?.();*/

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEndReached = useCallback(async () => {
    requestModel.current.page = requestModel.current.page!! + 1;
    await handleGetCommentsApi();
  }, [handleGetCommentsApi]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const refreshCallback = useCallback(
    async (onComplete: () => void) => {
      requestModel.current.page = 1;
      handleGetCommentsApi().then(() => {
        onComplete();
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const sentMessage = (message: ChatItem) => {
    AppLog.log("message to sent : " + JSON.stringify(message));
  };

  function updateCommentsList(
    oldList: ChatItem[],
    message: ChatItem
  ): ChatItem[] {
    sentMessage(message);

    let newList: ChatItem[] = [];

    newList.push(...oldList);
    newList.push(message);

    return newList;
  }

  useEffect(() => {
    handleGetCommentsApi().then().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProgressErrorView
      data={comments}
      isLoading={getComments.loading}
      error={getComments.error}
      errorView={(message) => {
        return (
          <View>
            <AppLabel text={message} />
          </View>
        );
      }}>
      <CommentsView
        data={comments}
        sentMessageApi={updateCommentsList}
        shouldShowProgressBar={shouldShowProgressBar}
        onEndReached={onEndReached}
        isAllDataLoaded={isAllDataLoaded}
        error={getComments.error}
      />
    </ProgressErrorView>
  );
};
