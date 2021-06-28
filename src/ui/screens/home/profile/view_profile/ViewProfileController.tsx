import React, { FC, useContext, useEffect, useState } from "react";
import { ViewProfileView } from "ui/screens/home/profile/view_profile/ViewProfileView";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileBottomParamList } from "routes/ProfileBottomBar";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import EScreen from "models/enums/EScreen";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import { HomeStackParamList } from "routes/HomeStack";
import useLazyLoadInterface from "hooks/useLazyLoadInterface";
import { Profile } from "models/api_responses/FetchMyProfileResponseModel";
import { useAuth } from "hooks";
import { useCreateConversation } from "hooks/useCreateConversation";
import { AppDataContext } from "ui/screens/home/friends/AppDataProvider";
import { useApi } from "repo/Client";
import { UpdateProfileResponseModel } from "models/api_responses/UpdateProfileResponseModel";
import { Alert } from "react-native";
import ProfileApis from "repo/auth/ProfileApis";
import { useCallback } from "react";

type Props = {};
type ProfileBottomNavigationProp = StackNavigationProp<
  ProfileBottomParamList,
  "ViewProfile"
>;
type HomeStackNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "ViewProfile"
>;

type ProfileRouteProp = RouteProp<ProfileBottomParamList, "ViewProfile">;

// removes firstName, lastName, and modifies profilePicture object
function modifyUiFields(_viewProfileUiData: Profile) {
  let modifiedItem = _viewProfileUiData?.sections?.[0]?.formInputs?.[0]!!;
  modifiedItem.intendedMajor = _viewProfileUiData.major;
  modifiedItem.homeTown = _viewProfileUiData.hometown;
  modifiedItem.profilePicture =
    _viewProfileUiData?.sections[0]?.formInputs![0]?.userMeta!.length >
      0 ?? 0
      ? JSON.parse(
          _viewProfileUiData?.sections[0]?.formInputs![0]?.userMeta![0]
            .value ?? ""
        )
      : "";
  modifiedItem.firstName =
    _viewProfileUiData?.sections![0].formInputs![1].userMeta?.length === 0
      ? "N/A"
      : _viewProfileUiData?.sections![0].formInputs![1].userMeta![0].value;
  modifiedItem.lastName =
    _viewProfileUiData?.sections![0].formInputs![2].userMeta?.length === 0
      ? "N/A"
      : _viewProfileUiData?.sections![0].formInputs![2].userMeta![0].value;
  modifiedItem.youtubeVideoUrl =
    _viewProfileUiData?.sections?.[
      _viewProfileUiData?.sections?.length - 1
    ].formInputs?.[0].userMeta?.[0]?.value;
  modifiedItem.isDefault = 0;

  _viewProfileUiData?.sections?.[0].formInputs?.splice(0, 1, modifiedItem);
}

const ViewProfileController: FC<Props> = () => {
  const auth = useAuth();
  const [viewProfileUiData, setViewProfileUiData] = useState<Profile>();
  const { params } = useRoute<ProfileRouteProp>();
  const createConversation = useCreateConversation();

  const getUserRequestModel = useApi<number, UpdateProfileResponseModel>(
    ProfileApis.getUserById
  );

  const handleGetUserByIdAPi = useCallback(async () => {
    const {
      hasError,
      dataBody,
      errorBody
    } = await getUserRequestModel.request([params?.userId ?? 0]);
    if (hasError || dataBody === undefined) {
      Alert.alert("User not found", errorBody);
      return;
    } else {
      modifyUiFields(dataBody.data!);
      setViewProfileUiData(dataBody.data!);
    }
  }, [getUserRequestModel, params.userId]);

  useEffect(() => {
    if ((params.userId! ?? undefined) === undefined) {
      let _viewProfileUiData: Profile = JSON.parse(
        JSON.stringify(auth.user?.profile)
      );

      modifyUiFields(_viewProfileUiData);

      setViewProfileUiData(_viewProfileUiData);
    } else {
      handleGetUserByIdAPi();
    }
  }, [auth.user, handleGetUserByIdAPi, params.userId]);

  const navigation = useNavigation<
    ProfileBottomNavigationProp & HomeStackNavigationProp
  >();
  const route = useRoute<ProfileRouteProp>();

  const openRoommateAgreementScreen = () => {
    navigation.navigate("RoommateAgreement", {
      isFrom: EScreen.MY_PROFILE
    });
  };
  const { setActiveConversations, inActiveConversations } = useContext(
    AppDataContext
  );

  const moveToChatScreen = async (userId: number) => {
    const createConversationResult = await createConversation(
      [auth.user?.profile?.id!!, userId],
      setActiveConversations,
      inActiveConversations
    );

    if (createConversationResult !== undefined) {
      //TODO OPEN CHAT SCREEN FROM HERE
      /*navigation.navigate("Chat", {
        title: [
          profileMatch.user?.getFullName() ?? STRINGS.common.not_found
        ],
        conversation: createConversationResult
      });*/
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (route.params.isFrom === EScreen.HOME) {
        navigation.dangerouslyGetParent()?.setOptions({
          headerLeft: () => <Hamburger />,
          headerTitleAlign: "center",
          headerTitle: () => <HeaderTitle text="My Profile" />
        });
      } else {
        navigation.setOptions({
          headerLeft: () => (
            <HeaderLeftTextWithIcon onPress={() => navigation.goBack()} />
          ),

          headerTitleAlign: "center",
          headerTitle: () => (
            <HeaderTitle text={route.params.userName ?? "Profile"} />
          )
        });
      }
    }, [navigation, route.params.isFrom, route.params.userName])
  );

  return (
    <>
      {useLazyLoadInterface(
        <ViewProfileView
          openRoommateAgreementScreen={openRoommateAgreementScreen}
          viewProfileUiData={viewProfileUiData}
          moveToChatScreen={moveToChatScreen}
        />,
        undefined
      )}
    </>
  );
};

export default ViewProfileController;
