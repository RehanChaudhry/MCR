import React, { useCallback } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { useAuth, usePreferredTheme } from "hooks";
import RightArrow from "assets/images/right.svg";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import { useApi } from "repo/Client";
import AuthApis from "repo/auth/AuthApis";
import { UpdateProfileRequestModel } from "models/api_requests/UpdateProfileRequestModel";
import { UpdateProfileResponseModel } from "models/api_responses/UpdateProfileResponseModel";
import SimpleToast from "react-native-simple-toast";
import { SPACE, STRINGS } from "config";

interface Props {
  updateProfileRequest?: UpdateProfileRequestModel;
  onPress?: () => void;
}

const WelcomeSkipTitleButton: React.FC<Props> = ({
  updateProfileRequest,
  onPress
}: Props) => {
  const { themedColors } = usePreferredTheme();

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

  return updateProfile.loading ? (
    <ActivityIndicator
      testID="loader"
      style={[styles.loader]}
      size={25}
      color={themedColors.interface["700"]}
    />
  ) : (
    <HeaderRightTextWithIcon
      text="Skip"
      fontWeight={"normal"}
      textStyle={{ color: themedColors.interface["700"] }}
      icon={() => {
        return (
          <RightArrow
            width={20}
            height={20}
            fill={themedColors.interface["700"]}
          />
        );
      }}
      onPress={_onPress}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  loader: { marginRight: SPACE.lg }
});

export default WelcomeSkipTitleButton;
