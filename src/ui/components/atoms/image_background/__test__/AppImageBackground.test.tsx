import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";

test("snapshot testing", () => {
  const rendered = render(
    <AppImageBackground
      containerShape={CONTAINER_TYPES.CIRCLE}
      icon={require("assets/images/check.png")}
    />
  ).toJSON();
  expect(rendered).toMatchSnapshot();
});

it("renders icon correctly", () => {
  const { queryByTestId } = render(
    <AppImageBackground
      containerShape={CONTAINER_TYPES.CIRCLE}
      icon={require("assets/images/check.png")}
    />
  );
  let icon = queryByTestId("icon");
  expect(icon).not.toBeNull();
});

it("should properly perform click event", () => {
  const onPress = jest.fn();
  const { getByTestId } = render(
    <AppImageBackground
      containerShape={CONTAINER_TYPES.CIRCLE}
      icon={require("assets/images/check.png")}
      onPress={onPress}
    />
  );
  const imageButton = getByTestId("image-container");
  fireEvent.press(imageButton);
  expect(onPress).toBeCalledTimes(1);
});
