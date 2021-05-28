import { UpdateRelationApiRequestModel } from "models/api_requests/UpdateRelationApiRequestModel";
import ApiSuccessResponseModel from "models/api_responses/ApiSuccessResponseModel";
import RelationModel from "models/RelationModel";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { useApi } from "repo/Client";
import RelationApis from "repo/home/RelationApis";

export default (
  messageOnFailed: string,
  onFinish: () => void,
  onSuccess: () => void
) => {
  const [shouldShowDismissPb, setShouldShowDismissPb] = useState(false);
  const sendRequestApi = useApi<
    UpdateRelationApiRequestModel,
    ApiSuccessResponseModel
  >(RelationApis.relationDismissRestore);

  const sendDismissRequest = useCallback(
    async (item?: RelationModel) => {
      setShouldShowDismissPb(true);

      const {
        hasError,
        errorBody,
        dataBody
      } = await sendRequestApi.request([
        {
          receiverId: item?.user?.id ?? 0
        }
      ]);

      if (hasError || dataBody === undefined) {
        Alert.alert(messageOnFailed, errorBody);
        setShouldShowDismissPb(false);
        return;
      } else {
        try {
          onSuccess();
        } finally {
          onFinish();
          setShouldShowDismissPb(false);
        }
      }
    },
    [messageOnFailed, onFinish, onSuccess, sendRequestApi]
  );
  return { shouldShowDismissPb, sendDismissRequest };
};
