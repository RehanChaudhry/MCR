import React, { FC, useCallback, useEffect, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from "react-native";
import { COLORS, SPACE } from "config";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import Strings from "config/Strings";
import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { UpdateProfileStackParamList } from "routes/ProfileStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { WelcomeStackParamList } from "routes/WelcomeStack";
import EScreen from "models/enums/EScreen";
import { FormikValues, useFormikContext } from "formik";
import { SvgProp } from "utils/Util";
import { ConversationItem } from "models/ConversationItem";
import EIntBoolean from "models/enums/EIntBoolean";

type Props = {
  name: string;
  viewStyle?: StyleProp<ViewStyle>;
  title: string | undefined;
  textStyle: StyleProp<TextStyle>;
  rightIcon: SvgProp | undefined;
  initialList?: ConversationItem[];
  isLocked: EIntBoolean;
};

type UpdateProfileNavigationProp = StackNavigationProp<
  UpdateProfileStackParamList,
  "AddInterests"
>;
type welcomeNavigationProp = StackNavigationProp<
  WelcomeStackParamList,
  "Questionnaire"
>;
type UpdateProfileRouteProp = RouteProp<
  UpdateProfileStackParamList,
  "UpdateProfile"
>;

export const FieldBox: FC<Props> = ({
  name,
  viewStyle,
  title,
  textStyle,
  rightIcon,
  initialList,
  isLocked = EIntBoolean.FALSE
}) => {
  const theme = usePreferredTheme();
  const route = useRoute<UpdateProfileRouteProp>();
  const updateNavigation = useNavigation<UpdateProfileNavigationProp>();
  const welcomeNavigation = useNavigation<welcomeNavigationProp>();

  const { values } = useFormikContext<FormikValues>();
  const [optionsText, setOptionsText] = useState(
    Strings.profile.dropDownInitialValue.addOptions
  );
  const [areOptionsAdded, setAreOptionsAdded] = useState(false);

  const updateUi = useCallback(() => {
    if (values[name]?.length > 0) {
      setOptionsText(
        `Added ${values[name].length} option${
          values[name]?.length === 1 ? "" : "s"
        }`
      );
      setAreOptionsAdded(true);
    } else {
      setOptionsText(Strings.profile.dropDownInitialValue.addOptions);
      setAreOptionsAdded(false);
    }
  }, [name, values]);

  useEffect(() => {
    values[name] = initialList;
    updateUi();
  }, [updateUi, values, name, initialList]);

  useEffect(() => {
    if (route.params.listKey === name) {
      values[name] = route.params.list;
      updateUi();
    }
  }, [updateUi, values, name, route.params.list, route.params.listKey]);

  return (
    <View>
      <AppLabel text={title} weight="semi-bold" />
      <TouchableWithoutFeedback
        onPress={() => {
          if (route.params.isFrom === EScreen.WELCOME) {
            !isLocked &&
              welcomeNavigation.push("AddInterests", {
                list: values[name] ?? [],
                listKey: name,
                title: title
              });
          } else {
            !isLocked &&
              updateNavigation.push("AddInterests", {
                list: values[name] ?? [],
                listKey: name,
                title: title
              });
          }
        }}>
        <View
          style={[
            styles.input,
            viewStyle,
            {
              borderColor: !isLocked
                ? theme.themedColors.border
                : theme.themedColors.borderSecondary,
              backgroundColor: !isLocked
                ? theme.themedColors.background
                : theme.themedColors.backgroundSecondary
            }
          ]}>
          <AppLabel
            text={optionsText}
            style={[
              textStyle,
              areOptionsAdded
                ? { color: theme.themedColors.primary }
                : { color: theme.themedColors.placeholder }
            ]}
          />
          <View style={styles.subContainer}>
            {rightIcon?.(theme.themedColors.label, 20, 20)}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    //justifyContent: "center",
    alignItems: "center",
    color: COLORS.textColor1,
    borderStyle: "solid",
    height: 42,
    borderRadius: 5,
    paddingRight: SPACE.md,
    paddingLeft: SPACE.md,
    borderWidth: 1,
    flex: 1,
    marginTop: SPACE.xs,
    alignContent: "space-between"
  },
  subContainer: {
    flex: 1,
    alignItems: "flex-end"
  }
});
