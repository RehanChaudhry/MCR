import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ColorPalette,
  colorPaletteContainer
} from "hooks/theme/ColorPaletteContainer";
import React, { useState } from "react";
import { useColorScheme } from "react-native";
import { AppLog } from "utils/Util";

export enum AppColorScheme {
  SYSTEM = "system",
  LIGHT = "light",
  DARK = "dark"
}

type ThemeContext = {
  isDark: boolean;
  themedColors: ColorPalette;
  saveCustomPalette: (palette: Partial<ColorPalette>) => Promise<void>;
  setScheme: (scheme: AppColorScheme) => void;
};

const key = "COLOR_PALETTE";
const storePalette = async (palette: Partial<ColorPalette>) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(palette));
  } catch (error) {
    AppLog.log(() => "Error storing palette", error);
  }
};

const getPalette = async () => {
  try {
    const paletteAsString = await AsyncStorage.getItem(key);
    return JSON.parse(paletteAsString ?? "") as Partial<ColorPalette>;
  } catch (error) {
    AppLog.warn("Error getting the palette", error);
  }
};

const ThemeContext = React.createContext<ThemeContext>({
  isDark: false,
  themedColors: colorPaletteContainer.light({}),
  saveCustomPalette: async () => {},
  setScheme: () => {}
});

interface ThemeProviderProps {
  children: React.ReactNode;
  colorScheme: AppColorScheme;
}

type Props = ThemeProviderProps;

export const AppThemeProvider = React.memo<Props>((props) => {
  const [customPalette, setCustomPalette] = useState<
    Partial<ColorPalette>
  >({});

  const systemColorScheme = useColorScheme();
  const colorScheme =
    props.colorScheme === AppColorScheme.SYSTEM
      ? systemColorScheme
      : props.colorScheme;

  const [isDark, setIsDark] = React.useState(
    colorScheme === AppColorScheme.DARK
  );

  // Listening to changes of device appearance while in run-time
  React.useEffect(() => {
    setIsDark(colorScheme === AppColorScheme.DARK);
  }, [colorScheme]);

  // Load saved custom palette upon start
  React.useEffect(() => {
    getPalette().then((palette) => {
      if (palette) {
        setCustomPalette(palette);
      }
    });
  }, []);

  const theme: ThemeContext = {
    isDark,
    themedColors: isDark
      ? colorPaletteContainer.dark(customPalette)
      : colorPaletteContainer.light(customPalette),
    saveCustomPalette: async (palette: Partial<ColorPalette>) => {
      storePalette(palette);
      setCustomPalette(palette);
    },
    setScheme: (scheme: AppColorScheme) =>
      setIsDark(scheme === AppColorScheme.DARK)
  };

  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  );
});

const usePreferredTheme = () => React.useContext(ThemeContext);

export default usePreferredTheme;
