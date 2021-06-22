import { FONT_SIZE, SPACE } from "config";
import { moderateScale } from "config/Dimens";
import { usePreferredTheme } from "hooks";
import React, { FC } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";
import {
  AppLabel,
  AppLabelProps
} from "ui/components/atoms/app_label/AppLabel";

export type Action = {
  title: string;
  style?: AppLabelProps;
  onPress: () => void;
};

type Props = {
  isVisible: boolean;
  title?: string;
  message?: string;

  titleStyle?: AppLabelProps;
  messageStyle?: AppLabelProps;

  actions?: Action[];
  customActionButtons?: React.ReactElement;

  videoUrl?: string;
};

const AppVideoPopup: FC<Props> = ({
  isVisible,
  actions,
  customActionButtons,
  videoUrl
}) => {
  const theme = usePreferredTheme();
  return (
    <Modal
      testID="popup-modal"
      visible={isVisible}
      animationType="fade"
      transparent={true}>
      <View style={styles.root}>
        <View
          style={[
            styles.content,
            { backgroundColor: theme.themedColors.background }
          ]}>
          <View
            style={{
              height: 213,
              width: 300
            }}>
            <WebView style={{ flex: 1 }} source={{ uri: videoUrl! }} />
          </View>
          <View>
            {customActionButtons}
            {!customActionButtons &&
              actions?.map((action, idx) => {
                return (
                  <View key={idx}>
                    <View
                      style={[
                        styles.separator,
                        { backgroundColor: theme.themedColors.separator }
                      ]}
                    />
                    <TouchableOpacity
                      style={styles.actionContainer}
                      onPress={action.onPress}>
                      <AppLabel
                        style={[
                          styles.actionStyle,
                          { color: theme.themedColors.label }
                        ]}
                        text={action.title}
                        numberOfLines={0}
                        {...action.style}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(90,94,94,0.6)"
  },
  actionContainer: {
    padding: SPACE.md
  },
  actionStyle: {
    fontSize: FONT_SIZE.lg,
    textAlign: "center"
  },
  content: {
    width: "100%",
    maxWidth: moderateScale(300),
    borderRadius: 12,
    overflow: "hidden"
  },
  textContainer: {
    padding: SPACE.lg
  },
  titleStyle: {
    fontSize: FONT_SIZE.base,
    textAlign: "center"
  },
  messageStyle: {
    fontSize: FONT_SIZE.sm,
    textAlign: "center"
  },
  separator: {
    height: 0.5
  },
  spacer: {
    padding: SPACE.xs
  }
});

export default AppVideoPopup;
