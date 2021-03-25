import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import MultilineSpannableText from "ui/components/atoms/multiline_spannable_text/MultilineSpannableText";
import { StyleSheet } from "react-native";

test("check render properly", () => {
  const { getByTestId } = render(
    <MultilineSpannableText
      text={["Male", "Female", "Others"]}
      textStyle={[styles.firstText, styles.email, styles.thirdText]}
    />
  );
  const spannableText = getByTestId("SPANNABLE_TEXT");
  expect(spannableText).toBeDefined();
});

test("Snapshot testing", () => {
  const rendered = render(
    <MultilineSpannableText
      text={["Male", "Female", "Others"]}
      textStyle={[styles.firstText, styles.email, styles.thirdText]}
    />
  ).toJSON();
  expect(rendered).toMatchSnapshot();
});

test("check spannable text on Press", () => {
  const onPress = jest.fn();
  const { getByText } = render(
    <MultilineSpannableText
      text={["Male", "Female", "Others"]}
      textStyle={[styles.firstText, styles.email, styles.thirdText]}
      onPress={onPress}
    />
  );
  const spannableText = getByText("Female");
  fireEvent.press(spannableText);
  expect(onPress).toBeCalledWith("Female", 1);
  expect(onPress).toBeCalledTimes(1);
});

const styles = StyleSheet.create({
  firstText: {
    fontWeight: "normal"
  },
  email: {
    fontWeight: "bold"
  },
  thirdText: {
    fontWeight: "normal"
  }
});
