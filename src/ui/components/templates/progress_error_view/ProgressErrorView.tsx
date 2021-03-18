import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import { usePreferredTheme } from "hooks";

interface Props {
  style?: StyleProp<ViewStyle>;
  isLoading: boolean;
  error: string | undefined;
  errorView: (message: string) => React.ReactElement;
  children: React.ReactNode;
  data: any | undefined;
}

const ProgressErrorView = ({
  style,
  error,
  errorView,
  isLoading,
  children,
  data
}: Props) => {
  const { themedColors } = usePreferredTheme();

  const progressView = () => {
    return (
      <ActivityIndicator
        size="large"
        color={themedColors.primary}
        style={[
          styles.initialPb,
          { backgroundColor: themedColors.background }
        ]}
      />
    );
  };

  return (
    <View style={[styles.container, style]}>
      {isLoading && progressView()}
      {!isLoading && error && errorView(error)}
      {!isLoading && !error && data && children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  initialPb: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ProgressErrorView;
