import React from "react";
import {
  FlatList,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import { usePreferredTheme } from "hooks";
import ProfileMatch from "models/ProfileMatch";
import { shadowStyleProps } from "utils/Util";
import { AnnouncementHeader } from "ui/components/molecules/announcement_header/AnnouncementHeader";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import AgreementIcon from "assets/images/agreement_icon.svg";
import { LinkButton } from "ui/components/molecules/link_button/LinkButton";

interface Props {
  style?: StyleProp<ViewStyle>;
  roommates: ProfileMatch[];
  onChatClicked?: (profileMatch: ProfileMatch) => void;
  onRoommateAgreementClicked?: () => void;
}

const Roommates: React.FC<Props> = ({
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
    padding: SPACE.md,
    ...shadowStyleProps
  },
  title: { includeFontPadding: false },
  roommateAgreement: {
    fontSize: FONT_SIZE.sm
  }
});

export default Roommates;
