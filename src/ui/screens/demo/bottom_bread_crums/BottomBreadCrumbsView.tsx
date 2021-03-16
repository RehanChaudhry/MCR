import React, { FC } from "react";
import BottomBreadCrumbs, {
  BreadCrumbsItem
} from "ui/components/templates/bottom_bread_crumbs/BottomBreadCrumbs";
import { Alert } from "react-native";

type Props = {};

const data: BreadCrumbsItem[] = [
  {
    title: "Matches (18)",
    onPress: () => Alert.alert("Matches")
  },
  {
    title: "Friends (28)",
    onPress: () => Alert.alert("Friends")
  },
  {
    title: "New (31)",
    onPress: () => Alert.alert("New")
  },
  {
    title: "Recently Viewed (23)",
    onPress: () => Alert.alert("Recently Viewed")
  }
];
const BottomBreadCrumbsView: FC<Props> = () => {
  return <BottomBreadCrumbs data={data} />;
};

export default BottomBreadCrumbsView;
