import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import { Uni } from "models/api_responses/UniSelectionResponseModel";
import React, { FC } from "react";
import { View, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";

type Props = {
  uni: Uni;
  onSelection: (item: Uni) => void;
};

const UniSelectionCell: FC<Props> = ({ uni, onSelection }) => {
  const theme = usePreferredTheme();
  return (
    <TouchableOpacity
      style={styles.content}
      onPress={() => onSelection(uni)}>
      <View style={styles.imageCircle}>
        <Image style={styles.image} source={{ uri: uni.imageLink }} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <AppLabel
            text={uni.name}
            style={{
              color: theme.themedColors.label,
              fontSize: FONT_SIZE.xsm,
              paddingBottom: SPACE.sm
            }}
          />
          <AppLabel
            text={uni.location}
            style={{
              color: theme.themedColors.labelSecondary,
              fontSize: FONT_SIZE.xsm
            }}
          />
        </View>
        <View style={styles.disclosureContainer}>
          <Image
            style={[
              styles.disclosureIndicator,
              { tintColor: theme.themedColors.label }
            ]}
            source={require("../../../../../assets/images/icon_disclosure.png")}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: SPACE.lg,
    flexDirection: "row"
  },
  logoContainer: {
    width: 40,
    height: 40
  },
  textContainer: {},
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: SPACE.md
  },
  disclosureContainer: {
    width: 20,
    height: 20,
    alignSelf: "flex-start"
  },
  disclosureIndicator: {
    width: "100%",
    height: "100%"
  },
  logo: { width: 40, height: 40 },
  imageCircle: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20
  }
});

export default UniSelectionCell;
