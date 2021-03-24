import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import TagListItem from "./TagListItem";

import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE } from "config";
import { dataType } from "ui/components/profile/view_profile/Interest";
import usePreferredTheme from "../../../../hooks/theme/usePreferredTheme";

type Props = {
  labelTitle?: string;
  data: dataType[];
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
