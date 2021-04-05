import { FONT_SIZE, FONTS, SPACE, STRINGS } from "config";
import { usePreferredTheme } from "hooks";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { shadowStyleProps } from "utils/Util";
import ProfileMatch from "models/ProfileMatch";
import { moderateScale } from "config/Dimens";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import MatchScore from "ui/components/molecules/match_score/MatchScore";
import ProfileMatchType from "models/enums/ProfileMatchType";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import ChatRound from "assets/images/chat_round.svg";
import Cross from "assets/images/ic_cross.svg";

interface Props {
  profileMatch: ProfileMatch;
  onFriendRequestClicked: (userId: number) => void;
  onCrossClicked: (userId: number) => void;
  onChatButtonClicked: (profileMatch: ProfileMatch) => void;
  onImageClicked: (profileMatch: ProfileMatch) => void;
}

const ProfileMatchItem = ({
  profileMatch,
  onFriendRequestClicked,
  onCrossClicked,
  onChatButtonClicked,
  onImageClicked
}: Props) => {
  const { themedColors } = usePreferredTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themedColors.background }
      ]}>
      <View style={styles.infoContainer}>
        <Pressable
          onPress={() => {
            onImageClicked(profileMatch);
          }}>
          <Image
            style={styles.profileImage}
            source={{ uri: profileMatch.profilePicture }}
          />
        </Pressable>
        <View style={styles.infoTextContainer}>
          <AppLabel
            style={styles.userName}
            text={profileMatch.userName ?? STRINGS.common.not_found}
          />
          <AppLabel
            style={[
              styles.subtitle,
              { color: themedColors.interface[600] }
            ]}
            text={`${profileMatch.classLevel}, ${profileMatch.major}`}
          />
          <MatchScore
            style={styles.matchScore}
            matchScore={
              profileMatch.matchScore
                ? `${profileMatch.matchScore}%`
                : STRINGS.common.not_found
            }
          />
        </View>
      </View>
      <Pressable
        style={styles.icCross}
        onPress={() => {
          onCrossClicked(profileMatch.userId);
        }}>
        <Cross
          fill={themedColors.interface[400]}
          width={moderateScale(20)}
          height={moderateScale(20)}
        />
      </Pressable>
      <View style={styles.buttonContainer}>
        <AppImageBackground
          onPress={() => {
            onChatButtonClicked(profileMatch);
          }}
          containerStyle={styles.btnChat}
          containerShape={CONTAINER_TYPES.SQUARE}
          icon={() => (
            <ChatRound
              fill={themedColors.interface[800]}
              width={moderateScale(27)}
              height={moderateScale(27)}
            />
          )}
        />
        {profileMatch.getType() === ProfileMatchType.NOT_FRIEND && (
          <AppButton
            isDisable={profileMatch.isFriendRequested}
            onPress={() => {
              if (!profileMatch.isFriendRequested) {
                onFriendRequestClicked(profileMatch.userId);
              }
            }}
            fontWeight={"semi-bold"}
            textStyle={[
              styles.btnActionText,
              profileMatch.isFriendRequested
                ? { color: themedColors.interface[500] }
                : { color: themedColors.primary }
            ]}
            buttonStyle={[
              styles.btnAction,
              profileMatch.isFriendRequested
                ? { backgroundColor: themedColors.interface[200] }
                : { backgroundColor: themedColors.primaryShade }
            ]}
            text={
              profileMatch.isFriendRequested
                ? STRINGS.matches.label_pending_request
                : STRINGS.matches.action_add_friend
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderRadius: 5,
    padding: SPACE.md,
    ...shadowStyleProps
  },
  infoContainer: {
    flexDirection: "row"
  },
  profileImage: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(32)
  },
  infoTextContainer: {
    marginStart: SPACE.md,
    alignItems: "flex-start"
  },
  userName: { fontSize: FONT_SIZE.xsm, includeFontPadding: false },
  subtitle: { fontSize: FONT_SIZE._3xm },
  matchScore: {
    marginTop: SPACE.md
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    marginTop: SPACE.md
  },
  btnActionText: {
    fontFamily: FONTS.semiBold,
    fontSize: FONT_SIZE._2xsm
  },
  btnAction: {
    alignSelf: "stretch",
    flex: 1
  },
  btnChat: { marginLeft: SPACE.md },
  icCross: {
    position: "absolute",
    top: SPACE.xsm,
    end: SPACE.xsm,
    padding: SPACE.xsm
  }
});

export default ProfileMatchItem;
