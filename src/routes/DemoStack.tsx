import { createStackNavigator } from "@react-navigation/stack";

export type DemoStackParamList = {
  Demo: undefined;
  SegmentedControl: undefined;
  Switch: undefined;
  DemoForm: undefined;
  AppInputField: undefined;
  AppButton: undefined;
  SearchField: undefined;
  AppLabel: undefined;
  BottomBreadCrumbs: undefined;
  Accordion: undefined;
  RadioGroup: undefined;
  TagList: undefined;
  LikeCommentButton: undefined;
  DropDown: undefined;
  SectionedList: undefined;
  AppProgressBar: undefined;
  AppImageWithBackground: undefined;
  AppLoadMore: undefined;
  RangeSlider: undefined;
};

export const DemoStack = createStackNavigator<DemoStackParamList>();
