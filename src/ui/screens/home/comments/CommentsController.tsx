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
  const [comments, setComments] = useState<Comment[] | undefined>([]);
  const { params }: any = useRoute<typeof Props.route>();
  const { themedColors } = usePreferredTheme();
  let { user } = useAuth();

  AppLog.logForcefully("rendering comments controller");

  useEffect(() => {
    AppLog.logForcefully("comments state changes");
    AppLog.logForcefully("newComment " + JSON.stringify(comments));
  }, [comments]);

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
        setComments([]);
      }

      setComments((prevState) => {
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

      return { hasError, dataBody, errorBody };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const retry = (postId: number) => {
    handlePostCommentApi({
      postId: params.postId,
      comment: comments
        ?.filter((item) => item.id === postId)[0]
        .id.toString()!!
    })
      .then((result) => {
        const findIndex: number | undefined = comments?.findIndex(
          (item) => item.id === postId
        );

        if (findIndex !== undefined && findIndex >= 0) {
          let items = [];
          comments?.splice(findIndex, 1, {
            ...comments!![findIndex],
            isError: result?.hasError,
            isLoading: false
          });
          items = [...comments!!];
          setComments(items);
        }
      })
      .catch((error) => {
        AppLog.log("postComment()=> Failure " + JSON.stringify(error));

        const findIndex: number | undefined = comments?.findIndex(
          (item) => item.id === postId
        );

        if (findIndex !== undefined && findIndex >= 0) {
          let items = [];
          comments?.splice(findIndex, 1, {
            ...comments!![findIndex],
            isError: true,
            isLoading: false
          });
          items = [...comments!!];
          setComments(items);
        }
      });
  };

  function postCommentApi(comment: string) {
    let newList: Comment[] = [];

    let commentId =
      comments !== undefined && comments.length > 0
        ? comments[0].id + 1
        : 1;

    let newComment: Comment = {
      postId: params.postId,
      comment: comment,
      userId: user?.profile?.id ?? 0,
      user: {
        profilePicture: user?.profile?.profilePicture,
        firstName: user?.profile?.firstName,
        lastName: user?.profile?.lastName
      } as User,
      id: commentId,
      createdAt: new Date(),
      isLoading: true,
      isError: false
    };

    newList.push(newComment);
    if (comments !== undefined) {
      newList.push(...comments!!);
    }

    setComments(newList);

    handlePostCommentApi({
      postId: params.postId,
      comment: comment
    })
      .then((result) => {
        const findIndex: number | undefined = newList?.findIndex(
          (item) => item.id === commentId
        );

        AppLog.logForcefully("items before" + JSON.stringify(findIndex));
        if (findIndex !== undefined && findIndex >= 0) {
          let items = [];
          newList?.splice(findIndex, 1, {
            ...newList!![findIndex],
            isError: result?.hasError,
            isLoading: false
          });
          items = [...newList!!];
          setComments(items);

          AppLog.logForcefully("items" + JSON.stringify(comments));
        }
      })
      .catch((error) => {
        AppLog.logForcefully(
          "postComment()=> Failure " + JSON.stringify(error)
        );

        const findIndex: number | undefined = comments?.findIndex(
          (item) => item.id === commentId
        );

        if (findIndex !== undefined && findIndex >= 0) {
          let items = [];
          newList?.splice(findIndex, 1, {
            ...newList!![findIndex],
            isError: true,
            isLoading: false
          });
          items = [...newList!!];
          setComments(items);

          AppLog.logForcefully("items" + JSON.stringify(commentId));
        }
      });
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
      retry={retry}
      pullToRefreshCallback={refreshCallback}
    />
  );
};
