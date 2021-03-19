import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { LikeCommentButton } from "ui/components/atoms/like_comment_button/LikeCommentButton";

test("snapshot testing", () => {
  const rendered = render(
    <LikeCommentButton unSelectedText={"Like"} />
  ).toJSON();
  expect(rendered).toMatchSnapshot();
});

test("should properly perform click event", () => {
  const onPress = jest.fn();
  const { getByText } = render(
    <LikeCommentButton unSelectedText={"Like"} onValueChanged={onPress} />
  );
  const button = getByText("Like");
  fireEvent.press(button);
  expect(onPress).toBeCalledTimes(1);
});

test("renders  icon", () => {
  const { queryByTestId } = render(
    <LikeCommentButton unSelectedText={"Like"} />
  );
  const icon = queryByTestId("icon");
  expect(icon).toBeNull();
});
