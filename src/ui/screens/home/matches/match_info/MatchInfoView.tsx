import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import MatchInfo from "models/MatchInfo";
import { usePreferredTheme } from "hooks";
import { shadowStyleProps } from "utils/Util";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { AppProgressBar } from "ui/components/molecules/app_progress_bar/AppProgressBar";
import { Divider } from "react-native-elements";
import { LinkButton } from "ui/components/molecules/link_button/LinkButton";
import Profile from "assets/images/nav_profile.svg";
import Questionnaire from "assets/images/request_state_icon.svg";
import MatchingStatus from "assets/images/view_grid_add.svg";
import MatchingDeadline from "assets/images/calendar.svg";
import MatchingCriteria from "assets/images/puzzle.svg";
import { moderateScale } from "config/Dimens";
import SocialDetailForm from "ui/components/templates/about_me/SocialDetailForm";
import moment from "moment";
import UserHeader from "ui/components/organisms/user_header/UserHeader";
import Roommates from "ui/components/organisms/roommates/Roommates";

type Props = {
  matchInfo: MatchInfo;
};

export const MatchInfoView: React.FC<Props> = ({ matchInfo }: Props) => {
  const { themedColors } = usePreferredTheme();

  return (
    <Screen style={styles.screen}>
      <ScrollView style={styles.container}>
        <View
          style={[
            styles.card,
            { backgroundColor: themedColors.background }
          ]}>
          <UserHeader
            style={styles.userHeader}
            name={matchInfo.name ?? STRINGS.common.not_found}
            image={matchInfo.profilePicture ?? ""}
            subtitle={`${
              matchInfo.classLevel ?? STRINGS.common.not_found
            }, ${matchInfo.major ?? STRINGS.common.not_found}`}
          />
          <AppLabel
            style={styles.description}
            text={matchInfo.shortIntro ?? STRINGS.common.not_found}
            numberOfLines={0}
          />
          <AppProgressBar
            style={styles.progress}
            progressPercentage={matchInfo.profileCompletePercentage ?? 0}
            filledColor={themedColors.primary}
            bottomTextStyle={{ color: themedColors.interface[600] }}
          />
          <Divider
            style={[
              styles.infoCardDivider,
              { backgroundColor: themedColors.separator }
            ]}
          />
          <View style={styles.updateContainer}>
            <LinkButton
              viewStyle={styles.updateButton}
              textStyle={styles.updateText}
              leftIcon={() => (
                <Profile
                  width={moderateScale(20)}
                  height={moderateScale(20)}
                  fill={themedColors.primary}
                />
              )}
              fontWeight={"semi-bold"}
              text={STRINGS.matchInfo.action_update_profile}
            />
            <LinkButton
              viewStyle={styles.updateButton}
              textStyle={styles.updateText}
              leftIcon={() => (
                <Questionnaire
                  width={moderateScale(20)}
                  height={moderateScale(20)}
                  fill={themedColors.primary}
                />
              )}
              fontWeight={"semi-bold"}
              text={STRINGS.matchInfo.action_update_questionnaire}
            />
          </View>
        </View>
        <View
          style={[
            styles.card,
            styles.cardPadding,
            { backgroundColor: themedColors.background }
          ]}>
          <AppLabel
            text={STRINGS.matchInfo.matching_information}
            weight={"semi-bold"}
          />
          <SocialDetailForm
            headingStyle={[
              styles.matchingInfoLabel,
              { color: themedColors.interface[600] }
            ]}
            titleStyle={[
              styles.matchingInfoData,
              { color: themedColors.label }
            ]}
            icon={() => (
              <MatchingStatus
                width={moderateScale(20)}
                height={moderateScale(20)}
                fill={themedColors.primary}
              />
            )}
            heading={STRINGS.matchInfo.matching_status}
            title={
              matchInfo.isRoommateMatchingOpen
                ? STRINGS.matchInfo.label_open
                : STRINGS.matchInfo.label_close
            }
          />
          <Divider
            style={[
              styles.infoCardDivider,
              { backgroundColor: themedColors.separator }
            ]}
          />
          <SocialDetailForm
            headingStyle={[
              styles.matchingInfoLabel,
              { color: themedColors.interface[600] }
            ]}
            titleStyle={[
              styles.matchingInfoData,
              { color: themedColors.label }
            ]}
            icon={() => (
              <MatchingDeadline
                width={moderateScale(20)}
                height={moderateScale(20)}
                fill={themedColors.primary}
              />
            )}
            heading={STRINGS.matchInfo.matching_deadline}
            title={moment(matchInfo.roommateMatchingDeadline).format(
              "MMMM DD, YYYY"
            )}
          />
          <Divider
            style={[
              styles.infoCardDivider,
              { backgroundColor: themedColors.separator }
            ]}
          />
          <SocialDetailForm
            headingStyle={[
              styles.matchingInfoLabel,
              { color: themedColors.interface[600] }
            ]}
            titleStyle={[
              styles.matchingInfoData,
              { color: themedColors.label }
            ]}
            icon={() => (
              <Questionnaire
                width={moderateScale(20)}
                height={moderateScale(20)}
                fill={themedColors.primary}
              />
            )}
            heading={STRINGS.matchInfo.max_roommate_count}
            title={`${matchInfo.maxRoommateCount} roommate${
              matchInfo.maxRoommateCount ?? 0 > 1 ? "s" : ""
            }`}
          />
          <Divider
            style={[
              styles.infoCardDivider,
              { backgroundColor: themedColors.separator }
            ]}
          />
          <SocialDetailForm
            headingStyle={[
              styles.matchingInfoLabel,
              { color: themedColors.interface[600] }
            ]}
            titleStyle={[
              styles.matchingInfoData,
              { color: themedColors.label }
            ]}
            icon={() => (
              <MatchingCriteria
                width={moderateScale(20)}
                height={moderateScale(20)}
                fill={themedColors.primary}
              />
            )}
            heading={STRINGS.matchInfo.matching_criteria}
            title={`${
              matchInfo.matchingCriteria?.gender ??
              STRINGS.common.not_found
            }, ${
              matchInfo.matchingCriteria?.majors ??
              STRINGS.common.not_found
            }`}
          />
        </View>
        {matchInfo.roommates && matchInfo.roommates.length > 0 && (
          <Roommates
            style={[styles.card, styles.lastCard]}
            roommates={matchInfo.roommates}
          />
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: { paddingBottom: SPACE.md },
  card: {
    borderRadius: 10,
    marginHorizontal: SPACE.md,
    marginTop: SPACE.md,
    ...shadowStyleProps
  },
  textStyle: {
    paddingTop: SPACE.xsm,
    fontSize: FONT_SIZE.md
  },
  description: {
    fontSize: FONT_SIZE.sm,
    marginTop: SPACE.md,
    marginHorizontal: SPACE.md
  },
  progress: {
    marginTop: SPACE.md,
    marginHorizontal: SPACE.md
  },
  infoCardDivider: {
    marginTop: SPACE.md
  },
  updateContainer: {
    flexDirection: "row"
  },
  updateText: {
    fontSize: FONT_SIZE.sm
  },
  updateButton: { padding: SPACE.md },
  cardPadding: { padding: SPACE.md },
  matchingInfoLabel: {
    fontSize: FONT_SIZE.sm,
    paddingHorizontal: SPACE.xsm
  },
  matchingInfoData: { fontSize: FONT_SIZE.sm, marginTop: SPACE.xsm },
  userHeader: {
    marginTop: SPACE.md,
    marginHorizontal: SPACE.md
  },
  lastCard: { marginBottom: SPACE.md }
});
