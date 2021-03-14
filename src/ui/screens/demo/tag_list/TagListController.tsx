import React from "react";
import { TagListView } from "./TagListView";

type Props = {};

export const TagListController = React.memo<Props>(() => {
  return <TagListView />;
});
