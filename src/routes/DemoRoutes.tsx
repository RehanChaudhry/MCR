import React from "react";
import AccordionController from "ui/screens/demo/accordion/AccordionController";
import AppImageWithBackgroundController from "ui/screens/demo/app_image_with_background/AppImageWithBackgroundController";
import AppInputFieldController from "ui/screens/demo/app_input_field/AppInputFieldController";
import AppButtonController from "ui/screens/demo/app_button/AppButtonController";
import AppLoadMoreController from "ui/screens/demo/app_load_more/AppLoadMoreController";
import AppComponentsDemo from "ui/screens/demo/AppComponentsDemo";
import { DemoStack } from "routes/DemoStack";

import SegmentedControlController from "ui/screens/demo/segmented_control/SegmentedControlController";
import { DemoSwitchController } from "ui/screens/demo_switch_variants/DemoSwitchController";
import { SearchFieldScreen } from "ui/screens/demo/searchfield/SearchFieldScreen";
import { AppLabelScreen } from "ui/screens/demo/app_label/AppLabelScreen";
import DemoFormController from "ui/screens/demo/form/DemoFormController";
import { RadioGroupScreen } from "../ui/screens/demo/radio_group/RadioGroupScreen";
import { TagListController } from "../ui/screens/demo/tag_list/TagListController";
import BottomBreadCrumbsController from "../ui/screens/demo/bottom_bread_crums/BottomBreadCrumbsController";
import { AppProgressBarController } from "ui/screens/demo/app_progress_bar/AppProgressBarController";
import { LikeCommentButtonScreen } from "ui/screens/demo/like_comment_button/LikeCommentButtonScreen";
import SectionedListController from "ui/screens/demo/sectioned_list/SectionedListController";
import { AppDropDownController } from "ui/screens/demo/app_dropdown/AppDropDownController";
import { RangeSliderController } from "ui/screens/demo/range_slider/RangeSliderController";

export const DemoRoutes = () => {
  return (
    <DemoStack.Navigator initialRouteName="Demo">
      <DemoStack.Screen name="Demo" component={AppComponentsDemo} />
      <DemoStack.Screen
        name="SegmentedControl"
        component={SegmentedControlController}
      />
      <DemoStack.Screen name="Switch" component={DemoSwitchController} />
      <DemoStack.Screen name="DemoForm" component={DemoFormController} />
      <DemoStack.Screen
        name="AppInputField"
        component={AppInputFieldController}
      />
      <DemoStack.Screen name="AppButton" component={AppButtonController} />
      <DemoStack.Screen name="SearchField" component={SearchFieldScreen} />
      <DemoStack.Screen name="AppLabel" component={AppLabelScreen} />
      <DemoStack.Screen
        name="BottomBreadCrumbs"
        component={BottomBreadCrumbsController}
      />
      <DemoStack.Screen name="Accordion" component={AccordionController} />
      <DemoStack.Screen name="RadioGroup" component={RadioGroupScreen} />
      <DemoStack.Screen name="TagList" component={TagListController} />
      <DemoStack.Screen
        name="LikeCommentButton"
        component={LikeCommentButtonScreen}
      />
      <DemoStack.Screen
        name="DropDown"
        component={AppDropDownController}
      />
      <DemoStack.Screen
        name="SectionedList"
        options={{ title: "Sectioned List" }}
        component={SectionedListController}
      />
      <DemoStack.Screen
        name="AppProgressBar"
        component={AppProgressBarController}
      />
      <DemoStack.Screen
        name="AppImageWithBackground"
        component={AppImageWithBackgroundController}
      />
      <DemoStack.Screen
        name="AppLoadMore"
        component={AppLoadMoreController}
      />
      <DemoStack.Screen
        name="RangeSlider"
        component={RangeSliderController}
      />
    </DemoStack.Navigator>
  );
};
