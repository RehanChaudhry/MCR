import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";
import { StaticContent } from "models/api_responses/StaticContentResponseModel";
import { AgreementData } from "models/api_responses/AgreementAnswerResponseModel";

export type ProfileRootStackParamList = {
  Profile: undefined;
  RoommateAgreement: { isFrom: EScreen };
  AgreementDetails: {
    agreementData?: AgreementData;
  };
  StaticContent: { isFrom: EScreen; staticContent: StaticContent };
};

export const ProfileRootStack = createStackNavigator<ProfileRootStackParamList>();
