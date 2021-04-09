import React, { FC, useEffect, useState } from "react";
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

type Props = {
  name: string;
  viewStyle?: StyleProp<ViewStyle>;
  title: string;
  textStyle: StyleProp<TextStyle>;
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
  textStyle
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

  useEffect(() => {
    if (route.params.listKey === name) {
      values[name] = route.params.list;
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
    }
  }, [values, name, route.params.list, route.params.listKey]);

  return (
    <View>
      <AppLabel text={title} weight="semi-bold" />
      <TouchableWithoutFeedback
        onPress={() => {
          if (route.params.isFrom === EScreen.WELCOME) {
            welcomeNavigation.navigate("AddInterests", {
              list: values[name] ?? [],
              listKey: name
            });
          } else {
            updateNavigation.navigate("AddInterests", {
              list: values[name] ?? [],
              listKey: name
            });
          }
        }}>
        <View
          style={[
            styles.input,
            viewStyle,
            { borderColor: theme.themedColors.border }
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
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: "column",
    justifyContent: "center",
    color: COLORS.textColor1,
    borderStyle: "solid",
    height: 42,
    borderRadius: 5,
    paddingRight: SPACE.md,
    paddingLeft: SPACE.md,
    borderWidth: 1,
    flex: 1,
    marginTop: SPACE.xs

    // //Its for IOS
    // shadowColor: COLORS.black,
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    //
    // // its for android
    // elevation: 2,
    // backgroundColor: "white"
  }
});
