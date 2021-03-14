import {
  Image,
  ImageStyle,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  View
} from "react-native";
import React from "react";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { usePreferredTheme } from "hooks";
import { DropDownItem } from "models/DropDownItem";

export interface DropDownModalProps {
  isVisible: boolean;
  closeModal: () => void;
  items: DropDownItem[];
  selectedItemCallback: (item: DropDownItem) => void;
  dropDownBgColor?: string;
  dialogCloseIconStyle?: StyleProp<ImageStyle>;
  selectedItemId: string;
}

export const DropdownModal = React.memo<DropDownModalProps>(
  ({
    isVisible,
    closeModal,
    items,
    selectedItemCallback,
    dropDownBgColor = null,
    dialogCloseIconStyle,
    selectedItemId
  }) => {
    const { themedColors } = usePreferredTheme();

    const getItemColor = (id: string): string => {
      if (selectedItemId == id) {
        return themedColors.tertiaryLabelColor;
      } else {
        return themedColors.primaryLabelColor;
      }
    };

    const renderItem = ({ item }: { item: DropDownItem }) => {
      return (
        <Pressable
          testID="dropdown-item-click"
          onPress={() => selectedItemCallback(item)}>
          <AppLabel
            text={item.title}
            style={[styles.flatListItem, { color: getItemColor(item.id) }]}
          />
        </Pressable>
      );
    };

    return (
      <Modal
        testID="dropdown-modal"
        visible={isVisible}
        animationType="none"
        transparent={true}>
        <View style={styles.root}>
          <View style={styles.contentWrapper}>
            <View
              style={[
                styles.content,
                {
                  backgroundColor: dropDownBgColor
                    ? dropDownBgColor
                    : themedColors.secondaryBackground
                }
              ]}>
              <FlatListWithPb
                shouldShowProgressBar={false}
                data={items}
                style={styles.flatList}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                initialNumToRender={items.length}
                removeClippedSubviews={true}
              />
            </View>
            <Pressable
              style={styles.circleWrapper}
              testID="close-modal"
              onPress={closeModal}>
              <View style={styles.circle}>
                <Image
                  source={require("assets/images/ic_close.png")}
                  style={[
                    styles.closeIcon,
                    { tintColor: themedColors.primaryLabelColor },
                    dialogCloseIconStyle
                  ]}
                />
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(90,94,94,0.7)"
  },
  //to handle auto height according to list
  contentWrapper: {
    flex: 0,
    height: "auto"
  },
  content: {
    borderRadius: 10,
    justifyContent: "center",
    marginHorizontal: 25,
    marginVertical: 50
  },
  circleWrapper: {
    top: 50,
    left: 25,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute"
  },
  circle: {
    borderWidth: 1.5,
    borderColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    borderRadius: 50
  },
  closeIcon: {
    width: 10,
    height: 10,
    resizeMode: "contain"
  },
  flatList: {},
  flatListItem: {
    paddingVertical: 8,
    alignSelf: "center"
  }
});
