import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { LikeCommentButton } from "ui/components/atoms/like_comment_button/LikeCommentButton";

test("snapshot testing", () => {
  const rendered = render(<LikeCommentButton text={"Like"} />).toJSON();
  expect(rendered).toMatchSnapshot();
});

test("should properly perform click event", () => {
  const onPress = jest.fn();
  const { getByText } = render(
    <LikeCommentButton text={"Like"} onPress={onPress} />
  );
  const button = getByText("Like");
  fireEvent.press(button);
  expect(onPress).toBeCalledTimes(1);
});

it("renders left icon", () => {
  const { queryByTestId } = render(
    <LikeCommentButton
      text={"Like"}
      leftIcon={require("assets/images/check.png")}
    />
  );
  const leftIcon = queryByTestId("left-icon");
  expect(leftIcon).not.toBeNull();
});
