import React, { FC } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
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
  imageUrl: string;
  moveToChatScreen?: (userId: number) => void;
};

const MyRoommateItem: FC<Props> = ({
  name,
  field,
  imageUrl,
  moveToChatScreen
}) => {
  const theme = usePreferredTheme();
  const onPressChat = () => {
    //dummy user id
    moveToChatScreen(12);
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Image source={{ uri: imageUrl }} style={styles.imageView} />
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
    borderRadius: 24
  },
  headingWithTextViewStyle: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: SPACE.sm
  },
  headingTextStyle: {
    fontSize: FONT_SIZE.sm
  },
  textStyle: {
    paddingTop: SPACE.xs,
    fontSize: FONT_SIZE.xs
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
