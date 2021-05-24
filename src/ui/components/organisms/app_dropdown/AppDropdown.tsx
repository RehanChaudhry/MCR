import {
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle
} from "react-native";
import React, { useState } from "react";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { optimizedMemoWithStyleProp } from "ui/components/templates/optimized_memo/optimized_memo";
import { AppLog, SvgProp } from "utils/Util";
import { DropdownModal } from "ui/components/organisms/app_dropdown/DropdownModal";
import { usePreferredTheme } from "hooks";
import { DropDownItem } from "models/DropDownItem";
import ChevronDown from "assets/images/chevron-down.svg";
import { SPACE } from "config";

export interface AppDropdownProps {
  title?: string;
  items: DropDownItem[];
  selectedItemCallback: (item: DropDownItem) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  dropDownIconStyle?: StyleProp<ImageStyle>;
  dialogBgColor?: string;
  dialogCloseIconStyle?: StyleProp<ImageStyle>;
  dropDownIcon?: SvgProp;
  shouldShowCustomIcon?: boolean;
  shouldNotOptimize?: boolean;
}

export const AppDropdown = optimizedMemoWithStyleProp<AppDropdownProps>(
  ({
    title,
    items,
    selectedItemCallback,
    dialogBgColor,
    dropDownIconStyle,
    dialogCloseIconStyle,
    style,
    textStyle,
    dropDownIcon,
    shouldShowCustomIcon = false
  }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedItemText, setSelectedItemText] = useState<
      string | undefined
    >(title);

    const { themedColors } = usePreferredTheme();

    function openModal() {
      AppLog.log("show modal");
      setModalVisible(true);
    }

    function closeModal() {
      AppLog.log("close modal");
      setModalVisible(false);
    }

    const [
      selectedItemPosition,
      setSelectedItemPosition
    ] = useState<number>(-1);
    const selectedItem = (item: DropDownItem | any) => {
      AppLog.log("selectedItem " + item.value);
      setModalVisible(false);
      setSelectedItemText(item.value);
      selectedItemCallback(item);
      setSelectedItemPosition(item.id);
    };
    return (
      <View
        style={[
          styles.root,
          {
            backgroundColor: themedColors.background
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
          selectedItemPosition={selectedItemPosition}
        />

        <Pressable
          testID="dropdown-click"
          onPress={() => {
            openModal();
          }}>
          <View style={[styles.wrapper]}>
            <AppLabel
              text={selectedItemText}
              style={[
                styles.text,
                {
                  color:
                    selectedItemText === title
                      ? themedColors.interface[600]
                      : themedColors.label
                },
                textStyle
              ]}
            />
            {!shouldShowCustomIcon ? (
              <ChevronDown
                fill="#6B7280"
                style={[styles.dropdownIcon, dropDownIconStyle]}
              />
            ) : (
              dropDownIcon?.(themedColors.interface[700])
            )}
          </View>
        </Pressable>
      </View>
    );
  }
)([
  "style",
  "textStyle",
  "dialogCloseIconStyle",
  "dropDownIconStyle",
  "dropDownIcon"
]);

const styles = StyleSheet.create({
  root: {
    borderRadius: 5,
    justifyContent: "center"
  },
  wrapper: {
    paddingVertical: 10,
    paddingHorizontal: SPACE.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dropdownIcon: {
    width: 12,
    aspectRatio: 12 / 12,
    resizeMode: "contain"
  },
  text: { includeFontPadding: false }
});
