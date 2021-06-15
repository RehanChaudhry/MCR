import AgreementIcon from "assets/images/agreement_icon.svg";
import { FONT_SIZE, SPACE } from "config";
import Strings from "config/Strings";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import RelationModel from "models/RelationModel";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { CardView } from "ui/components/atoms/CardView";
import { LinkButton } from "ui/components/molecules/link_button/LinkButton";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import RelationListsItem from "ui/components/organisms/relation_item/RelationItem";
import { AppLog } from "utils/Util";

type Props = {
  openAgreementScreen?: () => void;
  moveToChatScreen?: (userId: number) => void;
  data: RelationModel[] | undefined;
};

const MyRoommatesView: FC<Props> = ({
  openAgreementScreen,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  moveToChatScreen,
  data
}) => {
  const theme = usePreferredTheme();

  return (
    <CardView style={styles.cardView}>
      <View style={styles.innerCardView}>
        <AppLabel
          text={Strings.profile.viewProfile.roomMates.heading}
          weight={"semi-bold"}
          style={[styles.mainHeading, { color: theme.themedColors.label }]}
        />

        <FlatListWithPb<RelationModel>
          shouldShowProgressBar={false}
          data={data}
          renderItem={(_item) => (
            <RelationListsItem
              relationModel={_item.item}
              onChatButtonClicked={() =>
                AppLog.logForcefully(() => "chat")
              }
              onImageClicked={() => AppLog.logForcefully(() => "chat")}
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
          onPress={openAgreementScreen}
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
    fontSize: FONT_SIZE.base
  },
  headingStyle: {
    fontSize: FONT_SIZE.sm
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

export default MyRoommatesView;
