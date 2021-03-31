export type Shades = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export type GrayShades = {
  blueGray: Shades;
  coolGray: Shades;
  gray: Shades;
  trueGray: Shades;
  warmGray: Shades;
};

export const grayShades: GrayShades = {
  blueGray: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A"
  },
  coolGray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827"
  },
  gray: {
    50: "#FAFAFA",
    100: "#F4F4F5",
    200: "#E4E4E7",
    300: "#D4D4D8",
    400: "#A1A1AA",
    500: "#71717A",
    600: "#52525B",
    700: "#3F3F46",
    800: "#27272A",
    900: "#18181B"
  },
  trueGray: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#E5E5E5",
    300: "#D4D4D4",
    400: "#A3A3A3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717"
  },
  warmGray: {
    50: "#FAFAF9",
    100: "#F5F5F4",
    200: "#E7E5E4",
    300: "#D6D3D1",
    400: "#A8A29E",
    500: "#78716C",
    600: "#57534E",
    700: "#44403C",
    800: "#292524",
    900: "#1C1917"
  }
};

export type ColorPalette = {
  black: string;
  background: string;
  backgroundSecondary: string;

  interface: Shades;

  primary: string;
  primaryShade: string;

  secondary: string;
  secondaryShade: string;

  danger: string;
  dangerShade: string;

  success: string;
  successShade: string;

  warn: string;
  warnShade: string;

  label: string;
  labelSecondary: string;

  border: string;
  borderSecondary: string;

  separator: string;

  placeholder: string;

  transparent: string;
};

type ColorPaletteContainer = {
  light: (customThemePalette: Partial<ColorPalette>) => ColorPalette;
  dark: (customThemePalette: Partial<ColorPalette>) => ColorPalette;
};

let defaultPalette: ColorPalette = {
  black: "#000000",
  background: "#FFFFFF",
  backgroundSecondary: grayShades.coolGray[100],

  interface: grayShades.coolGray,

  primary: "#00694e",
  primaryShade: "#e6f0ed",

  secondary: "#5e5851",
  secondaryShade: "#918b84",

  danger: "#EF4444",
  dangerShade: "#FEE2E2",

  success: "#22C55E",
  successShade: "#D1FAE5",

  warn: "#F97316",
  warnShade: "#FFEDD5",

  label: "#111827",
  labelSecondary: grayShades.coolGray[700],

  border: grayShades.coolGray[400],
  borderSecondary: grayShades.coolGray[700],

  separator: grayShades.coolGray[300],

  placeholder: grayShades.coolGray[600],

  transparent: "#FF000000"
};

let lightPalette: Partial<ColorPalette> = {};
let darkPalette: Partial<ColorPalette> = {};

function mergeDefaultPaletteWith(
  schemePalette: Partial<ColorPalette>,
  customThemePalette: Partial<ColorPalette>
): ColorPalette {
  return {
    ...defaultPalette,
    ...schemePalette,
    ...customThemePalette
  };
}

export const colorPaletteContainer: ColorPaletteContainer = {
  light: (customThemePalette: Partial<ColorPalette>) => {
    return mergeDefaultPaletteWith(lightPalette, customThemePalette);
  },
  dark: (customThemePalette: Partial<ColorPalette>) => {
    return mergeDefaultPaletteWith(darkPalette, customThemePalette);
  }
};

export const defaultPaletteCopy = {
  ...defaultPalette
};
