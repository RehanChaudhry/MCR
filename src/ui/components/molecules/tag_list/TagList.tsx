import { grayShades } from "hooks/theme/ColorPaletteContainer";
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
    <View style={[styles.root]}>
      <AppLabel
        text={labelTitle}
        style={[
          styles.labelTitle,
          { color: theme.themedColors.labelSecondary }
        ]}
        weight={"semi-bold"}
      />

      <View style={styles.chipView}>
        {data.length > 0 &&
          data.map((item) => {
            return <TagListItem key={item.id} title={item.titleTag} />;
          })}

        {data.length === 0 && (
          <TagListItem
            title={"N/A"}
            style={[{ backgroundColor: grayShades.warmGray[100] }]}
          />
        )}
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
    fontSize: FONT_SIZE.md
  },
  horizontalLine: {
    height: 1
  },
  chipView: {
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

export default TagList;
