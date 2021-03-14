export type ColorPalette = {
  primaryBackground: string;
  secondaryBackground: string;
  tertiaryBackground: string;

  primaryLabelColor: string;
  secondaryLabelColor: string;
  tertiaryLabelColor: string;

  primaryLoaderColor: string;
  secondaryLoaderColor: string;
  tertiaryLoaderColor: string;

  primaryIconColor: string;
  secondaryIconColor: string;
  tertiaryIconColor: string;

  switchInActive: string;
  switchActive: string;

  tags: string;
  breadCrumbsInActive: string;
  breadCrumbsActive: string;

  error: string;
};

type ColorPaletteContainer = {
  light: ColorPalette;
  dark: ColorPalette;
  [key: string]: ColorPalette;
};

export const colorPaletteContainer: ColorPaletteContainer = {
  light: {
    primaryBackground: "#FFFFFF",
    secondaryBackground: "#EFEFF4",
    tertiaryBackground: "#FFFFFF",

    primaryLabelColor: "#000000",
    secondaryLabelColor: "#3C3C4399",
    tertiaryLabelColor: "#3C3C434D",

    primaryLoaderColor: "#000000",
    secondaryLoaderColor: "#3C3C4399",
    tertiaryLoaderColor: "#3C3C434D",

    primaryIconColor: "#000000",
    secondaryIconColor: "#3C3C4399",
    tertiaryIconColor: "#3C3C434D",

    switchInActive: "#c4bbbb",
    switchActive: "#224be0",

    tags: "#dedede",
    breadCrumbsInActive: "#c1c1c1",
    breadCrumbsActive: "#c7949d",

    error: "#FF0000"
  },
  dark: {
    primaryBackground: "#000000",
    secondaryBackground: "#1C1C1E",
    tertiaryBackground: "#2C2C2E",

    primaryLabelColor: "#FFFFFF",
    secondaryLabelColor: "#EBEBF599",
    tertiaryLabelColor: "#EBEBF54D",

    primaryLoaderColor: "#FFFFFF",
    secondaryLoaderColor: "#EBEBF599",
    tertiaryLoaderColor: "#EBEBF54D",

    primaryIconColor: "#FFFFFF",
    secondaryIconColor: "#EBEBF599",
    tertiaryIconColor: "#EBEBF54D",

    tags: "#6a6a6a",
    breadCrumbsInActive: "#2b2b2b",
    breadCrumbsActive: "#2f4b2f",
    switchInActive: "#8b8787",
    switchActive: "#f8cf06",

    error: "#FF0000"
  }
};
