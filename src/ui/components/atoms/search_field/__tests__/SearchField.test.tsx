import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import SearchField from "ui/components/atoms/search_field/SearchField";

it("Snapshot testing", () => {
  const rendered = render(
    <SearchField
      placeholder="Enter text"
      onChangeText={() => {}}
      searchIcon={<></>}
      clearIcon={false}
    />
  ).toJSON();
  expect(rendered).toMatchSnapshot();
});

it("Search by entered characters", async () => {
  const onChangeText = jest.fn();
  const { getByTestId } = render(
    <SearchField
      placeholder="Enter text"
      onChangeText={onChangeText}
      clearIcon={false}
    />
  );
  const textToSearch = getByTestId("SEARCH");

  await waitFor(() => {
    fireEvent.changeText(textToSearch, "Muhammad noman");
    expect(onChangeText).toBeCalledTimes(1);
    expect(onChangeText).toHaveBeenCalledWith("Muhammad noman");
  });
});

it("renders left icon", () => {
  const { queryByTestId } = render(
    <SearchField
      placeholder={"Enter Text"}
      onChangeText={() => {}}
      clearIcon={false}
    />
  );
  const leftIcon = queryByTestId("left-icon");
  const rightIcon = queryByTestId("right-icon");
  expect(rightIcon).toBeNull();
  expect(leftIcon).not.toBeNull();
});

it("renders right icon", () => {
  const { queryByTestId } = render(
    <SearchField
      placeholder={"Enter Text"}
      onChangeText={() => {}}
      clearIcon={true}
    />
  );
  const rightIcon = queryByTestId("right-icon");
  expect(rightIcon).toBeNull();
});
