import React, { FC } from "react";
import { usePreventDoubleTap } from "hooks";
import { useNavigation } from "@react-navigation/native";
import { useApi } from "repo/Client";
import AuthApis from "repo/auth/AuthApis";
import { AppLog } from "utils/Util";
import { LoginScreenAuthStackScreenProps } from "ui/screens/auth/login/LoginController";
import { ContactUs } from "ui/screens/home/contact_us/ContactUsView";
import { ContactUsApiRequestModel } from "models/api_requests/ContactUsApiRequestModel";

type Props = {};

const ContactUsController: FC<Props> = () => {
  const navigation = useNavigation<
    LoginScreenAuthStackScreenProps["navigation"]
  >();

  const contactUsApi = useApi<ContactUsApiRequestModel, any>(
    AuthApis.contactUs
  );

  const openLoginScreen = usePreventDoubleTap(() => {
    navigation.goBack();
  });

  const handleContactUs = usePreventDoubleTap(
    async (apiRequestModel: ContactUsApiRequestModel) => {
      AppLog.log(() => "handleContactUs: ");

      const {
        hasError,
        errorBody,
        dataBody
      } = await contactUsApi.request([apiRequestModel]);

      if (hasError) {
        AppLog.logForcefully(() => "Unable to get response: " + errorBody);
        return;
      } else {
        AppLog.logForcefully(() => dataBody.message);
      }
    }
  );

  return (
    <ContactUs
      shouldShowProgressBar={contactUsApi.loading}
      openLoginScreen={openLoginScreen}
      onContactUsSubmit={(_requestMdel) => handleContactUs(_requestMdel)}
    />
  );
};

export default ContactUsController;
