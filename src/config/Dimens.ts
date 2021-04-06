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

export const FONT_SIZE = {
  xs: 12.0,
  sm: 14.0,
  base: 16.0,
  lg: 18.0,
  xl: 20.0,
  _2xl: 24.0,
  _3xl: 30.0
};

export const MARGIN_SIZE = {
  leftRightMargin: 17
};

export const SPACE = {
  _2xs: 4.0,
  xs: 6.0,
  sm: 8.0,
  md: 12.0,
  lg: 16.0,
  xl: 18.0,
  _2xl: 24.0,
  _3xl: 32,
  _4xl: 48
};
