import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { useApi } from "repo/Client";
import AuthApis from "repo/auth/AuthApis";
import { UpdateProfileRequestModel } from "models/api_requests/UpdateProfileRequestModel";
import { UpdateProfileResponseModel } from "models/api_responses/UpdateProfileResponseModel";
import SimpleToast from "react-native-simple-toast";
import { STRINGS } from "config";
import {
  AppButton,
  AppButtonProps
} from "ui/components/molecules/app_button/AppButton";
import { useAuth } from "hooks";

interface Props extends AppButtonProps {
  updateProfileRequest?: UpdateProfileRequestModel;
  onPress?: () => void;
}

const WelcomeContinueButton: React.FC<Props> = ({
  updateProfileRequest,
  onPress,
  ...rest
}: Props) => {
  const { saveProfile } = useAuth();

  const updateProfile = useApi<
    UpdateProfileRequestModel,
    UpdateProfileResponseModel
  >(AuthApis.updateProfile);

  const requestUpdateProfile = useCallback(async () => {
    if (!updateProfileRequest) {
      onPress?.();
      return;
    }
    const { hasError, errorBody, dataBody } = await updateProfile.request([
      updateProfileRequest
    ]);

    if (hasError || dataBody === undefined) {
      SimpleToast.show(
        errorBody ?? STRINGS.common.some_thing_bad_happened
      );
      return;
    } else {
      if (dataBody.data) {
        await saveProfile(dataBody.data);
      }
      onPress?.();
    }
  }, [updateProfile, updateProfileRequest, onPress, saveProfile]);

  const _onPress = useCallback(() => {
    requestUpdateProfile();
  }, [requestUpdateProfile]);

  return (
    <AppButton
      {...rest}
      shouldShowProgressBar={updateProfile.loading}
      shouldShowError={updateProfile.error !== null}
      onPress={_onPress}
    />
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = StyleSheet.create({
  container: {}
});

export default WelcomeContinueButton;
