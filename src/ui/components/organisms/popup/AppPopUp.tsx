import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import React, { FC } from "react";
import { View, Modal, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import {
  AppLabel,
  AppLabelProps
} from "ui/components/atoms/app_label/AppLabel";
import { moderateScale } from "config/Dimens";

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

  actions: Action[];
};

const AppPopUp: FC<Props> = ({
  isVisible,
  title,
  message,
  actions,
  titleStyle,
  messageStyle
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
          <View style={styles.textContainer}>
            {title && (
              <AppLabel
                style={[
                  styles.titleStyle,
                  { color: theme.themedColors.label }
                ]}
                weight={"bold"}
                text={title}
                numberOfLines={0}
                {...titleStyle}
              />
            )}
            {title && message && <View style={styles.spacer} />}
            {message && (
              <AppLabel
                style={[
                  styles.messageStyle,
                  { color: theme.themedColors.label }
                ]}
                text={message}
                numberOfLines={0}
                {...messageStyle}
              />
            )}
          </View>
          <View style={styles.actionsContainer}>
            {actions.map((action, idx) => {
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
  actionsContainer: {},
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
    fontSize: FONT_SIZE.lg,
    textAlign: "center"
  },
  messageStyle: {
    fontSize: FONT_SIZE.lg,
    textAlign: "center"
  },
  separator: {
    height: 0.5
  },
  spacer: {
    padding: SPACE.xsm
  }
});

export default AppPopUp;
