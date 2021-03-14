import { fireEvent, render } from "@testing-library/react-native";
import { AppColorScheme, AppThemeProvider } from "hooks/theme";
import { usePreferredTheme } from "hooks";
import React from "react";
import { Button, Text, View } from "react-native";
import { colorPaletteContainer } from "hooks/theme/ColorPaletteContainer";

describe("initialization check", () => {
  it("light dark theme should be defined", () => {
    expect(colorPaletteContainer.light).toBeDefined();
    expect(colorPaletteContainer.dark).toBeDefined();
  });
});

describe("color validation", () => {
  const isValidHex = (color: string) => {
    if (!color) {
      return false;
    }

    // Validate hex values
    if (color.substring(0, 1) === "#") {
      color = color.substring(1);
    }

    switch (color.length) {
      case 3:
        return /^[0-9A-F]{3}$/i.test(color);
      case 6:
        return /^[0-9A-F]{6}$/i.test(color);
      case 8:
        return /^[0-9A-F]{8}$/i.test(color);
      default:
        return false;
    }
  };

  it("is valid hex", () => {
    for (const [, palette] of Object.entries(colorPaletteContainer)) {
      for (const [, colorValue] of Object.entries(palette)) {
        expect(isValidHex(colorValue)).toBeTruthy();
      }
    }
  });
});

describe("check theme value is properly set", () => {
  const TestComponent = () => {
    const theme = usePreferredTheme();
    return (
      <>
        <View>
          <Text testID={"text"}>{theme.isDark.toString()}</Text>
          <Button
            testID={"toggleTheme"}
            title="Change theme"
            onPress={() =>
              theme.setScheme(
                theme.isDark ? AppColorScheme.LIGHT : AppColorScheme.DARK
              )
            }
          />
        </View>
      </>
    );
  };

  it("theme toggle", () => {
    const wrapper = render(
      <AppThemeProvider colorScheme={AppColorScheme.LIGHT}>
        <TestComponent />
      </AppThemeProvider>
    );

    expect(wrapper.getByTestId("text").props.children).toEqual(
      false.toString()
    );

    fireEvent.press(wrapper.getByTestId("toggleTheme"));

    expect(wrapper.getByTestId("text").props.children).toEqual(
      true.toString()
    );
  });
});
