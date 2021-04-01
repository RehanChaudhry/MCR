import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  InteractionManager,
  StyleSheet,
  View
} from "react-native";
import { usePreferredTheme } from "hooks/index";

export default (
  actualView: React.ReactNode,
  loadingView?: React.ReactNode
) => {
  const [interactionComplete, setInteractionComplete] = useState(false);
  const { themedColors } = usePreferredTheme();

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setInteractionComplete(true);
    });
  });

  if (!interactionComplete) {
    return loadingView ? (
      loadingView
    ) : (
      <View style={styles.container}>
        <ActivityIndicator
          testID="initial-loader"
          style={styles.initialPb}
          size="small"
          color={themedColors.primary}
        />
      </View>
    );
  } else {
    return actualView;
  }
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  initialPb: {
    justifyContent: "center",
    alignItems: "center"
  }
});
