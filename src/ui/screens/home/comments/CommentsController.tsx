import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Close from "assets/images/close.svg";
import Strings from "config/Strings";
import { useAuth, usePreferredTheme } from "hooks";
import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { useApi } from "repo/Client";
import { CommunityStackParamList } from "routes/CommunityStack";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { CommentsView } from "ui/screens/home/comments/CommentsView";
import { AppLog } from "utils/Util";
import CommentsRequestModel from "models/api_requests/CommentsRequestModel";
import CommunityAnnouncementApis from "repo/home/CommunityAnnouncementApis";
import {
  Comment,
  CommentsResponseModel,
  User
} from "models/api_responses/CommentsResponseModel";
import PostCommentApiRequestModel from "models/api_requests/PostCommentApiRequestModel";
import PostCommentApiResponseModel from "models/api_responses/PostCommentApiResponseModel";

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
  const [comments, _comments] = useState<Comment[] | undefined>(undefined);
  const { params }: any = useRoute<typeof Props.route>();
  const { themedColors } = usePreferredTheme();
  let { user } = useAuth();

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
    postId: /* params?.postId*/ 20
  });

  const getComments = useApi<CommentsRequestModel, CommentsResponseModel>(
    CommunityAnnouncementApis.getComments
  );

  const postComment = useApi<
    PostCommentApiRequestModel,
    PostCommentApiResponseModel
  >(CommunityAnnouncementApis.postComment);

  const handleGetCommentsApi = useCallback(async () => {
    if (isFetchingInProgress.current) {
      return;
    }

    isFetchingInProgress.current = true;
    setShouldShowProgressBar(true);

    const { hasError, dataBody, errorBody } = await getComments.request([
      requestModel.current
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePostCommentApi = useCallback(
    async (request: PostCommentApiRequestModel) => {
      if (isFetchingInProgress.current) {
        return;
      }

      isFetchingInProgress.current = true;
      setShouldShowProgressBar(true);

      const { hasError, dataBody, errorBody } = await postComment.request([
        request
      ]);

      setShouldShowProgressBar(false);
      isFetchingInProgress.current = false;

      if (hasError || dataBody === undefined) {
        return errorBody;
      } else {
        return dataBody;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  function postCommentApi(comment: string) {
    let newList: Comment[] = [];

    let commentId =
      comments !== undefined && comments.length > 0
        ? comments[0].id + 1
        : 1;

    handlePostCommentApi({
      postId: params.postId,
      comment: comment
    })
      .then((result) => {
        if (comments) {
          setTimeout(() => {
            let items = [
              {
                ...newList[0],
                isError: false,
                isLoading: false
              },
              ...newList.slice(1)
            ];
            _comments(items);

            AppLog.log("Items: " + JSON.stringify(items));
          }, 5000);
        }
        AppLog.log("postComment()=> Success " + JSON.stringify(result));
      })
      .catch((error) => {
        AppLog.log("postComment()=> Failure " + JSON.stringify(error));

        let items = [
          {
            ...newList[0],
            isError: true,
            isLoading: false
          },
          ...newList.slice(1)
        ];
        _comments(items);
      });

    let newComment: Comment = {
      postId: params.postId,
      comment: comment,
      userId: user?.profile?.id ?? 0,
      user: user?.profile as User,
      id: commentId,
      createdAt: new Date(),
      isLoading: true,
      isError: false
    };

    newList.push(newComment);
    if (comment !== undefined) {
      newList.push(...comments!!);
    }

    _comments(newList);
  }

  const onEndReached = useCallback(async () => {
    AppLog.logForcefully("onEndReached");
    requestModel.current.page = requestModel.current.page!! + 1;
    await handleGetCommentsApi();
  }, [handleGetCommentsApi]);

  const refreshCallback = useCallback(
    async (onComplete: () => void) => {
      requestModel.current.page = 1;
      handleGetCommentsApi()
        .then(() => {
          onComplete();
        })
        .catch(() => {
          onComplete();
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    handleGetCommentsApi().then().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CommentsView
      data={comments}
      sentMessageApi={postCommentApi}
      shouldShowProgressBar={shouldShowProgressBar}
      onEndReached={onEndReached}
      isAllDataLoaded={isAllDataLoaded}
      error={getComments.error}
      pullToRefreshCallback={refreshCallback}
    />
  );
};
