import React from "react";
import { StyleSheet } from "react-native";
import {
  BORDER_TYPE,
  SearchField
} from "ui/components/atoms/search_field/SearchField";
import { AppLog } from "utils/Util";
import { ThemeSwitcher } from "ui/components/templates/ThemeSwitcher";

type Props = {};

export const SearchFieldScreen = React.memo<Props>(() => {
  return (
    <ThemeSwitcher>
      <SearchField
        placeholder={"Enter text here"}
        onChangeText={() => AppLog.log("Text to search")}
        leftIcon={false}
        rightIcon={false}
        style={styles.fieldWithIcon}
        borderType={BORDER_TYPE.SOLID}
      />
      <SearchField
        placeholder={"Enter text here"}
        onChangeText={() => AppLog.log("Text to search")}
        leftIcon={true}
        rightIcon={false}
        style={styles.fieldWithIcon}
        borderType={BORDER_TYPE.SOLID}
      />
      <SearchField
        placeholder={"Enter text here"}
        onChangeText={() => AppLog.log("Text to search")}
        leftIcon={false}
        rightIcon={true}
        style={styles.fieldWithIcon}
        borderType={BORDER_TYPE.SOLID}
      />
      <SearchField
        placeholder={"Enter text here"}
        onChangeText={() => AppLog.log("Text to search")}
        leftIcon={true}
        rightIcon={true}
        style={styles.fieldWithIcon}
        borderType={BORDER_TYPE.SOLID}
      />
      <SearchField
        placeholder={"Enter text here"}
        onChangeText={() => AppLog.log("Text to search")}
        leftIcon={false}
        rightIcon={false}
        style={styles.fieldWithIcon}
        borderType={BORDER_TYPE.DASHED}
      />
      <SearchField
        placeholder={"Enter text here"}
        onChangeText={() => AppLog.log("Text to search")}
        leftIcon={false}
        rightIcon={false}
        style={styles.fieldWithIcon}
        borderType={BORDER_TYPE.DOTTED}
      />
      <SearchField
        placeholder={"Enter text here"}
        onChangeText={() => AppLog.log("Text to search")}
        leftIcon={false}
        rightIcon={false}
        style={styles.fieldWithIcon}
      />
    </ThemeSwitcher>
  );
});

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40
  },
  fieldWithIcon: {
    marginBottom: 12
  }
});
