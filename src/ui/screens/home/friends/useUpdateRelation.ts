import {
  UpdateRelationApiRequestModel,
  UpdateRelationStatus
} from "models/api_requests/UpdateRelationApiRequestModel";
import { UpdateRelationApiResponseModel } from "models/api_responses/UpdateRelationApiResponseModel";
import RelationModel from "models/RelationModel";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import SimpleToast from "react-native-simple-toast";
import { useApi } from "repo/Client";
import RelationApis from "repo/home/RelationApis";

export default (
  status: UpdateRelationStatus,
  messageOnFailed: string,
  onFinish: (() => void) | undefined,
  onSuccess: (item: RelationModel) => void
) => {
  const [shouldShowPb, setShouldShowPb] = useState(false);
  const updateRelationApi = useApi<
    UpdateRelationApiRequestModel,
    UpdateRelationApiResponseModel
  >(RelationApis.updateRelation);

  const updateRelation = useCallback(
    async (item?: RelationModel) => {
      if (!item) {
        return;
      }

      setShouldShowPb(true);

      const {
        hasError,
        errorBody,
        dataBody
      } = await updateRelationApi.request([
        {
          receiverId: item.user?.id ?? 0,
          status: status
        }
      ]);

      if (hasError || dataBody === undefined) {
        Alert.alert(messageOnFailed, errorBody);
        setShouldShowPb(false);
        return;
      } else {
        SimpleToast.show(dataBody.message);
        try {
          onSuccess(item);
        } finally {
          onFinish?.();
          setShouldShowPb(false);
        }
      }
    },
    [messageOnFailed, status, onFinish, onSuccess, updateRelationApi]
  );
  return { shouldShowPb, updateRelation };
};
