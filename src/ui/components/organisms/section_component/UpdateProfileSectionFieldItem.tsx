import {
  FormInputFieldData,
  UserMetaData
} from "models/api_responses/RoommateAgreementResponseModel";
import React from "react";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { SPACE } from "config";
import { StyleSheet, View } from "react-native";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { AppFormRadioButton } from "ui/components/molecules/app_form/AppFormRadioButton";
import { DIRECTION_TYPE } from "ui/components/atoms/radio_group/RadioGroup";
import AppFormField from "ui/components/molecules/app_form/AppFormField";
//for multiselect item
import ChevronRight from "assets/images/chevron_right.svg";
import { FieldBox } from "ui/components/atoms/FieldBox";
import { AppFormCheckBoxGroup } from "ui/components/molecules/app_form/AppFormCheckBoxGroup";
import InstagramDark from "assets/images/instagram_icon.svg";
import FacebookDark from "assets/images/facebook_icon.svg";
import LikedInDark from "assets/images/linkedin_icon.svg";
import TikTokDark from "assets/images/tiktok_icon.svg";
import SnapchatDark from "assets/images/snapchat_icon.svg";
import TwitterDark from "assets/images/twitter_icon.svg";
import YouTube from "assets/images/youtube_icon.svg";
import SectionComponentAppSwitch from "ui/components/organisms/section_component/SectionComponentAppSwitch";
import SectionComponentDropDown from "./SectionComponentDropDown";
import { SectionComponentTextArea } from "ui/components/organisms/section_component/SectionComponentTextArea";

type UpdateProfileSectionFieldItemProps = {
  item: FormInputFieldData;
};

function createInitialListForFieldBoxFromUserMeta(
  userMeta: UserMetaData[]
) {
  return userMeta.map((value, index) => ({
    id: index,
    value: value.value ?? "N/A",
    userId: 0
  }));
}

export const UpdateProfileSectionFieldItem: React.FC<UpdateProfileSectionFieldItemProps> = ({
  item
}) => {
  //for multi select item
  const chevronRight = () => <ChevronRight height={20} width={20} />;

  const theme = usePreferredTheme();

  switch (item.inputType) {
    case "agreement":
      return <SectionComponentAppSwitch name={item.id.toString()} />;
    case "textarea":
      return (
        <SectionComponentTextArea
          label={item?.label}
          placeHolder={item?.placeholder}
          name={item?.id.toString()}
          isLocked={item.isLocked}
          style={styles.padding}
        />
      );
    case "dropdown":
      return <SectionComponentDropDown listData={item} />;

    case "checkbox":
      return (
        <AppFormCheckBoxGroup
          style={styles.padding}
          listData={item.options!!}
          labelProps={{
            text: item.label,
            weight: "semi-bold",
            numberOfLines: 0
          }}
          name={item.id.toString()}
          isLocked={item.isLocked}
        />
      );
    case "radio":
      return (
        <View style={styles.padding}>
          <AppFormRadioButton
            name={item.id.toString()}
            labelProps={{
              text: item.label,
              weight: "semi-bold"
            }}
            radioData={item.options!!}
            direction={DIRECTION_TYPE.HORIZONTAL}
            isLocked={item.isLocked}
          />
        </View>
      );
    case "date":
      return (
        <View style={styles.padding}>
          <AppLabel text={"date"} />
        </View>
      );
    case "multiselect":
      return (
        <View style={styles.padding}>
          <FieldBox
            name={item.id.toString()}
            title={item.label}
            textStyle={{ color: theme.themedColors.placeholder }}
            rightIcon={chevronRight}
            initialList={createInitialListForFieldBoxFromUserMeta(
              item.userMeta ?? []
            )}
            isLocked={item.isLocked}
          />
        </View>
      );

    case "text":
    case "url":
    case "youtube":
      return (
        <View style={styles.padding}>
          <AppFormField
            name={item.id.toString()}
            labelProps={{
              text: item?.label,
              weight: "semi-bold"
            }}
            fieldInputProps={{
              leftIcon: () =>
                item.inputType === "youtube" ? (
                  <YouTube width={20} height={20} />
                ) : null,
              textContentType: "name",
              keyboardType: "default",
              returnKeyType: "next",
              placeholder: item?.placeholder,
              autoCapitalize: "none",
              placeholderTextColor: theme.themedColors.placeholder,
              style: { color: theme.themedColors.label },
              viewStyle: [
                styles.textFieldStyle,
                {
                  backgroundColor: !item.isLocked
                    ? theme.themedColors.background
                    : theme.themedColors.backgroundSecondary,
                  borderColor: !item.isLocked
                    ? theme.themedColors.border
                    : theme.themedColors.borderSecondary
                }
              ]
            }}
            isLocked={item.isLocked}
          />
        </View>
      );
    case "facebook":
    case "twitter":
    case "linkedin":
    case "instagram":
    case "snapchat":
    case "tiktok":
      const IconTypes = {
        "icon-facebook": FacebookDark,
        "icon-twitter": TwitterDark,
        "icon-linkedin": LikedInDark,
        "icon-instagram": InstagramDark,
        "icon-snapchat": SnapchatDark,
        "icon-tiktok": TikTokDark,
        "icon-video": YouTube
      };

      const MyIcon =
        // @ts-ignore
        IconTypes[item?.icon ? item?.icon : "icon-facebook"];

      return (
        <View style={styles.padding}>
          <AppFormField
            name={item.id.toString()}
            labelProps={{
              text: item?.label,
              weight: "semi-bold"
            }}
            passPlaceholderAsInitialValue={true}
            customTextChanged={(value) => value === item?.placeholder}
            fieldInputProps={{
              textContentType: "name",
              keyboardType: "default",
              returnKeyType: "next",
              lockDefaultValue: item?.placeholder,
              placeholder: item?.placeholder,
              autoCapitalize: "none",
              placeholderTextColor: theme.themedColors.placeholder,
              style: { color: theme.themedColors.label },
              leftIcon: () =>
                item?.icon ? <MyIcon width={20} height={20} /> : null,
              viewStyle: [
                styles.textFieldStyle,
                {
                  backgroundColor: !item.isLocked
                    ? theme.themedColors.background
                    : theme.themedColors.backgroundSecondary,
                  borderColor: !item.isLocked
                    ? theme.themedColors.border
                    : theme.themedColors.borderSecondary
                }
              ]
            }}
            isLocked={item.isLocked}
          />
        </View>
      );
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  space: {
    marginTop: SPACE.sm
  },
  dropDown: {
    borderWidth: 1
  },
  textFieldStyle: {
    borderWidth: 1
  },
  padding: {
    marginBottom: SPACE.lg
  }
});
export default UpdateProfileSectionFieldItem;
