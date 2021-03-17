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
        if (typeof colorValue === "string") {
          expect(isValidHex(colorValue)).toBeTruthy();
        } else if (typeof colorValue === "object") {
          for (const [, color] of Object.entries(colorValue)) {
            expect(isValidHex(color as string)).toBeTruthy();
          }
        } else {
          expect(false).toBeTruthy();
        }
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
          <Text testID={"isDark"}>{theme.isDark.toString()}</Text>
          <Text testID={"backgroundColor"}>
            {theme.themedColors.background}
          </Text>
          <Button
            testID={"toggleTheme"}
            title="Change theme"
            onPress={() =>
              theme.setScheme(
                theme.isDark ? AppColorScheme.LIGHT : AppColorScheme.DARK
              )
            }
          />
          <Button
            testID={"changeThemeBgColor"}
            title="Change theme Bg Color"
            onPress={() => {
              theme.setCustomPalette({
                background: "#00694e"
              });
            }}
          />
        </View>
      </>
    );
  };

  it("theme toggle", () => {
    // given
    const wrapper = render(
      <AppThemeProvider colorScheme={AppColorScheme.LIGHT}>
        <TestComponent />
      </AppThemeProvider>
    );
    expect(wrapper.getByTestId("isDark").props.children).toEqual(
      false.toString()
    );
    expect(wrapper.getByTestId("backgroundColor").props.children).toEqual(
      "#FFFFFF"
    );

    // when
    fireEvent.press(wrapper.getByTestId("toggleTheme"));
    // then
    expect(wrapper.getByTestId("isDark").props.children).toEqual(
      true.toString()
    );

    // when
    fireEvent.press(wrapper.getByTestId("changeThemeBgColor"));
    // then
    expect(wrapper.getByTestId("backgroundColor").props.children).toEqual(
      "#00694e"
    );
  });
});
