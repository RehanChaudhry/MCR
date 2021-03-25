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
import { moderateScale } from "config/Dimens";

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
          {/*Info Header Here*/}
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
        </View>
        {/*My Roommates Card Here*/}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: {},
  card: {
    borderRadius: 5,
    marginHorizontal: SPACE.md,
    marginTop: SPACE.md,
    ...shadowStyleProps
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
  cardPadding: { padding: SPACE.md }
});
