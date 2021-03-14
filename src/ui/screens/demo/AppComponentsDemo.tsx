import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { Screen } from "react-native-screens";
import ListItemSeparator from "ui/components/atoms/ListItemSeparator";
import AppComponentDemoCell from "./AppComponentDemoCell";
import { StackNavigationProp } from "@react-navigation/stack";
import { DemoStackParamList } from "routes/DemoStack";
import { useNavigation } from "@react-navigation/native";

type DemoNavigationProp = StackNavigationProp<DemoStackParamList, "Demo">;

export enum AppComponentType {
  BUTTON = "button",
  TEXTFIELD = "textfield",
  SEGMENTED_CONTROL = "segmented_control",
  SWITCH = "switch",
  FORM = "form",
  SEARCH_FIELD = "search_field",
  APP_LABEL = "app_label",
  BOTTOM_BREAD_CRUMBS = "bottom_bread_crumbs",
  RADIO_GROUP = "radio_group",
  TAG_LIST = "tag_list",
  LIKE_COMMENT_BUTTON = "like_comment_button",
  SECTIONED_LIST = "sectioned_list",
  DROPDOWN = "dropdown",
  APP_PROGRESS_BAR = "app_progress_bar",
  ACCORDION = "accordion",
  APP_WITH_IMAGE_BACKGROUND = "app_with_image_background",
  APP_LOAD_MORE = "app_load_more",
  RANGE_SLIDER = "range_slider"
}

export interface AppComponent {
  name: string;
  type: AppComponentType;
}

const data: AppComponent[] = [
  {
    name: "Button",
    type: AppComponentType.BUTTON
  },
  {
    name: "Text Field",
    type: AppComponentType.TEXTFIELD
  },
  {
    name: "Segmented Control",
    type: AppComponentType.SEGMENTED_CONTROL
  },
  {
    name: "Switch",
    type: AppComponentType.SWITCH
  },
  {
    name: "Form",
    type: AppComponentType.FORM
  },
  {
    name: "Search Field",
    type: AppComponentType.SEARCH_FIELD
  },
  {
    name: "Label",
    type: AppComponentType.APP_LABEL
  },
  {
    name: "Bottom Bread Crumbs",
    type: AppComponentType.BOTTOM_BREAD_CRUMBS
  },
  { name: "Accordion", type: AppComponentType.ACCORDION },
  {
    name: "Radio Group",
    type: AppComponentType.RADIO_GROUP
  },
  {
    name: "Tag List",
    type: AppComponentType.TAG_LIST
  },
  {
    name: "Like/Comment Button",
    type: AppComponentType.LIKE_COMMENT_BUTTON
  },
  {
    name: "Sectioned List",
    type: AppComponentType.SECTIONED_LIST
  },
  {
    name: "Dropdown",
    type: AppComponentType.DROPDOWN
  },
  {
    name: "Progress Bar",
    type: AppComponentType.APP_PROGRESS_BAR
  },
  {
    name: "Image With Background",
    type: AppComponentType.APP_WITH_IMAGE_BACKGROUND
  },
  {
    name: "Load More",
    type: AppComponentType.APP_LOAD_MORE
  },
  {
    name: "Range Slider",
    type: AppComponentType.RANGE_SLIDER
  }
];

const AppComponentsDemo = () => {
  const navigation = useNavigation<DemoNavigationProp>();

  const onItemSelection = (item: AppComponent) => {
    if (item.type === AppComponentType.BUTTON) {
      navigation.navigate("AppButton");
    } else if (item.type === AppComponentType.TEXTFIELD) {
      navigation.navigate("AppInputField");
    } else if (item.type === AppComponentType.SEGMENTED_CONTROL) {
      navigation.navigate("SegmentedControl");
    } else if (item.type === AppComponentType.SWITCH) {
      navigation.navigate("Switch");
    } else if (item.type === AppComponentType.FORM) {
      navigation.navigate("DemoForm");
    } else if (item.type === AppComponentType.SEARCH_FIELD) {
      navigation.navigate("SearchField");
    } else if (item.type === AppComponentType.APP_LABEL) {
      navigation.navigate("AppLabel");
    } else if (item.type === AppComponentType.BOTTOM_BREAD_CRUMBS) {
      navigation.navigate("BottomBreadCrumbs");
    } else if (item.type === AppComponentType.ACCORDION) {
      navigation.navigate("Accordion");
    } else if (item.type === AppComponentType.RADIO_GROUP) {
      navigation.navigate("RadioGroup");
    } else if (item.type === AppComponentType.TAG_LIST) {
      navigation.navigate("TagList");
    } else if (item.type === AppComponentType.LIKE_COMMENT_BUTTON) {
      navigation.navigate("LikeCommentButton");
    } else if (item.type === AppComponentType.SECTIONED_LIST) {
      navigation.navigate("SectionedList");
    } else if (item.type === AppComponentType.DROPDOWN) {
      navigation.navigate("DropDown");
    } else if (item.type === AppComponentType.APP_PROGRESS_BAR) {
      navigation.navigate("AppProgressBar");
    } else if (item.type === AppComponentType.APP_WITH_IMAGE_BACKGROUND) {
      navigation.navigate("AppImageWithBackground");
    } else if (item.type === AppComponentType.APP_LOAD_MORE) {
      navigation.navigate("AppLoadMore");
    } else if (item.type === AppComponentType.RANGE_SLIDER) {
      navigation.navigate("RangeSlider");
    }
  };

  return (
    <Screen style={styles.container}>
      <FlatList
        style={styles.list}
        data={data}
        ItemSeparatorComponent={ListItemSeparator}
        keyExtractor={(_item, idx) => idx.toString()}
        renderItem={({ item }) => {
          return (
            <AppComponentDemoCell item={item} onPress={onItemSelection} />
          );
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    backgroundColor: "white",
    flex: 1
  }
});

export default AppComponentsDemo;
