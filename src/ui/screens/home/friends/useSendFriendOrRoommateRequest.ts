import { UpdateRelationApiRequestModel } from "models/api_requests/UpdateRelationApiRequestModel";
import { UpdateRelationApiResponseModel } from "models/api_responses/UpdateRelationApiResponseModel";
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
  const [shouldShowPb, setShouldShowPb] = useState(false);
  const sendRequestApi = useApi<
    UpdateRelationApiRequestModel,
    UpdateRelationApiResponseModel
  >(RelationApis.sendFriendOrRoommateRequest);

  const sendRequest = useCallback(
    async (item?: RelationModel) => {
      setShouldShowPb(true);

      const {
        hasError,
        errorBody,
        dataBody
      } = await sendRequestApi.request([
        {
          receiverId: item?.user?.id?.toString() ?? ""
        }
      ]);

      if (hasError || dataBody === undefined) {
        Alert.alert(messageOnFailed, errorBody);
        setShouldShowPb(false);
        return;
      } else {
        try {
          onSuccess();
        } finally {
          onFinish();
          setShouldShowPb(false);
        }
      }
    },
    [messageOnFailed, onFinish, onSuccess, sendRequestApi]
  );
  return { shouldShowPb, sendRequest };
};
