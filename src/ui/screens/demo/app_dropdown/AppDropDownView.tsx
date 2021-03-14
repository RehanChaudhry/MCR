import { StyleSheet } from "react-native";
import React from "react";
import { ThemeSwitcher } from "ui/components/templates/ThemeSwitcher";
import { AppDropdown } from "ui/components/organisms/app_dropdown/AppDropdown";
import { DropDownItem } from "models/DropDownItem";
import { AppLog } from "utils/Util";
type Props = {};

const genderData: DropDownItem[] = [
  {
    id: "1",
    title: "Male"
  },
  {
    id: "2",
    title: "Female"
  },
  {
    id: "3",
    title: "Other"
  }
];

const countryData: DropDownItem[] = [
  {
    id: "1",
    title: "Austrailia"
  },
  {
    id: "2",
    title: "Canada"
  },
  {
    id: "3",
    title: "Brazil"
  },
  {
    id: "4",
    title: "India"
  },
  {
    id: "5",
    title: "Pakistan"
  },
  {
    id: "6",
    title: "Uk"
  },
  {
    id: "7",
    title: "New Zealand"
  },
  {
    id: "8",
    title: "Iraq"
  },
  {
    id: "9",
    title: "Iran"
  },
  {
    id: "10",
    title: "sweden"
  },
  {
    id: "11",
    title: "Denmark"
  },

  {
    id: "12",
    title: "France"
  }
];

export const AppDropDownView = React.memo<Props>(({}) => {
  return (
    <ThemeSwitcher>
      <AppDropdown
        title="Select Gender"
        items={genderData}
        selectedItemCallback={(item: DropDownItem) => {
          AppLog.log("dropdown selected item : " + item.title);
        }}
        style={styles.dropdown}
      />

      <AppDropdown
        title="Select Country"
        items={countryData}
        selectedItemCallback={(item: DropDownItem) => {
          AppLog.log("dropdown selected item : " + item.title);
        }}
        style={styles.dropdown}
      />
    </ThemeSwitcher>
  );
});

const styles = StyleSheet.create({
  dropdown: {
    marginBottom: 10
  }
});
