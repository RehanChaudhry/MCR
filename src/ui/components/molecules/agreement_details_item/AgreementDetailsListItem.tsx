import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Chat from "assets/images/chat_round.svg";
import Thumb from "assets/images/agreed.svg";
import DisAgreed from "assets/images/disagreed.svg";
import Clock from "assets/images/clock.svg";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import { usePreferredTheme } from "hooks";
import { FONT_SIZE, SPACE } from "config";
import AgreementStatus from "models/enums/AgreementStatusType";

type Props = {
  username: string;
  status: string;
  updateAt?: string;
  profileUrl?: string | undefined;
};

export const AgreementDetailsListItem = React.memo<Props>(
  ({ username, status, updateAt, profileUrl }) => {
    const theme = usePreferredTheme();

    return (
      <View>
        <View style={styles.mainContainer}>
          <View style={styles.innerContainerLeft}>
            <Image
              source={
                profileUrl !== undefined
                  ? { uri: profileUrl }
                  : require("assets/images/profile.png")
              }
              style={styles.image}
            />

            <View style={styles.userNameAndTime}>
              <AppLabel
                text={username}
                style={styles.userName}
                numberOfLines={1}
                ellipsizeMode="tail"
              />
              <AppLabel
                text={status + " " + updateAt}
                style={[
                  styles.time,
                  { color: theme.themedColors.interface["700"] }
                ]}
              />
            </View>
          </View>

          <View style={styles.innerContainerRight}>
            {status !== AgreementStatus.PENDING && (
              <AppImageBackground
                containerShape={CONTAINER_TYPES.SQUARE}
                icon={() => (
                  <Chat
                    width={18}
                    height={18}
                    fill={theme.themedColors.black}
                  />
                )}
                containerStyle={styles.chatImage}
              />
            )}

            {status === AgreementStatus.DISAGREED && (
              <AppImageBackground
                containerShape={CONTAINER_TYPES.SQUARE}
                icon={() => (
                  <DisAgreed
                    width={18}
                    height={18}
                    fill={theme.themedColors.danger}
                  />
                )}
                containerStyle={[
                  styles.containerStyle,
                  { backgroundColor: theme.themedColors.dangerShade }
                ]}
              />
            )}

            {status === AgreementStatus.AGREED && (
              <AppImageBackground
                containerShape={CONTAINER_TYPES.SQUARE}
                icon={() => (
                  <Thumb
                    width={20}
                    height={20}
                    fill={theme.themedColors.success}
                  />
                )}
                containerStyle={[
                  styles.containerStyle,
                  {
                    backgroundColor: theme.themedColors.successShade
                  }
                ]}
              />
            )}
            {status === AgreementStatus.PENDING && (
              <AppImageBackground
                containerShape={CONTAINER_TYPES.SQUARE}
                icon={() => (
                  <Clock
                    width={20}
                    height={20}
                    fill={theme.themedColors.warn}
                  />
                )}
                containerStyle={[
                  styles.containerStyle,
                  {
                    backgroundColor: theme.themedColors.warnShade
                  }
                ]}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    marginVertical: SPACE.lg
  },
  innerContainerLeft: {
    flexDirection: "row",
    flex: 1
  },
  innerContainerRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  userNameAndTime: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    marginStart: SPACE.md,
    paddingStart: SPACE.md,
    paddingEnd: SPACE.md
  },
  userName: { fontSize: FONT_SIZE.base, flex: 1 },
  time: { fontSize: FONT_SIZE.xs },
  chatImage: { marginRight: SPACE.md, width: 36, height: 36 },
  containerStyle: {
    width: 36,
    height: 36
  }
});
