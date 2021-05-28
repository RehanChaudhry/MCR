import React, { FC, useLayoutEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import Strings from "config/Strings";
import CircularTick from "assets/images/circular_tick.svg";
import { usePreferredTheme } from "hooks";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import { moderateScale } from "config/Dimens";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { AddInterestsView } from "ui/screens/home/profile/update_profile/add_interests/AddInterestsView";
import { UpdateProfileStackParamList } from "routes/ProfileStack";
import EScreen from "models/enums/EScreen";
import { ConversationItem } from "models/ConversationItem";
import { AppLog } from "utils/Util";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import Close from "assets/images/close.svg";

type AddInterestsNavigationProp = StackNavigationProp<
  UpdateProfileStackParamList,
  "AddInterests"
>;
type AddInterestsRouteProp = RouteProp<
  UpdateProfileStackParamList,
  "AddInterests"
>;

type Props = {};

export const AddInterestsController: FC<Props> = () => {
  const navigation = useNavigation<AddInterestsNavigationProp>();
  const route = useRoute<AddInterestsRouteProp>();
  const [_list, _setList] = useState([...route.params.list]);

  const { themedColors } = usePreferredTheme();

  const goBack = () => {
    AppLog.logForcefully(
      "Going back from AddInterestContorller: list: " +
        JSON.stringify(_list)
    );
    navigation.navigate("UpdateProfile", {
      isFrom: EScreen.WELCOME,
      list: _list,
      listKey: route.params.listKey
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerTitle: () => (
        <HeaderTitle text={route.params.title ?? "N/A"} />
      ),
      headerLeft: () => (
        <HeaderLeftTextWithIcon
          text={Strings.newConversation.titleLeft}
          onPress={() => {
            navigation.goBack();
          }}
          icon={() => (
            <Close
              testID="icon"
              width={moderateScale(15)}
              height={moderateScale(15)}
              fill={themedColors.primary}
            />
          )}
        />
      ),
      headerRight: () => (
        <HeaderRightTextWithIcon
          text={Strings.newConversation.titleRight}
          onPress={() => {
            goBack();
          }}
          icon={() => (
            <CircularTick
              testID="icon"
              width={moderateScale(15)}
              height={moderateScale(15)}
              fill={themedColors.primary}
            />
          )}
        />
      ),
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        shadowColor: "#00000000"
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, _list]);

  const removeItemFromList = (itemToDelete: ConversationItem) => {
    _setList(_list.filter((item) => item.id !== itemToDelete.id));
  };
  const addItem = (value: string) => {
    if (
      value &&
      _list.filter((item) => item.value === value).length === 0
    ) {
      AppLog.logForcefully("Adding Item: " + value);

      _list.push({
        id: _list.length + 1,
        value: value,
        userId: _list.length + 1
      });
      _setList([..._list]);
    }
  };

  return (
    <AddInterestsView
      data={_list}
      removeItem={removeItemFromList}
      addItem={addItem}
    />
  );
};
