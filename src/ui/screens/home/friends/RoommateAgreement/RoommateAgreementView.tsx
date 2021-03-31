import React, { FC } from "react";
import Screen from "ui/components/atoms/Screen";
import RoommateAgreementTerms from "ui/components/templates/roommate_agreement/RoommateAgreementTerms";

type Props = {};

const RoommateAgreementView: FC<Props> = () => {
  return (
    <Screen shouldAddBottomInset={false}>
      <RoommateAgreementTerms />
    </Screen>
  );
};

export default RoommateAgreementView;
