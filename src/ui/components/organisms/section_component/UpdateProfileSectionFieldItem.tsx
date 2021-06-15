import {
  FormInputFieldData,
  UserMetaData
} from "models/api_responses/RoommateAgreementResponseModel";
import React from "react";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { DynamicAppFormField } from "ui/components/templates/roommate_agreement/DynamicAppFormField";
import { AppFormDropDown } from "ui/components/molecules/app_form/AppFormDropDown";
import { SPACE, STRINGS } from "config";
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
import RoommateAgreementTerms from "ui/components/templates/roommate_agreement/RoommateAgreementTerms";
import InstagramDark from "assets/images/instagram_icon.svg";
import FacebookDark from "assets/images/facebook_icon.svg";
import LikedInDark from "assets/images/linkedin_icon.svg";
import TikTokDark from "assets/images/tiktok_icon.svg";
import SnapchatDark from "assets/images/snapchat_icon.svg";
import TwitterDark from "assets/images/twitter_icon.svg";
import YouTube from "assets/images/youtube_icon.svg";
type CustomFormFieldProps = {
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

export const UpdateProfileSectionFieldItem = React.memo<CustomFormFieldProps>(
  ({ listData }) => {
    //for multi select item
    const chevronRight = () => <ChevronRight height={20} width={20} />;

    const theme = usePreferredTheme();

    switch (listData.inputType) {
      case "agreement":
        return <RoommateAgreementTerms name={listData.id.toString()} />;
      case "textarea":
        return (
          <View style={styles.spacer}>
            <DynamicAppFormField
              label={listData?.label}
              placeHolder={listData?.placeholder}
              name={listData?.id.toString()}
              isLocked={listData.isLocked}
            />
          </View>
        );
      case "dropdown":
        return (
          <View style={styles.spacer}>
            <AppFormDropDown
              name={listData.id.toString()}
              validationLabelTestID={"genderValidationTestID"}
              labelProps={{
                text: listData.label,
                weight: "semi-bold"
              }}
              isLocked={listData.isLocked}
              appDropDownProps={{
                title: STRINGS.profile.dropDownInitialValue.gender,
                items: listData.options!,
                selectedItemCallback: () => {
                  //setTitle(item.title);
                },
                style: [
                  styles.dropDown,
                  {
                    borderColor: !listData.isLocked
                      ? theme.themedColors.border
                      : theme.themedColors.borderSecondary,
                    backgroundColor: !listData.isLocked
                      ? theme.themedColors.background
                      : theme.themedColors.backgroundSecondary
                  }
                ]
              }}
            />
          </View>
        );

      case "checkbox":
        return (
          <View style={styles.spacer}>
            <AppFormCheckBoxGroup
              listData={listData.options!!}
              labelProps={{
                text: listData.label,
                weight: "semi-bold",
                numberOfLines: 0
              }}
              name={listData.id.toString()}
              isLocked={listData.isLocked}
            />
          </View>
        );
      case "radio":
        return (
          <View style={styles.spacer}>
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
          <View style={styles.spacer}>
            <AppLabel text={"date"} />
          </View>
        );
      case "multiselect":
        return (
          <View style={styles.spacer}>
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
          <View style={styles.spacer}>
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
          <View style={styles.spacer}>
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
          <View style={styles.spacer}>
            <UploadProfilePhoto name={listData.id.toString()} />
          </View>
        );

      default:
        return null;
    }
  }
);
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
  spacer: {
    paddingBottom: SPACE.lg
  }
});
export default UpdateProfileSectionFieldItem;
