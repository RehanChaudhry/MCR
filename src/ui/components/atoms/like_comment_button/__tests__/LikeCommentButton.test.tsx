import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { LikeCommentButton } from "ui/components/atoms/like_comment_button/LikeCommentButton";
import Like from "assets/images/like.svg";

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

it("renders  icon", () => {
  const { queryByTestId } = render(
    <LikeCommentButton
      unSelectedText={"Like"}
      icon={() => <Like testID={"icon"} width={16} height={16} />}
    />
  );
  const icon = queryByTestId("icon");
  expect(icon).not.toBeNull();
});
