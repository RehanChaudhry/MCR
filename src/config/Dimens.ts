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
  _3xm: moderateScale(10.0),
  _2xsm: moderateScale(12.0),
  xsm: moderateScale(13.0),
  sm: moderateScale(14.0),
  md: moderateScale(15.0),
  lg: moderateScale(16.0),
  xl: moderateScale(18.0),
  _2xl: moderateScale(20.0),
  _3xl: moderateScale(24.0),
  _4xl: moderateScale(30.0),
  _5xl: moderateScale(36.0),
  _6xl: moderateScale(48.0)
};

export const MARGIN_SIZE = {
  leftRightMargin: 17
};

export const SPACE = {
  xxsm: moderateScale(4.0),
  xsm: moderateScale(6.0),
  sm: moderateScale(8.0),
  md: moderateScale(12.0),
  lg: moderateScale(16.0),
  xl: moderateScale(18.0),
  _2xl: moderateScale(24.0),
  _3xl: moderateScale(32),
  _4xl: moderateScale(48)
};

export const lineHeight = moderateScale(20);
