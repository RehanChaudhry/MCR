import React, { FC } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import UserImage from "assets/images/user_pic2.svg";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { FONT_SIZE, SPACE } from "config";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { grayShades } from "hooks/theme/ColorPaletteContainer";
import ChatRound from "assets/images/chat_round.svg";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";

type Props = {
  name: string;
  field: string;
};

const MyRoommateItem: FC<Props> = ({ name, field }) => {
  const theme = usePreferredTheme();
  const onPressChat = () => {
    Alert.alert("Chat Clicked");
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.imageView}>
          <UserImage height={48} width={48} />
        </View>
        <View style={styles.headingWithTextViewStyle}>
          <HeadingWithText
            headingText={name}
            headingStyle={[
              styles.headingTextStyle,
              { color: theme.themedColors.labelSecondary }
            ]}
            text={field}
            textStyle={[
              styles.textStyle,
              { color: theme.themedColors.interface["600"] }
            ]}
          />
        </View>
        <View style={styles.iconView}>
          <TouchableOpacity onPress={onPressChat}>
            <AppImageBackground
              containerStyle={styles.chatButton}
              containerShape={CONTAINER_TYPES.SQUARE}
              icon={() => (
                <ChatRound
                  fill={theme.themedColors.interface[800]}
                  width={24}
                  height={24}
                />
              )}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.horizontalLine} />
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column"
  },
  container: {
    flexDirection: "row"
  },
  imageView: {
    height: 48,
    width: 48,
    borderRadius: SPACE._3xl
  },
  headingWithTextViewStyle: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: SPACE.sm
  },
  headingTextStyle: {
    fontSize: FONT_SIZE.lg
  },
  textStyle: {
    paddingTop: SPACE.xsm,
    fontSize: FONT_SIZE.sm
  },

  horizontalLine: {
    backgroundColor: grayShades.warmGray[300],
    height: 0.6,
    marginVertical: SPACE.lg
  },
  iconView: {
    alignItems: "flex-end",
    alignSelf: "center",
    flex: 1
  },
  chatButton: {
    width: 36,
    height: 36
  }
});

export default MyRoommateItem;
