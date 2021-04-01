import React from "react";
import { StyleSheet, View } from "react-native";
import { CircleImageWithText } from "ui/components/molecules/circle_image_with_text/CircleImageWithText";
import { NotificationData } from "models/api_responses/NotificationsResponseModel";
import { AppLog } from "utils/Util";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE, SPACE } from "config/Dimens";
import Colors from "config/Colors";
import Selector from "assets/images/selector.svg";
import { usePreferredTheme } from "hooks";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { AppDropdown } from "ui/components/organisms/app_dropdown/AppDropdown";
import useLazyLoadInterface from "hooks/useLazyLoadInterface";

type Props = {
  notifications: NotificationData[];
};

export const NotificationView = React.memo<Props>(({ notifications }) => {
  let previousItemHours = "";
  const theme = usePreferredTheme();

  const getHours = (prevDate: string) => {
    const currDate1 = new Date();
    let d1: any = new Date(currDate1); //firstDate
    let d2: any = new Date(prevDate); //SecondDate
    let diff = Math.abs(d1 - d2);
    const hours = diff / (1000 * 60 * 60); //in milliseconds

    return parseInt(hours.toFixed(0));
  };

  const getHeader = (label: string) => {
    return <AppLabel text={label} style={styles.header} weight={"bold"} />;
  };

  const getSortedItems = (hours: number) => {
    let label = "NEW NOTIFICATIONS";
    let tag = "3";
    if (hours > 48) {
      tag = "3";
    } else if (hours >= 0 && hours <= 24) {
      tag = "1";
    } else if (hours > 24 || hours < 48) {
      tag = "2";
    }

    if (previousItemHours !== tag && tag === "1") {
      previousItemHours = tag;
      return getHeader(label);
    } else if (previousItemHours !== tag && tag === "3") {
      previousItemHours = tag;
      label = "OLDER NOTIFICATIONS";
      return getHeader(label);
    } else if (previousItemHours !== tag && tag === "2") {
      previousItemHours = tag;
      label = "YESTERDAY";
      return getHeader(label);
    }
  };

  const listItem = ({
    item,
    index
  }: {
    item: NotificationData;
    index: number;
  }) => {
    return (
      <View>
        {getSortedItems(getHours(notifications[index].date))}
        <CircleImageWithText
          key={index}
          username={"Fox Mccloud "}
          message={item.message}
          onPress={() => AppLog.log("Button pressed")}
        />
      </View>
    );
  };

  return (
    <View>
      <View style={styles.dropDownBar}>
        <AppDropdown
          items={[
            { id: "0", title: "View Request" },
            { id: "1", title: "View Comment" },
            { id: "2", title: "View Details" }
          ]}
          title={"Filter by Notification"}
          dropDownIcon={() => (
            <Selector
              width={16}
              height={16}
              fill={theme.themedColors.label}
            />
          )}
          style={[
            styles.dropDown,
            { backgroundColor: theme.themedColors.interface["100"] }
          ]}
          selectedItemCallback={(item) =>
            AppLog.log("Selected Item" + item)
          }
          shouldShowCustomIcon={true}
        />
      </View>
      {useLazyLoadInterface(
        <>
          <FlatListWithPb
            shouldShowProgressBar={false}
            style={styles.mainContanier}
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={listItem}
          />
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    fontSize: FONT_SIZE._2xsm,
    marginBottom: SPACE.lg,
    marginLeft: SPACE.lg
  },
  mainContanier: {
    marginTop: SPACE.md
  },
  dropDown: {
    marginLeft: SPACE.md,
    marginRight: SPACE.md,
    borderRadius: 50,
    borderColor: undefined,
    borderWidth: undefined
  },
  dropDownBar: {
    backgroundColor: Colors.white,
    height: 50
  }
});
