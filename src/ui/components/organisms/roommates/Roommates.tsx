import AgreementIcon from "assets/images/agreement_icon.svg";
import ChatRound from "assets/images/chat_round.svg";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import { usePreferredTheme } from "hooks";
import ProfileMatch from "models/ProfileMatch";
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
  roommates: ProfileMatch[];
  onChatClicked?: (profileMatch: ProfileMatch) => void;
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

  const renderItem = ({ item }: { item: ProfileMatch }) => {
    return (
      <AnnouncementHeader
        leftImageUrl={item.profilePicture}
        title={item.userName ?? STRINGS.common.not_found}
        subTitle={`${item.classLevel}, ${item.major}`}
        shouldShowRightImage={true}
        onPress={() => {
          onChatClicked?.(item);
        }}
        rightIcon={() => (
          <ChatRound
            testID="right-icon"
            width={23}
            height={23}
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
          height={22}
          width={22}
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
      <FlatList<ProfileMatch>
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
    borderRadius: 10,
    marginHorizontal: SPACE.md,
    marginTop: SPACE.md,
    paddingHorizontal: SPACE.md,
    paddingTop: SPACE.md,
    ...shadowStyleProps
  },
  title: { includeFontPadding: false },
  roommateAgreement: {
    fontSize: FONT_SIZE.sm
  },
  roommateAgreementView: {
    paddingVertical: SPACE.md
  }
});

export default Roommates;
