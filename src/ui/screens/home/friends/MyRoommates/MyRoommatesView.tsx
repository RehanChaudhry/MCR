import HomeOfficeIcon from "assets/images/icon_office_building.svg";
import { usePreferredTheme } from "hooks";
import { MyRoomate } from "models/api_responses/MyRoommatesResponseModel";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import ConnectionItem, {
  CONNECTION_ACTION_STATE
} from "ui/components/organisms/friends/connection/ConnectionItem";
import ConnectionListHeader from "ui/components/organisms/friends/connection/ConnectionListHeader";

type Props = {
  data: MyRoomate[];
  onPressChat: (item: MyRoomate) => void;
  onPressAction: (item: MyRoomate) => void;
  onPressCross: (item: MyRoomate) => void;
  onPressReceivedRoommateRequests: () => void;
};

const listItem = (
  item: MyRoomate,
  onPressChat: (item: MyRoomate) => void,
  onPressAction: (item: MyRoomate) => void,
  onPressCross: (item: MyRoomate) => void
) => {
  return (
    <ConnectionItem
      key={item.id}
      title={item.title}
      subtitle={item.subtitle}
      profileImage={item.profileImage}
      actionButtonTitle={"Remove Roommate"}
      actionButtonState={CONNECTION_ACTION_STATE.DANGER}
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

const MyRoommatesView: FC<Props> = ({
  data,
  onPressAction,
  onPressChat,
  onPressCross,
  onPressReceivedRoommateRequests
}) => {
  const theme = usePreferredTheme();
  return (
    <Screen shouldAddBottomInset={false}>
      <FlatListWithPb
        style={styles.list}
        shouldShowProgressBar={false}
        ListHeaderComponent={() => (
          <ConnectionListHeader
            title="Received 1 new roommate request"
            detail={
              "You have currently 2 roommates and received 1 new roommate request."
            }
            icon={() => (
              <HomeOfficeIcon
                fill={theme.themedColors.labelSecondary}
                width={18}
                height={18}
              />
            )}
            onPressAction={onPressReceivedRoommateRequests}
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

export default MyRoommatesView;
