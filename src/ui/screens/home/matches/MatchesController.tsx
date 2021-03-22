import React, { FC } from "react";
import { MatchesView } from "ui/screens/home/matches/MatchesView";
import ProgressErrorView from "ui/components/templates/progress_error_view/ProgressErrorView";
import { View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";

type Props = {};

const MatchesController: FC<Props> = () => {
  return (
    <ProgressErrorView
      isLoading={false}
      error={undefined}
      errorView={(message) => {
        return (
          <View>
            <AppLabel text={message} />
          </View>
        );
      }}
      data={[]}>
      <MatchesView />
    </ProgressErrorView>
  );
};

export default MatchesController;
