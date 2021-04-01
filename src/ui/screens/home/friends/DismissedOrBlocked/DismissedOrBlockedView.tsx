import { DismissedOrBlocked } from "models/api_responses/DismissedOrBlockedResponseModel";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import ConnectionItem, {
  CONNECTION_ACTION_STATE
} from "ui/components/organisms/friends/connection/ConnectionItem";
import DismissedOrBlockedListHeader from "ui/components/organisms/friends/dismissed_or_blocked/DismissedOrBlockedListHeader";

type Props = {
  data: DismissedOrBlocked[];
  headerTitle: string;
  headerSubtitle: string;
  learnMoreTitle: string;
  learnMoreAction: () => void;
  onPressChat: (item: DismissedOrBlocked) => void;
  onPressAction: (item: DismissedOrBlocked) => void;
  onPressCross: (item: DismissedOrBlocked) => void;
};

const listItem = (
  item: DismissedOrBlocked,
  onPressChat: (item: DismissedOrBlocked) => void,
  onPressAction: (item: DismissedOrBlocked) => void,
  onPressCross: (item: DismissedOrBlocked) => void
) => {
  return (
    <ConnectionItem
      key={item.id}
      title={item.title}
      subtitle={item.subtitle}
      profileImage={item.profileImage}
      actionButtonTitle={"Restore"}
      actionButtonState={CONNECTION_ACTION_STATE.NORMAL}
      shouldShowTopActionable={false}
      shouldShowLeftInfoIcon={false}
      onPressAction={() => {
        onPressAction(item);
      }}
      onPressChat={() => {
        onPressChat(item);
      }}
      onPressCross={() => {
        onPressCross(item);
      }}
    />
  );
};

const DismissedOrBlockedView: FC<Props> = ({
  data,
  headerTitle,
  headerSubtitle,
  learnMoreTitle,
  learnMoreAction,
  onPressAction,
  onPressChat,
  onPressCross
}) => {
  return (
    <Screen shouldAddBottomInset={false}>
      <FlatListWithPb
        style={styles.list}
        shouldShowProgressBar={false}
        ListHeaderComponent={() => (
          <DismissedOrBlockedListHeader
            title={headerTitle}
            subtitle={headerSubtitle}
            learnMoreTitle={learnMoreTitle}
            learnMoreAction={learnMoreAction}
          />
        )}
        renderItem={({ item }) => {
          return listItem(item, onPressChat, onPressAction, onPressCross);
        }}
        data={data}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
    height: "100%"
  }
});

export default DismissedOrBlockedView;
