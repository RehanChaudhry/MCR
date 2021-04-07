import AgreementIcon from "assets/images/agreement_icon.svg";
import { FONT_SIZE, SPACE } from "config";
import Strings from "config/Strings";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { myRoommateData } from "models/MyRoommateDataType";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { CardView } from "ui/components/atoms/CardView";
import { LinkButton } from "ui/components/molecules/link_button/LinkButton";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import MyRoommateItem from "ui/components/templates/my_roommates/MyRoommateItem";

type Props = {};

const MyRoommates: FC<Props> = () => {
  const theme = usePreferredTheme();

  return (
    <CardView style={styles.cardView}>
      <View style={styles.innerCardView}>
        <AppLabel
          text={Strings.profile.viewProfile.roomMates.heading}
          weight={"semi-bold"}
          style={[styles.mainHeading, { color: theme.themedColors.label }]}
        />

        <FlatListWithPb
          shouldShowProgressBar={false}
          data={myRoommateData}
          renderItem={({ item }) => (
            <MyRoommateItem
              name={item.name}
              field={item.field}
              imageUrl={item.imageUrl}
            />
          )}
          style={styles.flatList}
          scrollEnabled={false}
        />
        <LinkButton
          text={Strings.profile.viewProfile.agreementButtonTitle}
          textStyle={[{ color: theme.themedColors.primary }]}
          fontWeight={"semi-bold"}
          leftIcon={() => (
            <AgreementIcon
              height={22}
              width={22}
              color={theme.themedColors.primary}
            />
          )}
        />
      </View>
    </CardView>
  );
};
const styles = StyleSheet.create({
  cardView: {
    marginHorizontal: SPACE.lg,
    marginTop: SPACE.lg,
    marginBottom: SPACE.lg
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
    fontSize: FONT_SIZE.xs
  },
  flatList: {
    marginTop: SPACE.lg
  },
  uploadButton: {
    height: 44,
    width: "100%",
    flexDirection: "row"
  },
  roommateAgreement: {
    fontSize: FONT_SIZE.xs
  }
});

export default MyRoommates;
