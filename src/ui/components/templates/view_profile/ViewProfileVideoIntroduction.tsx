import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import WatchVideo from "assets/images/watch_video_icon.svg";

import { FONT_SIZE, SPACE } from "config";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import {
  AppButton,
  BUTTON_TYPES
} from "ui/components/molecules/app_button/AppButton";
import Colors from "config/Colors";
import Strings from "config/Strings";

type Props = {};

const ViewProfileVideoIntroduction: FC<Props> = () => {
  const theme = usePreferredTheme();
  const watchVideo = () => (
    <WatchVideo height={16} width={16} color={Colors.grey} />
  );

  return (
    <View style={styles.innerCardView}>
      <AppButton
        text={Strings.profile.viewProfile.videoIntroduction}
        buttonStyle={[
          styles.uploadButton,
          { borderColor: theme.themedColors.interface["700"] }
        ]}
        buttonType={BUTTON_TYPES.BORDER}
        textStyle={{
          color: theme.themedColors.label,
          borderColor: theme.themedColors.interface["700"],
          marginHorizontal: SPACE.xs,
          fontSize: FONT_SIZE.md
        }}
        shouldShowError={false}
        //fontWeight={"bold"}
        leftIcon={watchVideo}
        shouldAlignTextWithLeftIconWithFullWidth={true}
        fontWeight={"semi_bold"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  innerCardView: {
    marginHorizontal: SPACE.lg,
    paddingTop: SPACE.xs
  },
  uploadButton: {
    height: 44,
    marginVertical: SPACE.lg,
    width: "100%",
    flexDirection: "row",
    paddingLeft: SPACE.sm
    //alignItems: "flex-start"
  }
});

export default ViewProfileVideoIntroduction;
