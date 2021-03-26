import React, { FC } from "react";
import { CardView } from "ui/components/atoms/CardView";
import { StyleSheet, View } from "react-native";
import { FONT_SIZE, SPACE } from "config";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { myRoommateData } from "models/MyRoommateDataType";
import MyRoommateItem from "ui/components/templates/my_roommates/MyRoommateItem";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import {
  AppButton,
  BUTTON_TYPES
} from "ui/components/molecules/app_button/AppButton";
import AgreementIcon from "assets/images/agreement_icon.svg";

type Props = {};

const MyRoommates: FC<Props> = () => {
  const theme = usePreferredTheme();
  const agreementIcon = () => (
    <AgreementIcon
      height={22}
      width={22}
      color={theme.themedColors.primary}
    />
  );

  return (
    <CardView style={styles.cardView}>
      <View style={styles.innerCardView}>
        <AppLabel
          text={"My Roommates"}
          weight={"semi-bold"}
          style={[styles.mainHeading, { color: theme.themedColors.label }]}
        />

        <FlatListWithPb
          shouldShowProgressBar={false}
          data={myRoommateData}
          renderItem={({ item }) => (
            <MyRoommateItem name={item.name} field={item.field} />
          )}
          style={styles.flatList}
          scrollEnabled={false}
        />
        <AppButton
          text={"View Roommate Agreement"}
          buttonType={BUTTON_TYPES.NORMAL}
          textStyle={{
            color: theme.themedColors.primary,
            marginHorizontal: SPACE.xxsm,
            fontSize: FONT_SIZE.xsm
          }}
          shouldShowError={false}
          fontWeight={"semi-bold"}
          leftIcon={agreementIcon}
          shouldAlignTextWithLeftIconWithFullWidth={true}
        />
      </View>
    </CardView>
  );
};
const styles = StyleSheet.create({
  cardView: {
    marginHorizontal: SPACE.lg,
    marginTop: SPACE.lg
  },
  innerCardView: {
    marginHorizontal: SPACE.lg,
    paddingTop: SPACE.lg,
    paddingBottom: SPACE.md
  },
  mainHeading: {
    fontSize: FONT_SIZE.lg
  },
  headingStyle: {
    fontSize: FONT_SIZE.xsm
  },
  flatList: {
    marginTop: SPACE.lg
  },
  uploadButton: {
    height: 44,
    width: "100%",
    flexDirection: "row"
  }
});

export default MyRoommates;
