import Chat from "assets/images/chat.svg";
import Like from "assets/images/like.svg";
import { SPACE } from "config";
import { usePreferredTheme } from "hooks";
import React from "react";
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
  View,
  ViewStyle
} from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { CommentButton } from "ui/components/atoms/compact_buttons/CommentButton";
import { LikeButton } from "ui/components/atoms/compact_buttons/LikeButton";
import { AppLog } from "utils/Util";

export interface AnnouncementFooterProps extends TouchableOpacityProps {
  commentCount: number;
  likeCount: number;
  bottomLineStyle?: StyleProp<ViewStyle>;
  leftContainerLeftTextStyle?: StyleProp<TextStyle>;
  leftContainerRightTextStyle?: StyleProp<TextStyle>;

  leftContainerLeftIconStyle?: StyleProp<ImageStyle>;
  leftContainerRightIconStyle?: StyleProp<ImageStyle>;

  leftContainerLeftButtonStyle?: StyleProp<ViewStyle>;
  leftContainerRightButtonStyle?: StyleProp<ViewStyle>;
}

export const AnnouncementFooter = React.memo<AnnouncementFooterProps>(
  ({ likeCount = 3, commentCount = 5, bottomLineStyle }) => {
    const theme = usePreferredTheme();
    return (
      <View>
        <View
          style={[
            style.bottomBorder,
            { backgroundColor: theme.themedColors.interface["300"] },
            bottomLineStyle
          ]}
        />
        <View style={style.container}>
          <View style={style.leftRightContainer}>
            <View>
              <LikeButton shouldSelected={false} />
            </View>
            <View style={style.leftContainerRightSide}>
              <CommentButton
                onPress={() => AppLog.logForcefully("clicked")}
              />
            </View>
          </View>
          <View style={style.leftRightContainer}>
            <View style={style.rightContainerLeftSide}>
              <View style={style.row}>
                <Like
                  width={12}
                  height={12}
                  fill={theme.themedColors.primary}
                  style={style.icon}
                />
                <AppLabel
                  text={likeCount.toString()}
                  style={{ color: theme.themedColors.interface["700"] }}
                />
              </View>
            </View>
            <View>
              <View style={style.row}>
                <Chat
                  width={12}
                  height={12}
                  fill={theme.themedColors.primary}
                  style={style.icon}
                />
                <AppLabel
                  text={commentCount.toString()}
                  style={{ color: theme.themedColors.interface["700"] }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
);

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  leftRightContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center"
  },
  leftContainerRightSide: {
    marginLeft: SPACE.sm
  },
  rightContainerRightSide: {
    marginLeft: SPACE.sm
  },
  bottomBorder: {
    width: "100%",
    height: 0.5,
    marginVertical: SPACE.md
  },
  rightContainerLeftSide: {
    marginRight: SPACE.sm
  },
  row: {
    flexDirection: "row"
    // marginRight: SPACE.sm
  },
  icon: {
    marginTop: SPACE.xxsm,
    marginRight: SPACE.xsm
  }
});
