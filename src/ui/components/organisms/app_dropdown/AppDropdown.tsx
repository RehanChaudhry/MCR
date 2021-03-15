import {
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import React, { useState } from "react";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { AppLog } from "utils/Util";
import { DropdownModal } from "ui/components/organisms/app_dropdown/DropdownModal";
import { usePreferredTheme } from "hooks";
import { DropDownItem } from "models/DropDownItem";
import ChevronDown from "assets/images/chevron-down.svg";

export interface AppDropdownProps {
  title: string;
  items: DropDownItem[];
  selectedItemCallback: (item: DropDownItem) => void;
  style?: StyleProp<ViewStyle>;
  dropDownIconStyle?: StyleProp<ImageStyle>;
  dialogBgColor?: string;
  dialogCloseIconStyle?: StyleProp<ImageStyle>;
}

export const AppDropdown = React.memo<AppDropdownProps>(
  ({
    title,
    items,
    selectedItemCallback,
    dialogBgColor,
    dropDownIconStyle,
    dialogCloseIconStyle,
    style
  }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedItemText, setSelectedItemText] = useState<string>(
      title
    );

    const { themedColors } = usePreferredTheme();

    function openModal() {
      AppLog.log("show modal");
      setModalVisible(true);
    }

    function closeModal() {
      AppLog.log("close modal");
      setModalVisible(false);
    }

    const [selectedItemId, setSelectedItemId] = useState<string>("none");
    const selectedItem = (item: DropDownItem | any) => {
      AppLog.log("selectedItem " + item.title);
      setModalVisible(false);
      setSelectedItemText(item.title);
      selectedItemCallback(item);
      setSelectedItemId(item.id);
    };

    return (
      <View
        style={[
          styles.root,
          {
            borderColor: themedColors.primaryLabelColor,
            backgroundColor: themedColors.primaryBackground
          },
          style
        ]}>
        <DropdownModal
          isVisible={modalVisible}
          items={items}
          closeModal={() => {
            closeModal();
          }}
          selectedItemCallback={selectedItem}
          dropDownBgColor={dialogBgColor}
          dialogCloseIconStyle={dialogCloseIconStyle}
          selectedItemId={selectedItemId}
        />

        <Pressable
          testID="dropdown-click"
          onPress={() => {
            openModal();
          }}>
          <View style={[styles.wrapper]}>
            <AppLabel text={selectedItemText} />

            <ChevronDown
              fill="#6B7280"
              style={[styles.dropdownIcon, dropDownIconStyle]}
            />
          </View>
        </Pressable>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  root: {
    borderRadius: 5,
    borderColor: "#ebebeb",
    borderWidth: 1
  },
  wrapper: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dropdownIcon: {
    width: 12,
    aspectRatio: 12 / 12,
    resizeMode: "contain"
  }
});
