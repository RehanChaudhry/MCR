import { PaginationParamsModel } from "models/api_requests/PaginationParamsModel";
import RelationApiResponseModel from "models/api_responses/RelationApiResponseModel";
import MatchesTypeFilter from "models/enums/MatchesTypeFilter";
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
import FriendsApis from "repo/friends/FriendsApis";
import { AppDataContext } from "./AppDataProvider";

export default (
  type?: RelationFilterType,
  relations?: RelationModel[],
  setRelations?: Dispatch<SetStateAction<RelationModel[] | undefined>>,
  overriddenRequestModel?: PaginationParamsModel
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

  const [
    _overriddenRequestModel,
    setOverriddenRequestModel
  ] = useState<PaginationParamsModel>(
    overriddenRequestModel ?? paginationRequestModel
  );

  const [isLoggedInUserAModerator, setIsLoggedInUserAModerator] = useState(
    false
  );

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
  >(FriendsApis.getRelations);

  const handleMyFriendsResponse = useCallback(
    async (
      isFromPullToRefresh: boolean,
      requestModel: PaginationParamsModel,
      onComplete?: (data?: RelationModel[]) => void
    ) => {
      if (!isFromPullToRefresh) {
        setIsLoading(true);
      }
      const { hasError, dataBody, errorBody } = await relationsApi.request(
        [
          {
            ...requestModel,
            filterBy:
              requestModel.filterBy !== MatchesTypeFilter.MATCHES
                ? requestModel.filterBy
                : undefined
          }
        ]
      );
      if (hasError || dataBody === undefined) {
        setErrorMessage(errorBody);
        setIsLoading(false);
        return;
      } else {
        setErrorMessage(undefined);
        setIsLoading(false);
        const data = dataBody.data ?? [];

        if (requestModel.page === 1) {
          setRelations?.(data);
        } else {
          setRelations?.((_oldRelations) => {
            return [...(_oldRelations ?? []), ...data];
          });
        }

        if (requestModel.page === 1) {
          setIsLoggedInUserAModerator(
            data?.filter((value) => value.isModerator === 1)?.length === 0
          );
          setRelationsCount(dataBody.count ?? 0);
          setPendingRelationsCount(dataBody.pendingCount ?? 0);
        }

        setPaginationRequestModel({
          ...requestModel,
          page: requestModel.page! + 1
        });
        setCanLoadMore(data.length >= requestModel.limit!);

        onComplete?.(data);
      }
    },
    [relationsApi, setRelations]
  );

  const onEndReached = useCallback(() => {
    if (relationsApi.loading) {
      return;
    }

    handleMyFriendsResponse(false, {
      ...paginationRequestModel,
      ..._overriddenRequestModel
    });
  }, [
    handleMyFriendsResponse,
    relationsApi.loading,
    paginationRequestModel,
    _overriddenRequestModel
  ]);

  const _refetchRelations = useCallback(
    (
      onComplete?: (data?: RelationModel[]) => void,
      requestModel?: PaginationParamsModel,
      isFromPullToRefresh: boolean = false
    ) => {
      if (relationsApi.loading) {
        onComplete?.();
        return;
      }

      const updatedRequestModel: PaginationParamsModel = {
        ...paginationRequestModel,
        ..._overriddenRequestModel,
        ...requestModel,
        page: 1
      };

      setPaginationRequestModel(updatedRequestModel);

      handleMyFriendsResponse(
        isFromPullToRefresh,
        updatedRequestModel,
        (data?: RelationModel[]) => {
          onComplete?.(data);
        }
      );
    },
    [
      handleMyFriendsResponse,
      relationsApi,
      paginationRequestModel,
      _overriddenRequestModel
    ]
  );

  const refetchRelations = useCallback(
    (requestModel?: PaginationParamsModel) => {
      _refetchRelations(undefined, requestModel, false);
    },
    [_refetchRelations]
  );
  const onPullToRefresh = useCallback(
    (
      onComplete?: (data?: RelationModel[]) => void,
      requestModel?: PaginationParamsModel
    ) => {
      _refetchRelations(onComplete, requestModel, true);
    },
    [_refetchRelations]
  );

  useEffect(() => {
    handleMyFriendsResponse(false, {
      ...paginationRequestModel,
      ..._overriddenRequestModel,
      page: 1
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let listener = () => {
      _refetchRelations();
    };
    addListenerOnResetData(listener);
    return () => {
      removeListenerOnResetData(listener);
    };
  }, [
    _refetchRelations,
    addListenerOnResetData,
    removeListenerOnResetData
  ]);

  return {
    relationsCount,
    pendingRelationsCount,
    isLoading,
    canLoadMore,
    setRelationsCount,
    onEndReached,
    errorMessage,
    onPullToRefresh,
    refetchRelations,
    isLoggedInUserAModerator,
    overriddenRequestModel: _overriddenRequestModel,
    setOverriddenRequestModel
  };
};
