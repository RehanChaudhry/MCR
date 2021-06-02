import AgreementIcon from "assets/images/agreement_icon.svg";
import ChatRound from "assets/images/chat_round.svg";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import { usePreferredTheme } from "hooks";
import RelationModel from "models/RelationModel";
import React from "react";
import {
  FlatList,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { AnnouncementHeader } from "ui/components/molecules/announcement_header/AnnouncementHeader";
import { LinkButton } from "ui/components/molecules/link_button/LinkButton";
import { shadowStyleProps } from "utils/Util";

interface Props {
  style?: StyleProp<ViewStyle>;
  roommates: RelationModel[];
  onChatClicked?: (profileMatch: RelationModel) => void;
  onRoommateAgreementClicked?: () => void;
}

const Roommates: React.FC<Props> = ({
  onChatClicked,
  onRoommateAgreementClicked,
  roommates,
  style
}: Props) => {
  const { themedColors } = usePreferredTheme();

  const listHeaderComponent = () => (
    <AppLabel
      style={styles.title}
      text={STRINGS.matchInfo.my_roommates}
      weight={"semi-bold"}
    />
  );

  const renderItem = ({ item }: { item: RelationModel }) => {
    return (
      <AnnouncementHeader
        leftImageUrl={item.user?.profilePicture?.fileURL}
        title={
          `${item.user?.firstName} ${item.user?.lastName}` ??
          STRINGS.common.not_found
        }
        subTitle={`${item.user?.hometown}, ${item.user?.major}`}
        shouldShowRightImage={true}
        onRightBtnClicked={() => {
          onChatClicked?.(item);
        }}
        rightIcon={() => (
          <ChatRound
            testID="right-icon"
            width={24}
            height={24}
            fill={themedColors.interface["700"]}
          />
        )}
      />
    );
  };

  const listFooterComponent = () => (
    <LinkButton
      onPress={onRoommateAgreementClicked}
      text={STRINGS.matchInfo.roommate_agreement}
      textStyle={[
        styles.roommateAgreement,
        { color: themedColors.primary }
      ]}
      fontWeight={"semi-bold"}
      leftIcon={() => (
        <AgreementIcon
          height={20}
          width={20}
          color={themedColors.primary}
        />
      )}
      viewStyle={styles.roommateAgreementView}
    />
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themedColors.background },
        style
      ]}>
      <FlatList<RelationModel>
        ListHeaderComponent={listHeaderComponent}
        data={roommates}
        renderItem={renderItem}
        ListFooterComponent={listFooterComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginHorizontal: SPACE.md,
    marginTop: SPACE.md,
    paddingHorizontal: SPACE.lg,
    paddingTop: SPACE.lg,
    ...shadowStyleProps
  },
  title: { includeFontPadding: false, fontSize: FONT_SIZE.base },
  roommateAgreement: {
    fontSize: FONT_SIZE.sm
  },
  roommateAgreementView: {
    paddingVertical: SPACE.lg
  }
});

export default Roommates;
