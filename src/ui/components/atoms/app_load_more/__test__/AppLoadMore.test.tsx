import { render } from "@testing-library/react-native";
import React from "react";
import { AppLoadMore } from "ui/components/atoms/app_load_more/AppLoadMore";

test("snapshot testing", () => {
  const rendered = render(<AppLoadMore />).toJSON();
  expect(rendered).toMatchSnapshot();
});
