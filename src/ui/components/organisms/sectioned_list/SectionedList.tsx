import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import {
  Pressable,
  SectionList,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import { AppLog } from "utils/Util";
import { SPACE } from "config";

export type BaseItem = {
  key: () => string;
};

export type Section<T extends BaseItem, U extends BaseItem> = {
  header: T;
  data: U[];
};

interface Props<ItemT extends BaseItem, ItemU extends BaseItem> {
  style?: StyleProp<ViewStyle>;
  listHeaderComponent?: React.ReactElement;
  list: Section<ItemT, ItemU>[];
  selectedIndexProp?: number;
  headerView: (
    header: ItemT,
    isSelected: boolean,
    index: number
  ) => React.ReactElement;
  bodyView: (
    list: Section<ItemT, ItemU>[],
    bodyItem: ItemU,
    parentIndex: number,
    index: number
  ) => React.ReactElement;
  listFooterComponent?: React.ReactElement;
  isCollapsable?: boolean;
}

const SectionedList = <ItemT extends BaseItem, ItemU extends BaseItem>({
  style,
  listHeaderComponent,
  list,
  selectedIndexProp,
  headerView,
  bodyView,
  listFooterComponent,
  isCollapsable = false
}: Props<ItemT, ItemU>) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(
    selectedIndexProp ?? -1
  );
  useEffect(() => {
    setSelectedIndex(selectedIndexProp ?? (list.length > 0 ? 0 : -1));
  }, [selectedIndexProp, list]);

  const sectionList = useRef<SectionList<any, any> | null>(null);
  const previouslyOpenedSection = useRef<number>(-1);

  const bodyItemView = useCallback(
    ({
      index,
      item,
      section
    }: {
      index: number;
      item: ItemU;
      section: Section<ItemT, ItemU>;
    }) => {
      const parentPosition: number = list.indexOf(section);

      if (isCollapsable && parentPosition !== selectedIndex) {
        return null;
      } else {
        return bodyView(list, item, parentPosition, index);
      }
    },
    [isCollapsable, list, selectedIndex, bodyView]
  );

  const sectionView = useCallback(
    ({ section }: { section: Section<ItemT, ItemU> }) => {
      const index = list.indexOf(section);
      const onPress = () => {
        if (isCollapsable) {
          let updatedIndex = selectedIndex !== index ? index : -1;
          setSelectedIndex(updatedIndex);
        }
      };

      return (
        <View style={styles.bodyItem}>
          <Pressable onPress={onPress}>
            {headerView(
              section.header,
              !isCollapsable || selectedIndex === index,
              index
            )}
          </Pressable>
        </View>
      );
    },
    [isCollapsable, list, selectedIndex, headerView]
  );

  const sectionFooter = useCallback(
    () => <View style={{ height: SPACE.lg }} />,
    []
  );

  const keyExtractor = useCallback((item) => item.key(), []);

  useLayoutEffect(() => {
    if (
      previouslyOpenedSection.current < selectedIndex &&
      previouslyOpenedSection.current !== -1
    ) {
      AppLog.logForcefully(
        () =>
          `previouslyOpenedSection: ${previouslyOpenedSection.current}, selectedIndex: ${selectedIndex}`
      );
      setTimeout(() => {
        sectionList.current?.scrollToLocation({
          sectionIndex: selectedIndex,
          itemIndex: 0,
          viewPosition: 0,
          viewOffset: 100,
          animated: false
        });
      }, 25);
    }
    previouslyOpenedSection.current = selectedIndex;
  }, [selectedIndex]);

  return (
    <SectionList
      removeClippedSubviews={true}
      ListHeaderComponent={listHeaderComponent}
      ref={sectionList}
      sections={list}
      renderItem={bodyItemView}
      renderSectionHeader={sectionView}
      renderSectionFooter={sectionFooter}
      keyExtractor={keyExtractor}
      contentContainerStyle={style}
      onScrollToIndexFailed={(info) => {
        AppLog.logForcefully(() => "Failed to scroll to " + info.index);
      }}
      ListFooterComponent={listFooterComponent}
      stickySectionHeadersEnabled={false} // true by default for iOS, for same experience
    />
  );
};

const styles = StyleSheet.create({
  sectionedList: { padding: SPACE.lg },
  bodyItem: {
    flexDirection: "column"
  }
});

export default SectionedList;
