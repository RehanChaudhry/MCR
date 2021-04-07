import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number) =>
  ((width + height) / (guidelineBaseWidth + guidelineBaseHeight)) * size;
const verticalScale = (size: number) =>
  (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
const moderateVerticalScale = (size: number, factor = 2) =>
  size + (verticalScale(size) - size) * factor;

export { scale, verticalScale, moderateVerticalScale, moderateScale };

type SIZE_HEIGHT_DOUBLE = { size: number; height: number };

let mapsOfSizesAndHeight = new Map<String, SIZE_HEIGHT_DOUBLE>();
mapsOfSizesAndHeight.set("xs", { size: 12.0, height: 16.0 });
mapsOfSizesAndHeight.set("sm", { size: 14.0, height: 20.0 });
mapsOfSizesAndHeight.set("base", { size: 16.0, height: 24.0 });
mapsOfSizesAndHeight.set("lg", { size: 18.0, height: 28.0 });
mapsOfSizesAndHeight.set("xl", { size: 20.0, height: 28.0 });
mapsOfSizesAndHeight.set("_2xl", { size: 24.0, height: 32.0 });
mapsOfSizesAndHeight.set("_3xl", { size: 30.0, height: 36.0 });

function parseMap(mapWithLabelAsKey: Map<String, SIZE_HEIGHT_DOUBLE>) {
  let mapWithSizeAsKey = new Map<number, number>();
  mapWithLabelAsKey.forEach((value) => {
    mapWithSizeAsKey.set(value.size, value.height);
  });
  return mapWithSizeAsKey;
}

const _mapsOfSizesAndHeightWithSizeKey = new Map(
  parseMap(mapsOfSizesAndHeight)
);

export const FONT_SIZE = {
  xs: mapsOfSizesAndHeight.get("xs")?.size,
  sm: mapsOfSizesAndHeight.get("sm")?.size,
  base: mapsOfSizesAndHeight.get("base")?.size,
  lg: mapsOfSizesAndHeight.get("lg")?.size,
  xl: mapsOfSizesAndHeight.get("xl")?.size,
  _2xl: mapsOfSizesAndHeight.get("_2xl")?.size,
  _3xl: mapsOfSizesAndHeight.get("_3xl")?.size
};

export const FONT_SIZE_LINE_HEIGHT = {
  xs: mapsOfSizesAndHeight.get("xs")?.height,
  sm: mapsOfSizesAndHeight.get("sm")?.height,
  base: mapsOfSizesAndHeight.get("base")?.height,
  lg: mapsOfSizesAndHeight.get("lg")?.height,
  xl: mapsOfSizesAndHeight.get("xl")?.height,
  _2xl: mapsOfSizesAndHeight.get("_2xl")?.height,
  _3xl: mapsOfSizesAndHeight.get("_3xl")?.height,
  ofFontSize: (size: number) => _mapsOfSizesAndHeightWithSizeKey.get(size)
};

export const MARGIN_SIZE = {
  leftRightMargin: 17
};

export const SPACE = {
  _2xs: 4.0,
  xs: 6.0,
  sm: 8.0,
  _2md: 10.0,
  md: 12.0,
  lg: 16.0,
  xl: 18.0,
  _2xl: 24.0,
  _3xl: 32,
  _4xl: 48
};

export const lineHeight = 20;
