import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
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
import { AppDataContext } from "ui/screens/home/friends/AppDataProvider";
import { useApi } from "repo/Client";
import { UpdateProfileResponseModel } from "models/api_responses/UpdateProfileResponseModel";
import { Alert } from "react-native";
import ProfileApis from "repo/auth/ProfileApis";
import { PaginationParamsModel } from "models/api_requests/PaginationParamsModel";
import RelationApiResponseModel from "models/api_responses/RelationApiResponseModel";
import RelationApis from "repo/home/RelationApis";
import { AppLog } from "utils/Util";
import RelationModel from "models/RelationModel";
import useCreateConversation from "hooks/useCreateConversation";
import { User } from "models/User";
import EIntBoolean from "models/enums/EIntBoolean";

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
  AppLog.logForcefully(
    () => "view profile data : " + JSON.stringify(_viewProfileUiData)
  );
  let modifiedItem = _viewProfileUiData?.sections.find(
    (item) => item.title === "Basic Profile"
  )?.formInputs?.[0];

  if (modifiedItem) {
    modifiedItem.intendedMajor = _viewProfileUiData.major;
    modifiedItem.homeTown = _viewProfileUiData.hometown;
  }

  modifiedItem!.youtubeVideoUrl = _viewProfileUiData.youtubeVideoURL;

  if (
    modifiedItem &&
    _viewProfileUiData?.sections.find(
      (item) => item.title === "Basic Profile"
    ) !== undefined
  ) {
    let item = _viewProfileUiData?.sections.find(
      (_) => _.title === "Basic Profile"
    );

    modifiedItem.profilePicture = _viewProfileUiData.profilePicture;

    modifiedItem.firstName =
      item?.formInputs![1].userMeta?.length === 0
        ? "N/A"
        : item?.formInputs![1].userMeta![0].value;

    modifiedItem.lastName =
      item?.formInputs![2].userMeta?.length === 0
        ? "N/A"
        : item?.formInputs![2].userMeta![0].value;

    modifiedItem.isDefault = 0;

    _viewProfileUiData?.sections
      .find((_) => _.title === "Basic Profile")
      ?.formInputs?.splice(0, 1, modifiedItem);
  }
}

const ViewProfileController: FC<Props> = () => {
  const auth = useAuth();
  const [viewProfileUiData, setViewProfileUiData] = useState<Profile>();
  const { params } = useRoute<ProfileRouteProp>();

  const { createConversationAndNavigate } = useCreateConversation();

  const [roommate, setRoommate] = useState<RelationApiResponseModel>();
  const [showAgreementButton, setShowAgreementButton] = useState<boolean>(
    true
  );

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

  // MyRoommates API
  const roommatesApi = useApi<
    PaginationParamsModel,
    RelationApiResponseModel
  >(RelationApis.relations);

  const handleGetRoommatesApi = useCallback(
    async (userId?: number) => {
      const { hasError, dataBody, errorBody } = await roommatesApi.request(
        [
          {
            type: "roommates",
            userId: userId
          }
        ]
      );
      if (hasError || dataBody === undefined) {
        // Alert.alert("Unable to find questions " + errorBody);
        AppLog.log(() => "Unable to find Roommates " + errorBody);
        return;
      } else {
        setRoommate(dataBody);

        params.userId &&
          setShowAgreementButton(
            !dataBody?.data?.find((item) => item.id === params.userId) ===
              undefined
          );

        setShowAgreementButton(
          auth?.uni?.roommateAgreementFeature === EIntBoolean.TRUE
        );

        AppLog.log(
          () =>
            "MyRoommatesData" +
            JSON.stringify(
              dataBody?.data?.find((item) => item.id === params.userId)
            )
        );
      }
    },
    [params.userId, roommatesApi, auth.uni?.roommateAgreementFeature]
  );

  const moveToChatScreenFromRoommates = (profileMatch: RelationModel) => {
    createConversationAndNavigate(
      { id: profileMatch.userId } as User,
      setActiveConversations,
      setInActiveConversations
    );
  };

  useEffect(
    () => {
      if ((params.userId! ?? undefined) === undefined) {
        let _viewProfileUiData: Profile = JSON.parse(
          JSON.stringify(auth.user?.profile)
        );

        modifyUiFields(_viewProfileUiData);

        setViewProfileUiData(_viewProfileUiData);
        handleGetRoommatesApi();
      } else {
        handleGetUserByIdAPi();
        handleGetRoommatesApi(params.userId);
      }
    },
    // @ts-ignore
    [auth.user, handleGetUserByIdAPi, handleGetRoommatesApi, params.userId]
  );

  const navigation = useNavigation<
    ProfileBottomNavigationProp & HomeStackNavigationProp
  >();
  const route = useRoute<ProfileRouteProp>();

  const openRoommateAgreementScreen = () => {
    navigation.navigate("RoommateAgreement", {
      isFrom: EScreen.MY_PROFILE
    });
  };
  const { setActiveConversations, setInActiveConversations } = useContext(
    AppDataContext
  );

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
          roommates={roommate?.data}
          moveToChatScreenFromRommates={moveToChatScreenFromRoommates}
          moveToRoommateAgreementScreen={openRoommateAgreementScreen}
          userName={params.userName}
          showAgreementButton={showAgreementButton}
        />,
        undefined
      )}
    </>
  );
};

export default ViewProfileController;
