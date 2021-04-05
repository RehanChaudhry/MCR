import React, { FC, useLayoutEffect, useState } from "react";
import { AgreementDetailsView } from "ui/screens/home/friends/agreement_details/AgreementDetailsView";
import {
  AgreementDetailsData,
  AgreementDetailsResponseModel
} from "models/api_responses/AgreementDetailsResponseModel";
import DataGenerator from "utils/DataGenerator";
import { AppLog } from "utils/Util";
import { useApi } from "repo/Client";
import ProfileApis from "repo/auth/ProfileApis";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { StackNavigationProp } from "@react-navigation/stack";
import { FriendsRootStackParamList } from "routes/FriendsRootStack";
import { useNavigation } from "@react-navigation/native";

type Props = {};

type FriendsNavigationProp = StackNavigationProp<
  FriendsRootStackParamList,
  "AgreementDetails"
>;

const AgreementDetailsController: FC<Props> = () => {
  const friendsNavigation = useNavigation<FriendsNavigationProp>();

  useLayoutEffect(() =>
    friendsNavigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <HeaderLeftTextWithIcon
          onPress={() => friendsNavigation.goBack()}
        />
      ),

      headerTitleAlign: "center",
      headerTitle: () => <HeaderTitle text="Agreement Details" />
    })
  );

  const agreement = DataGenerator.getAgreementDetails();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [agreementDetails, setAgreementDetails] = useState<
    Array<AgreementDetailsData>
  >(agreement.data);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const agreementDetailsApi = useApi<any, AgreementDetailsResponseModel>(
    ProfileApis.getAgreementDetails
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleGetAgreementDetailsApi = async (onComplete: () => void) => {
    onComplete();
    /*  const {
      hasError,
      dataBody,
      errorBody
    } = await agreementDetailsApi.request([]);
    if (hasError || dataBody === undefined) {
      // Alert.alert("Unable to find questions " + errorBody);
      AppLog.log("Unable to find questions " + errorBody);
      return;
    } else {
      setAgreementDetails(dataBody.data);
      onComplete?.();
    }*/
  };

  AppLog.log(agreementDetails);

  return <AgreementDetailsView agreementDetailsData={agreementDetails} />;
};

export default AgreementDetailsController;
