import React, { useCallback } from "react";
import { SectionList, StyleSheet, View } from "react-native";
import { CircleImageWithText } from "ui/components/molecules/circle_image_with_text/CircleImageWithText";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";

type Props = {};

const listings = [
  {
    title: "NEW NOTIFICATIONS",
    data: ["Phoenix Walker"]
  },
  {
    title: "YESTURDAY",
    data: [
      "Anne McFadden",
      "Jakobe Snell",
      "Katherine Moss",
      "Britney Cooper"
    ]
  },
  {
    title: "OLDER NOTIFICATIONS",
    data: ["Fox Mccloud", "Abrella Bond"]
  }
];

export const NotificationView = React.memo<Props>(() => {
  const listItem = useCallback(() => <CircleImageWithText />, []);

  return (
    <View>
      <SectionList
        sections={listings}
        keyExtractor={(item, index) => item + index}
        renderItem={listItem}
        renderSectionHeader={({ section: { title } }) => (
          <AppLabel text={title} style={styles.sectionHeader} />
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  sectionHeader: {
    marginLeft: 20,
    marginBottom: 20,
    fontWeight: "bold"
  }
});
