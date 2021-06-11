import { PaginationParamsModel } from "models/api_requests/PaginationParamsModel";
import RelationApiResponseModel from "models/api_responses/RelationApiResponseModel";
import RelationFilterType from "models/enums/RelationFilterType";
import RelationModel from "models/RelationModel";
import {
  useState,
  useContext,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction
} from "react";
import { useApi } from "repo/Client";
import RelationsApis from "repo/friends/FriendsApis";
import { AppDataContext } from "./AppDataProvider";

export default (
  type?: RelationFilterType,
  relations?: RelationModel[],
  setRelations?: Dispatch<SetStateAction<RelationModel[] | undefined>>
) => {
  const [
    paginationRequestModel,
    setPaginationRequestModel
  ] = useState<PaginationParamsModel>({
    type: type,
    page: 1,
    limit: 9,
    paginate: true
  });

  const [isLoading, setIsLoading] = useState(true);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>();

  const [relationsCount, setRelationsCount] = useState<number>(0);
  const [
    pendingRelationsCount,
    setPendingRelationsCount
  ] = useState<number>(0);

  const { addListenerOnResetData, removeListenerOnResetData } = useContext(
    AppDataContext
  );

  const relationsApi = useApi<
    PaginationParamsModel,
    RelationApiResponseModel
  >(RelationsApis.getRelations);

  const handleMyFriendsResponse = useCallback(
    async (
      isFromPullToRefresh: boolean,
      requestModel: PaginationParamsModel,
      onComplete?: () => void
    ) => {
      const {
        hasError,
        dataBody,
        errorBody
      } = await relationsApi.request([requestModel]);
      if (hasError || dataBody === undefined) {
        setErrorMessage(errorBody);
        setIsLoading(false);
        return;
      } else {
        setErrorMessage(undefined);
        setIsLoading(false);
        const data = dataBody.data ?? [];

        if (isFromPullToRefresh) {
          setRelations?.(data);
        } else {
          setRelations?.([...(relations ?? []), ...data]);
        }

        if (requestModel.page === 1) {
          setRelationsCount(dataBody.count ?? 0);
          setPendingRelationsCount(dataBody.pendingCount ?? 0);
        }

        setPaginationRequestModel({
          ...requestModel,
          page: requestModel.page! + 1
        });
        setCanLoadMore(data.length >= requestModel.limit!);

        onComplete?.();
      }
    },
    [relations, relationsApi, setRelations]
  );

  const onEndReached = useCallback(() => {
    if (relationsApi.loading) {
      return;
    }

    handleMyFriendsResponse(false, paginationRequestModel);
  }, [
    handleMyFriendsResponse,
    relationsApi.loading,
    paginationRequestModel
  ]);

  const onPullToRefresh = useCallback(
    (onComplete?: () => void) => {
      if (relationsApi.loading) {
        onComplete?.();
        return;
      }

      const myFriendRequestModel: PaginationParamsModel = {
        ...paginationRequestModel,
        page: 1
      };

      setPaginationRequestModel(myFriendRequestModel);

      handleMyFriendsResponse(true, myFriendRequestModel, () => {
        onComplete?.();
      });
    },
    [handleMyFriendsResponse, relationsApi, paginationRequestModel]
  );

  useEffect(() => {
    handleMyFriendsResponse(false, paginationRequestModel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let listener = () => {
      onPullToRefresh();
    };
    addListenerOnResetData(listener);
    return () => {
      removeListenerOnResetData(listener);
    };
  }, [onPullToRefresh, addListenerOnResetData, removeListenerOnResetData]);

  return {
    relationsCount,
    pendingRelationsCount,
    isLoading,
    canLoadMore,
    onEndReached,
    errorMessage,
    onPullToRefresh
  };
};
