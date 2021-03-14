import React from "react";
import TagList from "ui/components/molecules/tag_list/TagList";

type Props = {};

export type dataType = {
  id: string;
  titleTag: string;
};

const data: dataType[] = [
  {
    id: "1",
    titleTag: "Music"
  },
  {
    id: "2",
    titleTag: "Rock"
  },
  {
    id: "3",
    titleTag: "Pop"
  },
  {
    id: "4",
    titleTag: "Eating"
  },
  {
    id: "5",
    titleTag: "Eating"
  },
  {
    id: "6",
    titleTag: "Eating"
  },
  {
    id: "7",
    titleTag: "Eating"
  },
  {
    id: "8",
    titleTag: "Eating"
  },
  {
    id: "9",
    titleTag: "Eating"
  },
  {
    id: "10",
    titleTag: "Eating"
  },
  {
    id: "11",
    titleTag: "Eating"
  }
];

export const TagListView = React.memo<Props>(() => {
  return <TagList data={data} labelTitle={"Favourites"} />;
});
