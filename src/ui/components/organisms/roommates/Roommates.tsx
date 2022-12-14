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
import { AppLog, shadowStyleProps } from "utils/Util";
import useAuth from "hooks/useAuth";
import EIntBoolean from "models/enums/EIntBoolean";

interface Props {
  style?: StyleProp<ViewStyle>;
  roommates: RelationModel[];
  onChatClicked?: (profileMatch: RelationModel) => void;
  onRoommateAgreementClicked?: () => void;
  userName?: string;
  showFooter?: boolean;
  moveToProfileScreen?: (userId: number, name: string) => void;
}

const Roommates: React.FC<Props> = ({
  onChatClicked,
  onRoommateAgreementClicked,
  roommates,
  style,
  userName,
  showFooter = true,
  moveToProfileScreen
}: Props) => {
  const { themedColors } = usePreferredTheme();

  const listHeaderComponent = () => (
    <AppLabel
      style={styles.title}
      text={
        userName === undefined
          ? STRINGS.matchInfo.my_roommates
          : userName + "'s Roommates"
      }
      weight={"semi-bold"}
    />
  );

  const auth = useAuth();

  const renderItem = ({ item }: { item: RelationModel }) => {
    const _item = new RelationModel(item);
    const onImageClicked = () => {
      moveToProfileScreen?.(
        item!.userId,
        `${item.user?.firstName} ${item.user?.lastName}`
      );
    };
    return (
      <AnnouncementHeader
        leftImageUrl={item?.user?.profilePicture?.fileURL}
        title={
          `${item?.user?.firstName} ${item?.user?.lastName}` ??
          STRINGS.common.not_found
        }
        subTitle={`${_item?.user?.getSubtitle()}`}
        shouldShowRightImage={auth.uni?.chatFeature === EIntBoolean.TRUE}
        onUserNameClicked={onImageClicked}
        onProfileImageClicked={onImageClicked}
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
          fill={themedColors.primary}
        />
      )}
      viewStyle={styles.roommateAgreementView}
    />
  );

  AppLog.logForcefully(() => "showFooter: " + showFooter);

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
        ListFooterComponent={showFooter ? listFooterComponent : <View />}
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
