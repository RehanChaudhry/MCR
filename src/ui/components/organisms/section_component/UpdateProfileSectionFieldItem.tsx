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
import { UploadProfilePhoto } from "ui/components/templates/basic_profile/UploadProfilePhoto";
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
  listData: FormInputFieldData;
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
  listData
}) => {
  //for multi select item
  const chevronRight = () => <ChevronRight height={20} width={20} />;

  const theme = usePreferredTheme();

  switch (listData.inputType) {
    case "agreement":
      return <SectionComponentAppSwitch name={listData.id.toString()} />;
    case "textarea":
      return (
        <SectionComponentTextArea
          label={listData?.label}
          placeHolder={listData?.placeholder}
          name={listData?.id.toString()}
          isLocked={listData.isLocked}
          style={styles.padding}
        />
      );
    case "dropdown":
      return <SectionComponentDropDown listData={listData} />;

    case "checkbox":
      return (
        <AppFormCheckBoxGroup
          style={styles.padding}
          listData={listData.options!!}
          labelProps={{
            text: listData.label,
            weight: "semi-bold",
            numberOfLines: 0
          }}
          name={listData.id.toString()}
          isLocked={listData.isLocked}
        />
      );
    case "radio":
      return (
        <View style={styles.padding}>
          <AppFormRadioButton
            name={listData.id.toString()}
            labelProps={{
              text: listData.label,
              weight: "semi-bold"
            }}
            radioData={listData.options!!}
            direction={DIRECTION_TYPE.HORIZONTAL}
            isLocked={listData.isLocked}
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
            name={listData.id.toString()}
            title={listData.label}
            textStyle={{ color: theme.themedColors.placeholder }}
            rightIcon={chevronRight}
            initialList={createInitialListForFieldBoxFromUserMeta(
              listData.userMeta ?? []
            )}
            isLocked={listData.isLocked}
          />
        </View>
      );

    case "text":
      return (
        <View style={styles.padding}>
          <AppFormField
            name={listData.id.toString()}
            labelProps={{
              text: listData?.label,
              weight: "semi-bold"
            }}
            fieldInputProps={{
              textContentType: "name",
              keyboardType: "default",
              returnKeyType: "next",
              placeholder: listData?.placeholder,
              /* value: text,
                onChangeText: (value) => setText(value),*/
              autoCapitalize: "none",
              placeholderTextColor: theme.themedColors.placeholder,
              style: { color: theme.themedColors.label },
              viewStyle: [
                styles.textFieldStyle,
                {
                  backgroundColor: !listData.isLocked
                    ? theme.themedColors.background
                    : theme.themedColors.backgroundSecondary,
                  borderColor: !listData.isLocked
                    ? theme.themedColors.border
                    : theme.themedColors.borderSecondary
                }
              ]
            }}
            isLocked={listData.isLocked}
          />
        </View>
      );

    case "url":
      const IconTypes = {
        "icon-facebook": FacebookDark,
        "icon-twitter": TwitterDark,
        "icon-linkedin": LikedInDark,
        "icon-instagram": InstagramDark,
        "icon-snapchat": SnapchatDark,
        "icon-tiktok": TikTokDark,
        "icon-youtube": YouTube
      };

      const MyIcon =
        // @ts-ignore
        IconTypes[
          listData!.icon !== undefined
            ? listData?.icon.toString()
            : "icon-facebook"
        ];

      return (
        <View style={styles.padding}>
          <AppFormField
            name={listData.id.toString()}
            labelProps={{
              text: listData?.label,
              weight: "semi-bold"
            }}
            fieldInputProps={{
              textContentType: "name",
              keyboardType: "default",
              returnKeyType: "next",
              placeholder: listData?.placeholder,
              /* value: text,
                            onChangeText: (value) => setText(value),*/
              autoCapitalize: "none",
              placeholderTextColor: theme.themedColors.placeholder,
              style: { color: theme.themedColors.label },
              leftIcon: () => <MyIcon width={20} height={20} />,
              viewStyle: [
                styles.textFieldStyle,
                {
                  backgroundColor: !listData.isLocked
                    ? theme.themedColors.background
                    : theme.themedColors.backgroundSecondary,
                  borderColor: !listData.isLocked
                    ? theme.themedColors.border
                    : theme.themedColors.borderSecondary
                }
              ]
            }}
            isLocked={listData.isLocked}
          />
        </View>
      );

    case "file":
      return (
        <View style={styles.padding}>
          <UploadProfilePhoto name={listData.id.toString()} />
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
