import React, {
  FC,
  useContext,
  useEffect,
  useLayoutEffect,
  useState
} from "react";
import { ViewProfileView } from "ui/screens/home/profile/view_profile/ViewProfileView";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "routes/ProfileBottomBar";
import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import EScreen from "models/enums/EScreen";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import { NotificationParamList } from "routes/NotificationParams";
import useLazyLoadInterface from "hooks/useLazyLoadInterface";
import { ProfileRootStackParamList } from "routes/ProfileRootStack";
import { Profile } from "models/api_responses/FetchMyProfileResponseModel";
import { useAuth } from "hooks";
import { useCreateConversation } from "hooks/useCreateConversation";
import { AppDataContext } from "ui/screens/home/friends/AppDataProvider";
import { useApi } from "repo/Client";
import { UpdateProfileResponseModel } from "models/api_responses/UpdateProfileResponseModel";
import { Alert } from "react-native";
import ProfileApis from "repo/auth/ProfileApis";

type Props = {};
type ProfileNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "ViewProfile"
>;

type ViewProfileNavigationProp = StackNavigationProp<
  ProfileRootStackParamList,
  "RoommateAgreement"
>;

type ViewProfileRouteProp = RouteProp<
  NotificationParamList,
  "ViewProfile"
>;

type NotificationNavigationProp = StackNavigationProp<
  NotificationParamList,
  "Notification"
>;

type ProfileRouteProp = RouteProp<ProfileStackParamList, "ViewProfile">;

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
  _viewProfileUiData?.sections?.[0].formInputs?.splice(0, 3, modifiedItem);
  modifiedItem.youtubeVideoUrl = _viewProfileUiData?.sections![
    _viewProfileUiData?.sections!.length - 1
  ].formInputs![0].userMeta![0].value;
}

const ViewProfileController: FC<Props> = () => {
  const auth = useAuth();
  const [viewProfileUiData, setViewProfileUiData] = useState<Profile>();
  const { params } = useRoute<ProfileRouteProp>();
  const createConversation = useCreateConversation();

  const getUserRequestModel = useApi<number, UpdateProfileResponseModel>(
    ProfileApis.getUserById
  );

  const handleGetUserByIdAPi = async () => {
    const {
      hasError,
      dataBody,
      errorBody
    } = await getUserRequestModel.request([params?.userId]);
    if (hasError || dataBody === undefined) {
      Alert.alert("User not found", errorBody);
      return;
    } else {
      modifyUiFields(dataBody.data!);
      setViewProfileUiData(dataBody.data!);
    }
  };

  useEffect(() => {
    if ((params.userId! ?? undefined) === undefined) {
      let _viewProfileUiData: Profile = JSON.parse(
        JSON.stringify(auth.user?.profile)
      );

      modifyUiFields(_viewProfileUiData);

      setViewProfileUiData(_viewProfileUiData);
    } else {
      handleGetUserByIdAPi().then().catch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user, handleGetUserByIdAPi]);

  const navigation = useNavigation<ProfileNavigationProp>();
  const navigationViewProfile = useNavigation<ViewProfileNavigationProp>();
  const navigationNotification = useNavigation<NotificationNavigationProp>();
  const route = useRoute<ViewProfileRouteProp>();

  const viewProfileRoute = useRoute<ProfileRouteProp>();

  const openRoommateAgreementScreen = () => {
    navigationViewProfile.navigate("RoommateAgreement", {
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
        conversationId: createConversationResult?.id!
      });*/
    }
  };

  useLayoutEffect(() => {
    if (route.params.isFrom === EScreen.NOTIFICATION) {
      navigation.setOptions({
        headerLeft: () => (
          <HeaderLeftTextWithIcon
            onPress={() => navigationNotification.goBack()}
          />
        ),

        headerTitleAlign: "center",
        headerTitle: () => <HeaderTitle text="My Profile" />
      });
    } else if (viewProfileRoute.params.isFrom === EScreen.HOME) {
      navigation.setOptions({
        headerLeft: () => <Hamburger />,
        headerTitleAlign: "center",
        headerTitle: () => <HeaderTitle text="My Profile" />
      });
    } else if (route.params.isFrom === EScreen.MY_FRIENDS) {
      navigation.setOptions({
        headerLeft: () => (
          <HeaderLeftTextWithIcon
            onPress={() => navigationNotification.goBack()}
          />
        ),

        headerTitleAlign: "center",
        headerTitle: () => <HeaderTitle text="Profile" />
      });
    }
  }, [
    navigation,
    route.params.isFrom,
    viewProfileRoute.params.isFrom,
    navigationNotification
  ]);

  return (
    <>
      {useLazyLoadInterface(
        <ViewProfileView
          openRoommateAgreementScreen={openRoommateAgreementScreen}
          viewProfileUiData={viewProfileUiData}
          moveToChatScreen={moveToChatScreen}
        />,
        undefined,
        2000
      )}
    </>
  );
};

export default ViewProfileController;
