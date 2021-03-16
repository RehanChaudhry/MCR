import ChevronDownIcon from "assets/images/chevron-down.svg";
import ChevronUpIcon from "assets/images/chevron-up.svg";
import Profile from "assets/images/profile.svg";
import { FONT_SIZE } from "config";
import Strings from "config/Strings";
import { usePreferredTheme } from "hooks";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Color, NumberProp } from "react-native-svg";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import Accordion from "ui/components/molecules/accordion/Accordion";
import { ThemeSwitcher } from "ui/components/templates/ThemeSwitcher";
import { SvgProp } from "utils/Util";

type Props = {};

export const AccordionDemoView: FC<Props> = () => {
  const theme = usePreferredTheme();
  const chevronUpIcon: SvgProp = (
    color?: Color,
    width?: NumberProp,
    height?: NumberProp
  ) => {
    return <ChevronUpIcon width={width} height={height} fill={color} />;
  };
  const chevronDownIcon: SvgProp = (
    color?: Color,
    width?: NumberProp,
    height?: NumberProp
  ) => {
    return <ChevronDownIcon width={width} height={height} fill={color} />;
  };
  const profileIcon: SvgProp = (
    color?: Color,
    width?: NumberProp,
    height?: NumberProp
  ) => {
    return <Profile width={width} height={height} fill={color} />;
  };

  const firstHeaderItem = (isExpanded: boolean) => {
    return (
      <View
        style={[
          style.container,
          {
            backgroundColor: theme.themedColors.interface[300],
            borderColor: theme.themedColors.label
          }
        ]}>
        <View style={style.titleContainer}>
          <AppLabel
            text={"Social Preference"}
            style={[
              style.title,
              { color: theme.themedColors.labelSecondary }
            ]}
          />
          <AppLabel
            text={"Personality Preference"}
            style={[
              style.subTitle,
              { color: theme.themedColors.labelSecondary }
            ]}
          />
        </View>
        <View style={style.toggleIconContainer}>
          {isExpanded
            ? chevronUpIcon(theme.themedColors.label, 20, 20)
            : chevronDownIcon(theme.themedColors.label, 20, 20)}
        </View>
      </View>
    );
  };

  const firstExpandableItem = () => {
    return (
      <View>
        <AppLabel
          text={Strings.dummyText}
          numberOfLines={10}
          style={style.descText}
        />
      </View>
    );
  };

  const secondAccordionHeader = (isExpanded: boolean) => {
    return (
      <View
        style={[
          style.container,
          {
            backgroundColor: theme.themedColors.interface[300],
            borderColor: theme.themedColors.label
          }
        ]}>
        <AppLabel
          text={"Open User Profile"}
          style={[style.title, { color: theme.themedColors.label }]}
        />
        <View style={style.toggleIconContainer}>
          {isExpanded
            ? chevronUpIcon(theme.themedColors.label, 20, 20)
            : chevronDownIcon(theme.themedColors.label, 20, 20)}
        </View>
      </View>
    );
  };

  const secondAccordionExpandableItem = () => {
    return (
      <View style={style.marginBottom}>
        <View style={{ flexDirection: "row" }}>
          {profileIcon(theme.themedColors.label, 50, 50)}
          <View style={style.profileContainer}>
            <AppLabel
              text={"Jaweria Siddiqui"}
              style={[style.title, { color: theme.themedColors.label }]}
            />
            <AppLabel
              text={"jaweria.siddiqui@startrum.com"}
              style={[style.subTitle, { color: theme.themedColors.label }]}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <ThemeSwitcher>
      <Accordion
        isExpanded={true}
        header={(isExpanded: boolean) => firstHeaderItem(isExpanded)}
        expandableItem={firstExpandableItem}
        executingTask={() => {
          justATestingFunctionForApiMock(5000);
          return false;
        }}
      />
      <Accordion
        isExpanded={false}
        header={(isExpanded: boolean) => secondAccordionHeader(isExpanded)}
        expandableItem={secondAccordionExpandableItem}
      />
    </ThemeSwitcher>
  );

  /*Note: It will block the app and its not recommended */
  function justATestingFunctionForApiMock(ms: number) {
    const start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 0.5,
    marginBottom: 12
  },
  title: {
    justifyContent: "flex-end",
    fontSize: FONT_SIZE.md,
    paddingLeft: 14
  },
  toggleIcon: {
    width: 20,
    height: 20
  },
  toggleIconContainer: {
    flex: 1,
    marginRight: 10,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  descText: {
    marginRight: 12,
    marginLeft: 12,
    marginBottom: 12
  },
  subTitle: {
    justifyContent: "flex-end",
    fontSize: FONT_SIZE.sm,
    paddingLeft: 14
  },
  titleContainer: {
    flex: 5,
    flexDirection: "column",
    justifyContent: "center"
  },
  profileImage: {
    width: 50,
    height: 50
  },
  marginBottom: {
    marginBottom: 12
  },
  profileContainer: {
    flexDirection: "column",
    justifyContent: "center"
  }
});
