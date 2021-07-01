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
  SetStateAction,
  useRef
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
  const paginationRequestModel = useRef<PaginationParamsModel>({
    type: type,
    page: 1,
    limit: 9,
    paginate: true,
    ...overriddenRequestModel
  });

  const [isLoggedInUserAModerator, setIsLoggedInUserAModerator] = useState(
    false
  );

  const [isLoading, _setIsLoading] = useState(true);

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
      onComplete?: (data?: RelationModel[]) => void
    ) => {
      const requestModel = paginationRequestModel.current;
      if (!isFromPullToRefresh) {
        _setIsLoading(true);
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

      if (
        requestModel.filterBy !== paginationRequestModel.current.filterBy
      ) {
        return;
      }

      if (hasError || dataBody === undefined) {
        setErrorMessage(errorBody);
        _setIsLoading(false);
        return;
      } else {
        setErrorMessage(undefined);
        _setIsLoading(false);
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

        paginationRequestModel.current = {
          ...requestModel,
          page: requestModel.page! + 1
        };
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

    handleMyFriendsResponse(false);
  }, [handleMyFriendsResponse, relationsApi.loading]);

  const _refetchRelations = useCallback(
    (
      onComplete?: (data?: RelationModel[]) => void,
      requestModelFieldsToOverride?: PaginationParamsModel,
      isFromPullToRefresh: boolean = false
    ) => {
      paginationRequestModel.current = {
        ...paginationRequestModel.current,
        ...requestModelFieldsToOverride,
        page: 1
      };

      handleMyFriendsResponse(
        isFromPullToRefresh,
        (data?: RelationModel[]) => {
          onComplete?.(data);
        }
      );
    },
    [handleMyFriendsResponse]
  );

  const refetchRelationsFromStart = useCallback(
    (requestModelFieldsToOverride?: PaginationParamsModel) => {
      setRelations?.(undefined);
      setRelationsCount?.(0);
      _refetchRelations(undefined, requestModelFieldsToOverride, false);
    },
    [setRelations, setRelationsCount, _refetchRelations]
  );

  const onPullToRefresh = useCallback(
    (onComplete?: (data?: RelationModel[]) => void) => {
      _refetchRelations(onComplete, undefined, true);
    },
    [_refetchRelations]
  );

  useEffect(() => {
    paginationRequestModel.current = {
      ...paginationRequestModel.current,
      page: 1
    };
    handleMyFriendsResponse(false);
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
    refetchRelationsFromStart,
    isLoggedInUserAModerator
  };
};
