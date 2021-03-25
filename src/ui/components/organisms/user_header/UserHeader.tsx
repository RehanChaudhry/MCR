import React from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import { usePreferredTheme } from "hooks";
import { FONT_SIZE, moderateScale, SPACE } from "config/Dimens";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";

interface Props {
  style?: StyleProp<ViewStyle>;
  image: string;
  name: string;
  subtitle: string;
}

const UserHeader: React.FC<Props> = ({
  image,
  name,
  subtitle,
  style
}: Props) => {
  const { themedColors } = usePreferredTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themedColors.background },
        style
      ]}>
      <Image style={styles.profileImage} source={{ uri: image }} />
      <View style={styles.infoTextContainer}>
        <AppLabel style={styles.userName} text={name} weight={"bold"} />
        <AppLabel
          style={[styles.subtitle, { color: themedColors.interface[600] }]}
          text={subtitle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  profileImage: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(32)
  },
  userName: { fontSize: FONT_SIZE.md, includeFontPadding: false },
  subtitle: { fontSize: FONT_SIZE.sm, marginTop: SPACE.xsm },
  infoTextContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginStart: SPACE.md
  }
});

export default UserHeader;
