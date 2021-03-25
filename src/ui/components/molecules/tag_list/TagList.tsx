import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { TagDataItem } from "ui/components/molecules/tag_list/TagDataItem";
import TagListItem from "./TagListItem";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE } from "config";

type Props = {
  labelTitle: string;
  data: TagDataItem[];
};

const TagList: FC<Props> = ({ data, labelTitle }) => {
  const theme = usePreferredTheme();

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: theme.themedColors.primary }
      ]}>
      <AppLabel
        text={labelTitle}
        style={styles.labelTitle}
        weight={"semi-bold"}
      />

      <View style={styles.chipView}>
        {data.map((item) => {
          return <TagListItem key={item.id} title={item.titleTag} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column"
  },
  labelTitle: {
    paddingHorizontal: 14,
    marginTop: 12,
    fontSize: FONT_SIZE.md
  },
  FlatList: {
    paddingHorizontal: 8,
    paddingVertical: 8
  },
  horizontalLine: {
    height: 1
  },
  chipView: {
    marginTop: 8,
    marginHorizontal: 8,
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

export default TagList;
