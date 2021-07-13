import { useCallback, useState } from "react";
import { useApi } from "repo/Client";
import { Alert } from "react-native";
import SimpleToast from "react-native-simple-toast";
import RoomAgreementApis from "repo/auth/RoomAgreementApis";

export default (
  messageOnFailed: string,
  onFinish: () => void,
  onSuccess: () => void
) => {
  const [shouldShowPb, setShouldShowPb] = useState(false);
  const sendRequestApi = useApi<any, any>(RoomAgreementApis.leaveGroup);

  const sendRequest = useCallback(async () => {
    setShouldShowPb(true);

    const { hasError, errorBody, dataBody } = await sendRequestApi.request(
      []
    );

    if (hasError || dataBody === undefined) {
      Alert.alert(messageOnFailed, errorBody);
      setShouldShowPb(false);
      return;
    } else {
      SimpleToast.show(dataBody.message, SimpleToast.LONG);
      try {
        onSuccess();
      } finally {
        onFinish();
        setShouldShowPb(false);
      }
    }
  }, [messageOnFailed, onFinish, onSuccess, sendRequestApi]);
  return { shouldShowPb, sendRequest };
};
