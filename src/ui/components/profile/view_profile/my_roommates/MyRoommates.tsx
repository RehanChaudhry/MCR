import React, { FC } from "react";
import { CardView } from "ui/components/atoms/CardView";
import { StyleSheet, View } from "react-native";
import { FONT_SIZE, SPACE } from "config";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { myRoommateData } from "models/MyRoommateDataType";
import MyRoommateItem from "ui/components/profile/view_profile/my_roommates/MyRoommateItem";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
type Props = {};

const MyRoommates: FC<Props> = () => {
  const theme = usePreferredTheme();
  return (
    <CardView style={styles.cardView}>
      <View style={styles.innerCardView}>
        <AppLabel
          text={"My Roommates"}
          weight={"semi-bold"}
          style={[styles.mainHeading, { color: theme.themedColors.label }]}
        />
      </View>
      <FlatListWithPb
        shouldShowProgressBar={false}
        data={myRoommateData}
        renderItem={({ item }) => (
          <MyRoommateItem name={item.name} field={item.field} />
        )}
        style={styles.flatList}
        scrollEnabled={false}
      />
    </CardView>
  );
};
const styles = StyleSheet.create({
  cardView: {
    marginHorizontal: SPACE.lg,
    marginTop: SPACE.lg
    //backgroundColor: Colors.red
  },
  innerCardView: {
    marginHorizontal: SPACE.lg,
    paddingTop: SPACE.lg,
    paddingBottom: SPACE.xsm
    //backgroundColor: Colors.grey
  },
  mainHeading: {
    fontSize: FONT_SIZE.lg
    //backgroundColor: Colors.black
  },
  headingStyle: {
    fontSize: FONT_SIZE.md
  },
  flatList: {
    paddingHorizontal: SPACE.lg
  }
});

export default MyRoommates;
