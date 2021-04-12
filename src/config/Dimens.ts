import { Dimensions, PixelRatio } from "react-native";
const { width, height } = Dimensions.get("window");

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = (size: number) =>
  ((width + height) / (guidelineBaseWidth + guidelineBaseHeight)) * size;
const verticalScale = (size: number) =>
  (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 2) =>
  Math.round(
    PixelRatio.roundToNearestPixel(
      size * (factor - width / guidelineBaseWidth)
    )
  );
const moderateVerticalScale = (size: number, factor = 2) => {
  // console.log("Debugging Fonts, RATIO: " + height / guidelineBaseHeight);
  // console.log(
  //   "Debugging Fonts, FACTOR: " +
  //     (height / guidelineBaseHeight < 0.85 ? factor * 0.9375 : factor)
  // );
  return PixelRatio.roundToNearestPixel(
    size *
      ((height / guidelineBaseHeight < 0.85 ? factor * 0.9375 : factor) -
        height / guidelineBaseHeight)
  );
};

export { scale, verticalScale, moderateVerticalScale, moderateScale };

type SIZE_HEIGHT_DOUBLE = { size: number; height: number };

let mapsOfSizesAndHeight = new Map<String, SIZE_HEIGHT_DOUBLE>();
mapsOfSizesAndHeight.set("xs", {
  size: moderateVerticalScale(12.0),
  height: moderateVerticalScale(16.0)
});
mapsOfSizesAndHeight.set("sm", {
  size: moderateVerticalScale(14.0),
  height: moderateVerticalScale(20.0)
});
mapsOfSizesAndHeight.set("base", {
  size: moderateVerticalScale(16.0),
  height: moderateVerticalScale(24.0)
});
mapsOfSizesAndHeight.set("lg", {
  size: moderateVerticalScale(18.0),
  height: moderateVerticalScale(28.0)
});
mapsOfSizesAndHeight.set("xl", {
  size: moderateVerticalScale(20.0),
  height: moderateVerticalScale(28.0)
});
mapsOfSizesAndHeight.set("_2xl", {
  size: moderateVerticalScale(24.0),
  height: moderateVerticalScale(32.0)
});
mapsOfSizesAndHeight.set("_3xl", {
  size: moderateVerticalScale(30.0),
  height: moderateVerticalScale(36.0)
});

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
  _3xl: mapsOfSizesAndHeight.get("_3xl")?.size,
  md: mapsOfSizesAndHeight.get("md")?.height
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
