import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "hooks";
import { FetchMyProfileResponseModel } from "models/api_responses/FetchMyProfileResponseModel";
import EScreen from "models/enums/EScreen";
import RelationFilterType from "models/enums/RelationFilterType";
import RelationModel from "models/RelationModel";
import React, { FC, useCallback, useContext, useState } from "react";
import AuthApis from "repo/auth/AuthApis";
import { useApi } from "repo/Client";
import { AppDataContext } from "../AppDataProvider";
import { ConnectRequestType } from "../connect_requests/ConnectRequestsController";
import useFetchRelations from "../useFetchRelations";
import MyRoommatesView from "./MyRoommatesView";
import { SPACE } from "config";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { HomeStackParamList } from "routes/HomeStack";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import LeaveGroup from "assets/images/leave_group.svg";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { View } from "react-native";
import { User } from "models/User";
import useCreateConversation from "hooks/useCreateConversation";

type Props = {};

type FriendsNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "ConnectRequest"
>;

type NotificationRouteProp = RouteProp<HomeStackParamList, "MyRoommates">;

const MyRoommatesController: FC<Props> = () => {
  const navigation = useNavigation<FriendsNavigationProp>();
  const route = useRoute<NotificationRouteProp>();
  const { themedColors } = usePreferredTheme();
  const [leaveGroup, setLeaveGroup] = useState(false);

  const {
    myRoommates,
    setMyRoommates,
    setActiveConversations,
    setInActiveConversations
  } = useContext(AppDataContext);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.isFrom === EScreen.HOME) {
        navigation.dangerouslyGetParent()?.setOptions({
          headerTitleAlign: "center",
          headerLeft: () => <Hamburger />,
          headerTitle: () => <HeaderTitle text="My Roommates" />,
          headerRight: () => (
            <View style={{ marginRight: SPACE.lg }}>
              <LeaveGroup
                width={24}
                height={24}
                fill={
                  myRoommates?.length === 0
                    ? themedColors.interface[400]
                    : themedColors.danger
                }
                onPress={() => {
                  if (myRoommates?.length! > 0) {
                    setLeaveGroup(true);
                  }
                }}
              />
            </View>
          )
        });
      } else {
        navigation.setOptions({
          headerTitleAlign: "center",
          headerRight: () =>
            route.params?.isFrom === EScreen.NOTIFICATION && (
              <View style={{ marginRight: SPACE.lg }}>
                <LeaveGroup
                  width={24}
                  height={24}
                  fill={
                    myRoommates?.length === 0
                      ? themedColors.interface[400]
                      : themedColors.danger
                  }
                  onPress={() => {
                    if (myRoommates?.length! > 0) {
                      setLeaveGroup(true);
                    }
                  }}
                />
              </View>
            ),
          headerLeft: () => (
            <HeaderLeftTextWithIcon
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          headerTitle: () => <HeaderTitle text={"My Roommates"} />
        });
      }
    }, [myRoommates, themedColors, navigation, route.params])
  );

  const { createConversationAndNavigate } = useCreateConversation();

  const {
    relationsCount: roommatesCount,
    pendingRelationsCount: pendingRoommatesCount,
    isLoading,
    canLoadMore,
    onEndReached,
    errorMessage,
    onPullToRefresh,
    isLoggedInUserAModerator
  } = useFetchRelations(
    RelationFilterType.ROOMMATE,
    myRoommates,
    setMyRoommates
  );

  const onPressReceivedRoommateRequests = () => {
    navigation.navigate("ConnectRequest", {
      type: ConnectRequestType.ROOMMATE_REQUESTS
    });
  };

  const hideLeaveGroupPopUp = () => {
    setLeaveGroup(false);
  };

  const moveToProfileScreen = useCallback(
    (_: RelationModel) => {
      navigation.navigate("ViewProfile", {
        isFrom: EScreen.MY_FRIENDS,
        userId: _.userId
      });
    },
    [navigation]
  );

  const { user, saveProfile } = useAuth();

  const fetchProfileApi = useApi<string, FetchMyProfileResponseModel>(
    AuthApis.fetchMyProfile
  );

  const fetchUserApi = useCallback(async () => {
    const {
      hasError: hasErrorProfile,
      dataBody
    } = await fetchProfileApi.request([]);

    if (!hasErrorProfile) {
      await saveProfile(dataBody?.data!, user!);
    }
  }, [fetchProfileApi, saveProfile, user]);

  const moveToChatScreen = async (profileMatch: RelationModel) => {
    createConversationAndNavigate(
      (profileMatch.user as unknown) as User,
      setActiveConversations,
      setInActiveConversations
    );
  };

  return (
    <MyRoommatesView
      hideLeaveGroupPopup={hideLeaveGroupPopUp}
      shouldShowLeaveGroupPopUp={leaveGroup}
      roomatesCount={roommatesCount}
      pendingRoommatesCount={pendingRoommatesCount}
      data={myRoommates}
      isLoading={isLoading}
      canLoadMore={canLoadMore}
      error={errorMessage}
      onEndReached={onEndReached}
      onPullToRefresh={(onComplete?: () => void) => {
        onPullToRefresh((data) => {
          if (!user?.profile?.agreementId && data?.length !== 0) {
            fetchUserApi().then().catch();
          }
          onComplete?.();
        });
      }}
      onPressChat={moveToChatScreen}
      onPressProfile={moveToProfileScreen}
      onPressReceivedRoommateRequests={onPressReceivedRoommateRequests}
      isLoggedInUserAModerator={isLoggedInUserAModerator}
    />
  );
};

export default MyRoommatesController;
