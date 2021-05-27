import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PaginationParamsModel } from "models/api_requests/PaginationParamsModel";
import { PendingRequestsResponseModel } from "models/api_responses/PendingRequestsResponseModel";
import RelationModel from "models/RelationModel";
import React, {
  FC,
  useContext,
  useEffect,
  useLayoutEffect,
  useState
} from "react";
import { useApi } from "repo/Client";
import FriendsApis from "repo/friends/FriendsApis";
import { ConnectionRequestStackParamList } from "routes/ConnectionRequestStack";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { MyFriendsContext } from "ui/screens/home/friends/MyFriendsProvider";
import ConnectRequestsView from "./ConnectRequestsView";

type Props = {};

type ConnectRequestRouteProp = RouteProp<
  ConnectionRequestStackParamList,
  "FriendRequests"
>;

type ConnectRequestsNavigationProp = StackNavigationProp<
  ConnectionRequestStackParamList,
  "FriendRequests"
>;

export enum ConnectRequestType {
  FRIEND_REQUESTS = "friend_requests",
  ROOMMATE_REQUESTS = "roommate_requests"
}

const ConnectRequestsController: FC<Props> = () => {
  const route = useRoute<ConnectRequestRouteProp>();
  const { title, type } = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [requestModel, setRequestModel] = useState<PaginationParamsModel>({
    page: 1,
    limit: 5,
    paginate: true
  });

  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [connectRequests, setConnectRequests] = useState<
    Array<RelationModel>
  >();

  const connectRequestsApi = useApi<
    PaginationParamsModel,
    PendingRequestsResponseModel
  >(
    type === ConnectRequestType.FRIEND_REQUESTS
      ? FriendsApis.getFriendsRequests
      : FriendsApis.getRoommateRequests
  );

  const handleConnectRequestsResponse = async (
    isFromPullToRefresh: boolean,
    _requestModel: PaginationParamsModel,
    onComplete?: () => void
  ) => {
    const {
      hasError,
      dataBody,
      errorBody
    } = await connectRequestsApi.request([_requestModel]);

    if (hasError || dataBody === undefined) {
      setIsLoading(false);
      setErrorMessage(errorBody);
      return;
    } else {
      setIsLoading(false);
      setErrorMessage(undefined);
      const data = dataBody.data ?? [];

      if (isFromPullToRefresh) {
        setConnectRequests(data);
      } else {
        setConnectRequests([...(connectRequests ?? []), ...data]);
      }

      setRequestModel({
        ..._requestModel,
        page: _requestModel.page + 1
      });

      setCanLoadMore(data.length >= _requestModel.limit);

      onComplete?.();
    }
  };

  const onEndReached = () => {
    if (connectRequestsApi.loading) {
      return;
    }

    handleConnectRequestsResponse(false, requestModel);
  };

  const onPullToRefresh = (onComplete?: () => void) => {
    if (connectRequestsApi.loading) {
      onComplete?.();
      return;
    }

    const _requestModel: PaginationParamsModel = {
      ...requestModel,
      page: 1
    };

    setRequestModel(_requestModel);

    handleConnectRequestsResponse(true, _requestModel, () => {
      onComplete?.();
    });
  };

  useEffect(() => {
    handleConnectRequestsResponse(false, requestModel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { resetMyFriends } = useContext(MyFriendsContext);
  function removeItemFromList(_item: RelationModel) {
    resetMyFriends?.();
    setConnectRequests(
      connectRequests?.filter((value) => value.id !== _item.id)
    );
  }

  const navigation = useNavigation<ConnectRequestsNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftTextWithIcon
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerTitleAlign: "center",
      headerTitle: () => <HeaderTitle text={title} />
    });
  }, [navigation, title]);

  return (
    <ConnectRequestsView
      data={connectRequests}
      isLoading={isLoading}
      canLoadMore={canLoadMore}
      error={errorMessage}
      onEndReached={onEndReached}
      onPullToRefresh={onPullToRefresh}
      removeItemFromList={removeItemFromList}
    />
  );
};

export default ConnectRequestsController;
