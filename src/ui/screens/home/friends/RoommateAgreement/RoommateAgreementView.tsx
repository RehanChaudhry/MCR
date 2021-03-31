import React, { FC } from "react";
import Screen from "ui/components/atoms/Screen";
import RoommateAgreementTerms from "ui/components/templates/roommate_agreement/RoommateAgreementTerms";
import Agreement from "ui/components/templates/roommate_agreement/Agreement";

type Props = {};

const RoommateAgreementView: FC<Props> = () => {
  return (
    <Screen shouldAddBottomInset={false}>
      <RoommateAgreementTerms />
      <Agreement />
    </Screen>
  );
};

export default RoommateAgreementView;
