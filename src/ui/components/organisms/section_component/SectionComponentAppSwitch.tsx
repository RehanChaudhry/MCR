import React, { FC, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { FONT_SIZE, SPACE } from "config";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { AppSwitch } from "ui/components/atoms/app_switch/AppSwitch";
import { grayShades } from "hooks/theme/ColorPaletteContainer";
import { FormikValues, useFormikContext } from "formik";
import { AppFormValidationLabel } from "ui/components/molecules/app_form/AppFormValidationLabel";
import { AppLog } from "utils/Util";

type Props = {
  name: string;
};

const SectionComponentAppSwitch: FC<Props> = ({ name }) => {
  const theme = usePreferredTheme();

  const {
    errors,
    setFieldTouched,
    setFieldValue,
    touched,
    initialValues
  } = useFormikContext<FormikValues>();

  const _setFieldTouched = useCallback(() => setFieldTouched(name), [
    setFieldTouched,
    name
  ]);

  const _onValueChange = useCallback(
    (isSwitched) => {
      AppLog.log(
        () => "In AppSwitch#onValueChange(), isSwitched: " + isSwitched
      );
      _setFieldTouched();
      setFieldValue(name, isSwitched);
    },
    [_setFieldTouched, name, setFieldValue]
  );

  return (
    <View style={styles.innerCardView}>
      <HeadingWithText
        headingText={"Roommate Agreement Terms"}
        headingStyle={[
          styles.headingStyle,
          { color: theme.themedColors.label }
        ]}
        headingFontWeight={"semi-bold"}
        text={
          "We encourage you to discuss any issues with your roommate(s), as most disagreements can be resolved by discussing them openly and honestly. Your roommate(s) may think differently than you do, and usually do not realize that there is a problem if it is not discussed. Student staff members can help to facilitate the conversation with your roommate(s), as opposed to fixing the problem for you, which will help you and your roommate(s) create ways to communicate more effectively in regard to other matters."
        }
        textStyle={[styles.textStyle]}
      />
      <AppSwitch
        defaultValue={
          initialValues[name] !== undefined
            ? initialValues[name].includes("1")
            : false
        }
        onValueChange={_onValueChange}
        showCustomThumb={true}
        style={styles.switchButton}
      />
      {errors[name] && touched[name] && (
        <AppFormValidationLabel
          errorString={errors[name] as string}
          shouldVisible={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  innerCardView: {},
  cardView: {
    marginHorizontal: SPACE.lg,
    marginTop: SPACE.lg
  },
  textStyle: {
    marginTop: SPACE.sm,
    color: grayShades.coolGray["600"]
  },
  headingStyle: {
    fontSize: FONT_SIZE.base
  },
  buttonView: {
    marginTop: SPACE.md
  },
  switchButton: {
    paddingTop: SPACE.lg
  }
});

export default SectionComponentAppSwitch;
